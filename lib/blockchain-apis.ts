/**
 * Multi-blockchain API integration
 * Uses appropriate API for each blockchain
 */

import { getWalletBalance as getMoralisBalance, getWalletTransactions as getMoralisTransactions } from './moralis'

interface WalletData {
  balance: number
  confirmed_balance: number
  unconfirmed_balance: number
  total_received?: number
  total_sent?: number
  tx_count?: number
}

/**
 * Get Bitcoin wallet balance using Blockchain.com API
 */
async function getBitcoinBalance(address: string): Promise<WalletData | null> {
  try {
    const response = await fetch(
      `https://blockchain.info/balance?active=${address}`,
      { next: { revalidate: 60 } }
    )

    if (!response.ok) {
      throw new Error(`Blockchain.com API error: ${response.status}`)
    }

    const data = await response.json()
    const addressData = data[address]

    if (!addressData) {
      throw new Error('Address not found')
    }

    // Convert from satoshis to BTC
    return {
      balance: addressData.final_balance / 100000000,
      confirmed_balance: addressData.final_balance / 100000000,
      unconfirmed_balance: 0,
      total_received: addressData.total_received / 100000000,
      total_sent: addressData.total_sent / 100000000,
      tx_count: addressData.n_tx,
    }
  } catch (error) {
    console.error('Error fetching Bitcoin balance:', error)
    return null
  }
}

/**
 * Get EVM wallet balance using Moralis
 */
async function getEVMBalance(address: string, blockchain: string): Promise<WalletData | null> {
  try {
    const balance = await getMoralisBalance(address, blockchain)
    
    if (!balance) return null

    // Moralis returns balance in Wei for ETH
    // balance.balance is in Wei (string)
    // balance_formatted might not exist, so we convert manually
    const weiBalance = BigInt(balance.balance || '0')
    const ethBalance = Number(weiBalance) / 1e18 // Convert Wei to ETH

    console.log('Moralis response:', balance)
    console.log('Converted balance:', ethBalance)

    return {
      balance: ethBalance,
      confirmed_balance: ethBalance,
      unconfirmed_balance: 0,
    }
  } catch (error) {
    console.error('Error fetching EVM balance:', error)
    throw error
  }
}

/**
 * Universal wallet balance fetcher
 * Routes to appropriate API based on blockchain
 */
export async function getWalletBalanceUniversal(
  address: string,
  blockchain: string
): Promise<WalletData | null> {
  const chain = blockchain.toLowerCase()

  // Supported blockchains
  const EVM_CHAINS = ['ethereum', 'bsc', 'polygon', 'avalanche', 'arbitrum', 'optimism', 'base', 'fantom']
  const SUPPORTED_NON_EVM = ['bitcoin']
  const MANUAL_ONLY = ['tron', 'solana', 'monero', 'litecoin', 'ton', 'dogecoin']

  // Route to appropriate API
  if (chain === 'bitcoin') {
    return getBitcoinBalance(address)
  } else if (EVM_CHAINS.includes(chain)) {
    // EVM chains via Moralis
    return getEVMBalance(address, chain)
  } else if (MANUAL_ONLY.includes(chain)) {
    // These chains don't have free APIs available
    // Return null and require manual balance entry
    console.log(`${chain} requires manual balance entry (no free API available)`)
    return null
  } else {
    // Unknown chain
    console.warn(`Unknown blockchain: ${chain}`)
    return null
  }
}

/**
 * Get Bitcoin transactions from Blockchain.com
 */
async function getBitcoinTransactions(address: string, limit: number = 100): Promise<any[]> {
  try {
    const response = await fetch(
      `https://blockchain.info/rawaddr/${address}?limit=${limit}`,
      { next: { revalidate: 30 } }
    )

    if (!response.ok) {
      throw new Error(`Blockchain.com API error: ${response.status}`)
    }

    const data = await response.json()
    
    // Transform to common format
    const txs = (data.txs || []).map((tx: any) => ({
      hash: tx.hash,
      block_height: tx.block_height,
      time_utc: new Date(tx.time * 1000).toISOString(),
      confirmations: 6, // Assume confirmed if in API response
      inputs: tx.inputs,
      out: tx.out,
      fee: tx.fee,
    }))

    return txs
  } catch (error) {
    console.error('Error fetching Bitcoin transactions:', error)
    return []
  }
}

/**
 * Universal transaction fetcher
 */
export async function getWalletTransactionsUniversal(
  address: string,
  blockchain: string,
  limit: number = 50
): Promise<any[]> {
  const chain = blockchain.toLowerCase()

  if (chain === 'bitcoin') {
    return getBitcoinTransactions(address, limit)
  } else {
    const txs = await getMoralisTransactions(address, chain, limit)
    return txs || []
  }
}
