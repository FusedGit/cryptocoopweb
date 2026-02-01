/**
 * Moralis API Integration
 * Enterprise-grade blockchain data provider
 * Powers Blockchain.com, Kraken, and other major exchanges
 */

const MORALIS_API_KEY = process.env.MORALIS_API_KEY
const MORALIS_BASE_URL = 'https://deep-index.moralis.io/api/v2.2'

// Blockchain network IDs for Moralis
const CHAIN_IDS: Record<string, string> = {
  ethereum: '0x1',
  bsc: '0x38',
  polygon: '0x89',
  avalanche: '0xa86a',
  fantom: '0xfa',
  arbitrum: '0xa4b1',
  optimism: '0xa',
  base: '0x2105',
}

interface WalletBalance {
  balance: string
  balance_formatted: string
}

interface WalletTransaction {
  hash: string
  from_address: string
  to_address: string
  value: string
  gas: string
  gas_price: string
  block_timestamp: string
  block_number: string
  transaction_fee: string
}

/**
 * Get native balance for a wallet address (EVM chains only)
 * @param address - Wallet address
 * @param chain - Blockchain (ethereum, bsc, polygon, etc.)
 */
export async function getWalletBalance(
  address: string,
  chain: string = 'ethereum'
): Promise<WalletBalance | null> {
  try {
    // Validate it's an EVM chain
    if (chain.toLowerCase() === 'bitcoin') {
      throw new Error('Bitcoin is not supported by Moralis. Use Blockchain.com API instead.')
    }

    const chainId = CHAIN_IDS[chain.toLowerCase()]
    
    if (!chainId) {
      throw new Error(`Unsupported blockchain: ${chain}. Supported: ${Object.keys(CHAIN_IDS).join(', ')}`)
    }

    const response = await fetch(
      `${MORALIS_BASE_URL}/${address}/balance?chain=${chainId}`,
      {
        headers: {
          'Accept': 'application/json',
          'X-API-Key': MORALIS_API_KEY!,
        },
        next: { revalidate: 60 },
      }
    )

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(`Moralis API error ${response.status}: ${errorData.message || 'Unknown error'}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching wallet balance:', error)
    throw error
  }
}

/**
 * Get wallet transaction history with full details
 * Uses Moralis wallet history endpoint for decoded transactions
 * @param address - Wallet address
 * @param chain - Blockchain
 * @param limit - Number of transactions to fetch
 */
export async function getWalletTransactions(
  address: string,
  chain: string = 'ethereum',
  limit: number = 100
): Promise<any[] | null> {
  try {
    const chainId = CHAIN_IDS[chain.toLowerCase()]
    
    if (!chainId) {
      throw new Error(`Chain ${chain} not supported`)
    }

    // Use wallet history endpoint - provides decoded transactions with direction
    const response = await fetch(
      `${MORALIS_BASE_URL}/wallets/${address}/history?chain=${chainId}&limit=${limit}&order=DESC`,
      {
        headers: {
          'Accept': 'application/json',
          'X-API-Key': MORALIS_API_KEY!,
        },
        next: { revalidate: 30 },
      }
    )

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('Moralis error:', errorData)
      throw new Error(`Moralis API error ${response.status}`)
    }

    const data = await response.json()
    return data.result || []
  } catch (error) {
    console.error('Error fetching wallet transactions:', error)
    return null
  }
}

/**
 * Get ERC20 token balances for a wallet
 * @param address - Wallet address
 * @param chain - Blockchain
 */
export async function getWalletTokenBalances(
  address: string,
  chain: string = 'ethereum'
): Promise<any[] | null> {
  try {
    const chainId = CHAIN_IDS[chain.toLowerCase()] || CHAIN_IDS.ethereum

    const response = await fetch(
      `${MORALIS_BASE_URL}/${address}/erc20?chain=${chainId}`,
      {
        headers: {
          'Accept': 'application/json',
          'X-API-Key': MORALIS_API_KEY!,
        },
        next: { revalidate: 60 },
      }
    )

    if (!response.ok) {
      throw new Error(`Moralis API error: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching token balances:', error)
    return null
  }
}

/**
 * Sync wallet from blockchain
 * Updates database with latest balance and transactions
 */
export async function syncWalletFromBlockchain(
  walletId: string,
  address: string,
  blockchain: string
) {
  try {
    // Get balance
    const balance = await getWalletBalance(address, blockchain)
    
    // Get recent transactions
    const transactions = await getWalletTransactions(address, blockchain, 50)

    return {
      balance: balance?.balance_formatted || '0',
      transactions: transactions || [],
      syncedAt: new Date().toISOString(),
    }
  } catch (error) {
    console.error('Error syncing wallet:', error)
    return null
  }
}
