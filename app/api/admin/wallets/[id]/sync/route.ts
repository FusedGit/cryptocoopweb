import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { getWalletBalanceUniversal, getWalletTransactionsUniversal } from '@/lib/blockchain-apis'
import { getCryptoPrice } from '@/lib/coingecko'
import { logAdminAction } from '@/lib/admin'
import { detectInternalTransfer, calculateHistoricalUSDValue, calculateCurrentUSDValue } from '@/lib/swap-detection'

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await params

    // Get wallet
    const { data: wallet } = await supabase
      .from('wallet_addresses')
      .select('*')
      .eq('id', id)
      .single()

    if (!wallet) {
      return NextResponse.json({ error: 'Wallet not found' }, { status: 404 })
    }

    // Sync via appropriate blockchain API
    const balanceData = await getWalletBalanceUniversal(wallet.address, wallet.blockchain || 'bitcoin')
    const transactions = await getWalletTransactionsUniversal(wallet.address, wallet.blockchain || 'bitcoin', 50)

    if (!balanceData) {
      return NextResponse.json({ error: 'Failed to fetch balance from blockchain API' }, { status: 500 })
    }

    // Get USD value from CoinGecko
    const usdPrice = await getCryptoPrice(wallet.currency)
    const usdValue = usdPrice ? balanceData.balance * usdPrice : null

    const balanceValue = balanceData.balance

    console.log(`Found ${transactions?.length || 0} transactions for ${wallet.currency} wallet`)

    // Import transactions to blockchain_transactions table
    let importedCount = 0
    if (transactions && transactions.length > 0) {
      for (const tx of transactions) {
        try {
          // Check if transaction already exists
          const { data: existing } = await supabase
            .from('blockchain_transactions')
            .select('id')
            .eq('tx_hash', tx.hash || tx.tx_hash)
            .single()

          if (existing) {
            continue
          }

          // Bitcoin-specific parsing
          let direction = 'outgoing'
          let amount = 0
          let toAddress = null
          let fromAddress = null

          if (wallet.blockchain === 'bitcoin') {
            // Check if this is incoming or outgoing for this wallet
            const hasOutputToWallet = tx.out?.some((output: any) => 
              output.addr === wallet.address
            )
            const hasInputFromWallet = tx.inputs?.some((input: any) => 
              input.prev_out?.addr === wallet.address
            )

            if (hasOutputToWallet && !hasInputFromWallet) {
              direction = 'incoming'
              // Sum all outputs to this wallet
              amount = tx.out
                ?.filter((output: any) => output.addr === wallet.address)
                .reduce((sum: number, output: any) => sum + (output.value || 0), 0) / 100000000
              fromAddress = tx.inputs?.[0]?.prev_out?.addr || null
              toAddress = wallet.address
            } else if (hasInputFromWallet) {
              direction = 'outgoing'
              // Sum all outputs not to this wallet
              amount = tx.out
                ?.filter((output: any) => output.addr !== wallet.address)
                .reduce((sum: number, output: any) => sum + (output.value || 0), 0) / 100000000
              fromAddress = wallet.address
              toAddress = tx.out?.find((o: any) => o.addr !== wallet.address)?.addr || null
            } else {
              direction = 'internal'
              amount = tx.out?.reduce((sum: number, output: any) => sum + (output.value || 0), 0) / 100000000
            }
          } else {
            // EVM transaction (Moralis wallet history format)
            // Moralis provides native_transfers with direction already calculated!
            const nativeTransfer = tx.native_transfers?.[0]
            
            if (nativeTransfer) {
              // Use Moralis's calculated direction
              direction = nativeTransfer.direction // 'send' or 'receive' or 'self'
              if (direction === 'receive') direction = 'incoming'
              if (direction === 'send') direction = 'outgoing'
              if (direction === 'self') direction = 'internal'
              
              amount = parseFloat(nativeTransfer.value_formatted || '0')
              fromAddress = nativeTransfer.from_address
              toAddress = nativeTransfer.to_address
            } else {
              // No native transfer, check basic tx data
              const isIncoming = tx.to_address?.toLowerCase() === wallet.address.toLowerCase()
              direction = isIncoming ? 'incoming' : 'outgoing'
              amount = parseFloat(tx.value || '0') / 1e18
              fromAddress = tx.from_address
              toAddress = tx.to_address
            }
          }

          // Check if this is an internal transfer between our wallets
          const internalCheck = await detectInternalTransfer(
            tx.hash || tx.tx_hash,
            fromAddress || '',
            toAddress || ''
          )

          // Calculate USD values
          const historicalUSD = await calculateHistoricalUSDValue(
            wallet.currency,
            amount,
            tx.time_utc || tx.block_timestamp || new Date().toISOString()
          )
          const currentUSD = await calculateCurrentUSDValue(wallet.currency, amount)

          // Insert transaction with full tracking data
          await supabase.from('blockchain_transactions').insert({
            tx_hash: tx.hash || tx.tx_hash,
            blockchain: wallet.blockchain || 'bitcoin',
            from_address: fromAddress,
            to_address: toAddress,
            amount,
            currency: wallet.currency,
            confirmations: tx.confirmations || 6, // Default to 6+ if in history
            status: 'confirmed', // If in API response, it's confirmed
            block_number: tx.block_height || tx.block_number || null,
            timestamp: tx.time_utc || tx.block_timestamp || null,
            fee: tx.fee ? parseFloat(tx.fee) / (wallet.blockchain === 'bitcoin' ? 100000000 : 1e18) : null,
            wallet_id: wallet.id,
            direction,
            auto_detected: true,
            is_internal_transfer: internalCheck.isInternal,
            related_wallet_id: internalCheck.toWalletId || internalCheck.fromWalletId,
            usd_value_at_tx: historicalUSD.usdValueAtTx,
            usd_value_now: currentUSD,
            price_at_tx: historicalUSD.priceAtTx,
          })

          importedCount++
        } catch (error: any) {
          console.error(`Error importing transaction:`, error.message)
          // Continue with other transactions
        }
      }
      
      console.log(`Successfully imported ${importedCount} of ${transactions.length} transactions`)
    }

    console.log('Updating wallet with:', {
      balance: balanceValue,
      confirmed_balance: balanceData.confirmed_balance,
      currency: wallet.currency,
    })

    // Update wallet (no updated_at column exists)
    const { data: updatedWallet, error: updateError } = await supabase
      .from('wallet_addresses')
      .update({
        balance: balanceValue,
        confirmed_balance: balanceData.confirmed_balance,
        unconfirmed_balance: balanceData.unconfirmed_balance || 0,
        total_received: balanceData.total_received,
        total_sent: balanceData.total_sent,
        tx_count: balanceData.tx_count,
        last_sync_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single()

    if (updateError) {
      console.error('Error updating wallet:', updateError)
      throw new Error(`Failed to update wallet: ${updateError.message}`)
    }

    console.log('Wallet updated successfully:', updatedWallet)

    // CRITICAL: Recalculate total_received and total_sent from imported transactions
    const { data: totalsData } = await supabase
      .rpc('calculate_wallet_totals', { wallet_uuid: id })
      .single()

    if (totalsData) {
      await supabase
        .from('wallet_addresses')
        .update({
          total_received: totalsData.total_received,
          total_sent: totalsData.total_sent,
          tx_count: totalsData.tx_count,
        })
        .eq('id', id)
      
      console.log(`Wallet totals updated: received=${totalsData.total_received}, sent=${totalsData.total_sent}, count=${totalsData.tx_count}`)
    }

    // Create balance snapshot
    const { error: snapshotError } = await supabase.from('balance_snapshots').insert({
      snapshot_date: new Date().toISOString(),
      source_type: 'wallet',
      source_id: id,
      currency: wallet.currency,
      balance: balanceValue,
      usd_value: usdValue,
    })

    if (snapshotError) {
      console.error('Error creating snapshot:', snapshotError)
      // Don't fail the whole operation if snapshot fails
    }

    // Log action
    await logAdminAction('sync_wallet', 'wallet_address', id, {
      balance: balanceValue,
      tx_count: transactions?.length || 0,
    })

    // CRITICAL: Recalculate liquidity pool from ALL wallets (don't add, replace!)
    // This prevents double-counting on re-sync
    
    // Get ALL wallets for this currency
    const { data: allWallets } = await supabase
      .from('wallet_addresses')
      .select('balance')
      .eq('currency', wallet.currency)

    // Calculate TOTAL from all wallets (fresh calculation every time)
    const totalBalance = allWallets?.reduce((sum, w) => sum + (w.balance || 0), 0) || 0
    
    console.log(`Recalculating ${wallet.currency} pool from ${allWallets?.length} wallets: ${totalBalance}`)

    // Find or create liquidity pool
    const { data: existingPool } = await supabase
      .from('liquidity_pools')
      .select('*')
      .eq('currency', wallet.currency)
      .single()

    if (existingPool) {
      // UPDATE with fresh total (not add!)
      await supabase
        .from('liquidity_pools')
        .update({
          total_balance: totalBalance, // REPLACES, not adds
          available_balance: totalBalance,
          last_sync_at: new Date().toISOString(),
        })
        .eq('id', existingPool.id)
    } else {
      // Create new pool
      await supabase.from('liquidity_pools').insert({
        name: `${wallet.currency} Pool`,
        currency: wallet.currency,
        total_balance: totalBalance,
        available_balance: totalBalance,
        locked_balance: 0,
        source_type: 'wallet',
        wallet_address: wallet.address,
      })
    }
    
    console.log(`${wallet.currency} pool updated to: ${totalBalance}`)

    return NextResponse.json({
      message: 'Wallet synced successfully',
      balance: balanceValue,
      usd_value: usdValue,
      transactions_found: transactions?.length || 0,
      synced_at: new Date().toISOString(),
      wallet: {
        address: wallet.address,
        currency: wallet.currency,
        balance: balanceValue,
      }
    })
  } catch (error: any) {
    console.error('Error syncing wallet:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
