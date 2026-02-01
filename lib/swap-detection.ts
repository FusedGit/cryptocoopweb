import { createClient } from '@/lib/supabase/server'
import { getCryptoPrice } from '@/lib/coingecko'

/**
 * Detect if a blockchain transaction is an internal transfer between our own wallets
 * @param txHash - Transaction hash
 * @param fromAddress - Sender address
 * @param toAddress - Receiver address
 */
export async function detectInternalTransfer(
  txHash: string,
  fromAddress: string,
  toAddress: string
): Promise<{ isInternal: boolean; fromWalletId?: string; toWalletId?: string }> {
  const supabase = await createClient()

  // Check if both addresses are in our wallet_addresses
  const { data: fromWallet } = await supabase
    .from('wallet_addresses')
    .select('id')
    .eq('address', fromAddress)
    .single()

  const { data: toWallet } = await supabase
    .from('wallet_addresses')
    .select('id')
    .eq('address', toAddress)
    .single()

  if (fromWallet && toWallet) {
    return {
      isInternal: true,
      fromWalletId: fromWallet.id,
      toWalletId: toWallet.id,
    }
  }

  return { isInternal: false }
}

/**
 * Calculate USD value of a transaction at the time it occurred
 * Uses CoinGecko API with historical data
 * @param currency - Crypto currency
 * @param amount - Amount in crypto
 * @param timestamp - When the transaction happened
 */
export async function calculateHistoricalUSDValue(
  currency: string,
  amount: number,
  timestamp: string
): Promise<{ usdValueAtTx: number; priceAtTx: number }> {
  // For now, use current price as approximation
  // In production, you'd use CoinGecko historical price API
  const currentPrice = await getCryptoPrice(currency)
  
  if (!currentPrice) {
    return { usdValueAtTx: 0, priceAtTx: 0 }
  }

  // TODO: Fetch historical price from CoinGecko
  // const historicalPrice = await getCryptoHistoricalPrice(currency, timestamp)
  
  return {
    usdValueAtTx: amount * currentPrice, // Approximate for now
    priceAtTx: currentPrice,
  }
}

/**
 * Calculate current USD value
 */
export async function calculateCurrentUSDValue(
  currency: string,
  amount: number
): Promise<number> {
  const price = await getCryptoPrice(currency)
  return price ? amount * price : 0
}

/**
 * Detect and record a swap between currencies
 * @param outgoingTx - Transaction sending crypto out
 * @param incomingTx - Transaction receiving different crypto
 */
export async function detectAndRecordSwap(
  outgoingTx: any,
  incomingTx: any
) {
  const supabase = await createClient()

  // Check if timestamps are close (within 1 hour = likely a swap)
  const timeDiff = Math.abs(
    new Date(outgoingTx.timestamp).getTime() - new Date(incomingTx.timestamp).getTime()
  )

  if (timeDiff > 3600000) {
    return // Not a swap, too far apart
  }

  // Calculate profit/loss
  const outUSD = await calculateCurrentUSDValue(outgoingTx.currency, outgoingTx.amount)
  const inUSD = await calculateCurrentUSDValue(incomingTx.currency, incomingTx.amount)
  const profitLoss = inUSD - outUSD

  // Record in exchange_trades
  await supabase.from('exchange_trades').insert({
    trade_type: 'swap',
    from_currency: outgoingTx.currency,
    to_currency: incomingTx.currency,
    from_amount: outgoingTx.amount,
    to_amount: incomingTx.amount,
    exchange_rate: incomingTx.amount / outgoingTx.amount,
    profit_loss: profitLoss,
    from_wallet_id: outgoingTx.wallet_id,
    to_wallet_id: incomingTx.wallet_id,
    blockchain_tx_hash: outgoingTx.tx_hash,
    trade_date: outgoingTx.timestamp,
    status: 'completed',
  })

  console.log(`Detected swap: ${outgoingTx.amount} ${outgoingTx.currency} → ${incomingTx.amount} ${incomingTx.currency} (P/L: $${profitLoss.toFixed(2)})`)
}
