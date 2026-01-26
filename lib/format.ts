/**
 * Format currency with proper precision
 * Fiat: 2 decimals
 * Crypto: 8 decimals (full precision)
 */
export function formatCurrency(
  amount: number,
  currency: string,
  currencyType?: 'fiat' | 'crypto'
): string {
  // Detect if crypto based on currency type or common crypto symbols
  const isCrypto =
    currencyType === 'crypto' ||
    ['BTC', 'ETH', 'XMR', 'LTC', 'SOL', 'TON', 'TRX', 'USDT', 'USDC'].includes(currency.toUpperCase())

  const decimals = isCrypto ? 8 : 2
  const symbol = currency === 'USD' ? '$' : ''
  const suffix = currency !== 'USD' ? ` ${currency}` : ''

  const formatted = amount.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })

  return `${symbol}${formatted}${suffix}`
}

/**
 * Format amount with proper precision based on currency type
 */
export function formatAmount(amount: number, isCrypto: boolean = false): string {
  const decimals = isCrypto ? 8 : 2
  return amount.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}
