/**
 * CoinGecko API service for fetching real-time crypto prices
 */

const COINGECKO_API_KEY = process.env.COIN_GECKO_API_KEY
const COINGECKO_BASE_URL = 'https://api.coingecko.com/api/v3'

// Map common crypto symbols to CoinGecko IDs
const CRYPTO_ID_MAP: Record<string, string> = {
  BTC: 'bitcoin',
  ETH: 'ethereum',
  XMR: 'monero',
  LTC: 'litecoin',
  SOL: 'solana',
  TON: 'the-open-network',
  TRX: 'tron',
  USDT: 'tether',
  USDC: 'usd-coin',
  BNB: 'binancecoin',
  ADA: 'cardano',
  DOT: 'polkadot',
  MATIC: 'matic-network',
  AVAX: 'avalanche-2',
}

interface PriceResponse {
  [coinId: string]: {
    usd: number
    usd_24h_change?: number
  }
}

/**
 * Fetch current price for a crypto currency
 * @param symbol - Crypto symbol (e.g., 'BTC', 'ETH')
 * @returns Price in USD
 */
export async function getCryptoPrice(symbol: string): Promise<number | null> {
  try {
    const coinId = CRYPTO_ID_MAP[symbol.toUpperCase()]
    
    if (!coinId) {
      console.error(`Unknown crypto symbol: ${symbol}`)
      return null
    }

    const url = `${COINGECKO_BASE_URL}/simple/price?ids=${coinId}&vs_currencies=usd&x_cg_demo_api_key=${COINGECKO_API_KEY}`
    
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
      },
      next: { revalidate: 60 }, // Cache for 60 seconds
    })

    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status}`)
    }

    const data: PriceResponse = await response.json()
    const price = data[coinId]?.usd

    if (!price) {
      console.error(`No price found for ${symbol}`)
      return null
    }

    return price
  } catch (error) {
    console.error('Error fetching crypto price:', error)
    return null
  }
}

/**
 * Fetch multiple crypto prices at once
 * @param symbols - Array of crypto symbols
 * @returns Object mapping symbol to USD price
 */
export async function getMultipleCryptoPrices(
  symbols: string[]
): Promise<Record<string, number>> {
  try {
    const coinIds = symbols
      .map(s => CRYPTO_ID_MAP[s.toUpperCase()])
      .filter(Boolean)
      .join(',')

    if (!coinIds) {
      return {}
    }

    const url = `${COINGECKO_BASE_URL}/simple/price?ids=${coinIds}&vs_currencies=usd&x_cg_demo_api_key=${COINGECKO_API_KEY}`
    
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
      },
      next: { revalidate: 60 },
    })

    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status}`)
    }

    const data: PriceResponse = await response.json()
    
    // Map back to symbols
    const result: Record<string, number> = {}
    symbols.forEach(symbol => {
      const coinId = CRYPTO_ID_MAP[symbol.toUpperCase()]
      if (coinId && data[coinId]) {
        result[symbol.toUpperCase()] = data[coinId].usd
      }
    })

    return result
  } catch (error) {
    console.error('Error fetching crypto prices:', error)
    return {}
  }
}

/**
 * Convert crypto amount to USD using real-time price
 * @param amount - Crypto amount
 * @param symbol - Crypto symbol
 * @returns USD value
 */
export async function convertCryptoToUSD(
  amount: number,
  symbol: string
): Promise<number | null> {
  const price = await getCryptoPrice(symbol)
  if (!price) return null
  return amount * price
}
