import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { getWalletBalanceUniversal } from '@/lib/blockchain-apis'
import { getCryptoPrice } from '@/lib/coingecko'

export async function POST() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // Get all wallets
    const { data: wallets } = await supabase
      .from('wallet_addresses')
      .select('*')

    if (!wallets || wallets.length === 0) {
      return NextResponse.json({ message: 'No wallets to sync' })
    }

    const results = []

    // Sync each wallet
    for (const wallet of wallets) {
      try {
        const balanceData = await getWalletBalanceUniversal(
          wallet.address,
          wallet.blockchain || 'ethereum'
        )

        if (balanceData) {
          // Update wallet
          await supabase
            .from('wallet_addresses')
            .update({
              balance: balanceData.balance,
              confirmed_balance: balanceData.confirmed_balance,
              unconfirmed_balance: balanceData.unconfirmed_balance || 0,
              total_received: balanceData.total_received,
              total_sent: balanceData.total_sent,
              tx_count: balanceData.tx_count,
              last_sync_at: new Date().toISOString(),
            })
            .eq('id', wallet.id)

          results.push({
            wallet: wallet.address.slice(0, 12) + '...',
            currency: wallet.currency,
            balance: balanceData.balance,
            success: true,
          })
        } else {
          // API not available for this chain
          results.push({
            wallet: wallet.address.slice(0, 12) + '...',
            currency: wallet.currency,
            success: false,
            error: 'Manual entry required (no free API)',
          })
        }
      } catch (error: any) {
        console.error(`Error syncing wallet ${wallet.address}:`, error)
        results.push({
          wallet: wallet.address.slice(0, 12) + '...',
          currency: wallet.currency,
          success: false,
          error: error.message,
        })
      }
    }

    // Recalculate ALL liquidity pools from scratch
    const currencies = [...new Set(wallets.map(w => w.currency))]
    
    for (const currency of currencies) {
      const { data: currencyWallets } = await supabase
        .from('wallet_addresses')
        .select('balance')
        .eq('currency', currency)

      const totalBalance = currencyWallets?.reduce((sum, w) => sum + (w.balance || 0), 0) || 0

      // Update or create pool
      const { data: existingPool } = await supabase
        .from('liquidity_pools')
        .select('id')
        .eq('currency', currency)
        .single()

      if (existingPool) {
        await supabase
          .from('liquidity_pools')
          .update({
            total_balance: totalBalance,
            available_balance: totalBalance,
            last_sync_at: new Date().toISOString(),
          })
          .eq('id', existingPool.id)
      } else {
        await supabase.from('liquidity_pools').insert({
          name: `${currency} Pool`,
          currency,
          total_balance: totalBalance,
          available_balance: totalBalance,
          locked_balance: 0,
          source_type: 'wallet',
        })
      }
    }

    return NextResponse.json({
      message: 'All wallets synced successfully',
      results,
      synced_at: new Date().toISOString(),
    })
  } catch (error: any) {
    console.error('Error syncing all wallets:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
