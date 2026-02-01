import { Suspense } from 'react'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PageHeader } from '@/components/admin/page-header'
import { Badge } from '@/components/ui/badge'
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { SyncAllButton } from '@/components/admin/sync-all-button'
import { getCryptoPrice } from '@/lib/coingecko'
import { CryptoIcon } from '@/components/crypto-icon'

async function LiquidityHeatmap() {
  const supabase = await createClient()

  // Get all liquidity pools
  const { data: pools } = await supabase
    .from('liquidity_pools')
    .select('*')
    .eq('status', 'active')

  // Get all wallet balances
  const { data: wallets } = await supabase
    .from('wallet_addresses')
    .select('*')

  // Get all bank balances
  const { data: banks } = await supabase
    .from('bank_accounts')
    .select('*')
    .eq('status', 'active')

  // Aggregate by currency
  const currencyTotals: Record<string, { total: number; available: number; locked: number; change: number }> = {}

  // Process pools
  pools?.forEach(pool => {
    if (!currencyTotals[pool.currency]) {
      currencyTotals[pool.currency] = { total: 0, available: 0, locked: 0, change: 0 }
    }
    currencyTotals[pool.currency].total += pool.total_balance || 0
    currencyTotals[pool.currency].available += pool.available_balance || 0
    currencyTotals[pool.currency].locked += pool.locked_balance || 0
  })

  // Process wallets
  wallets?.forEach(wallet => {
    if (!currencyTotals[wallet.currency]) {
      currencyTotals[wallet.currency] = { total: 0, available: 0, locked: 0, change: 0 }
    }
    currencyTotals[wallet.currency].total += wallet.balance || 0
  })

  // Process banks
  banks?.forEach(bank => {
    if (!currencyTotals[bank.currency]) {
      currencyTotals[bank.currency] = { total: 0, available: 0, locked: 0, change: 0 }
    }
    currencyTotals[bank.currency].total += bank.balance || 0
    currencyTotals[bank.currency].available += bank.available_balance || 0
  })

  const currencies = Object.entries(currencyTotals)
    .sort((a, b) => b[1].total - a[1].total)

  // Calculate total value in USD using CoinGecko
  let totalValueUSD = 0
  
  for (const [currency, data] of currencies) {
    if (currency === 'USD') {
      totalValueUSD += data.total
    } else {
      const price = await getCryptoPrice(currency)
      if (price) {
        totalValueUSD += data.total * price
      }
    }
  }

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Liquidity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totalValueUSD.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Across all currencies</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Active Currencies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currencies.length}</div>
            <p className="text-xs text-muted-foreground mt-1">With non-zero balance</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Wallets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{wallets?.length || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">Monitored addresses</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Bank Accounts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{banks?.length || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">Fiat accounts</p>
          </CardContent>
        </Card>
      </div>

      {/* Heatmap Style Currency Grid */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Liquidity Heatmap</CardTitle>
              <CardDescription>Real-time balance distribution across currencies</CardDescription>
            </div>
            <SyncAllButton />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {currencies.map(([currency, data]) => {
              const percentOfTotal = (data.total / totalValueUSD) * 100
              const isPositive = data.change >= 0

              return (
                <Link
                  key={currency}
                  href={`/admin/wallets?currency=${currency}`}
                  className="relative p-6 rounded-lg border bg-gradient-to-br from-card to-muted/20 hover:border-foreground/20 transition-all cursor-pointer block"
                  style={{
                    minHeight: `${Math.max(120, percentOfTotal * 3)}px`,
                  }}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CryptoIcon symbol={currency} size={20} />
                        <h3 className="text-lg font-bold">{currency}</h3>
                      </div>
                      {isPositive ? (
                        <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-600 dark:text-red-400" />
                      )}
                    </div>
                    <div className="space-y-1">
                      <p className="text-2xl font-bold font-mono">
                        {data.total.toLocaleString('en-US', {
                          minimumFractionDigits: currency === 'USD' ? 2 : 8,
                          maximumFractionDigits: currency === 'USD' ? 2 : 8,
                        })}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {percentOfTotal.toFixed(1)}% of total
                      </p>
                    </div>
                    <div className="pt-2 border-t space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Available:</span>
                        <span className="font-medium">{data.available.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Locked:</span>
                        <span className="font-medium">{data.locked.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>

          {currencies.length === 0 && (
            <div className="text-center py-12">
              <Wallet className="h-12 w-12 mx-auto text-muted-foreground mb-4 opacity-50" />
              <h3 className="text-lg font-semibold mb-2">No Liquidity Yet</h3>
              <p className="text-muted-foreground mb-4">
                Add wallet addresses or bank accounts to start tracking liquidity
              </p>
              <div className="flex items-center justify-center gap-2">
                <Button asChild>
                  <Link href="/admin/wallets">Add Wallet</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/admin/banks">Add Bank Account</Link>
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Links */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Crypto Wallets</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              {wallets?.length || 0} addresses monitored
            </p>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/admin/wallets">Manage Wallets</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Bank Accounts</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              {banks?.length || 0} accounts tracked
            </p>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/admin/banks">Manage Banks</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Balance History</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              View historical trends
            </p>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/admin/liquidity/history">View History</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default async function LiquidityPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Liquidity Pools"
        description="Monitor and manage your crypto and fiat liquidity across all accounts"
      />

      <Suspense fallback={
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <Card key={i}>
                <CardHeader className="pb-3">
                  <div className="h-4 w-32 bg-muted animate-pulse rounded" />
                </CardHeader>
                <CardContent>
                  <div className="h-8 w-24 bg-muted animate-pulse rounded mb-2" />
                  <div className="h-3 w-40 bg-muted animate-pulse rounded" />
                </CardContent>
              </Card>
            ))}
          </div>
          <Card>
            <CardHeader>
              <div className="h-6 w-48 bg-muted animate-pulse rounded" />
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-muted animate-pulse rounded" />
            </CardContent>
          </Card>
        </div>
      }>
        <LiquidityHeatmap />
      </Suspense>
    </div>
  )
}
