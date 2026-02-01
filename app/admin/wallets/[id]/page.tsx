import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  ArrowDownLeft, 
  ArrowUpRight, 
  Clock, 
  ExternalLink,
  CheckCircle2,
  XCircle,
  RefreshCw,
} from 'lucide-react'
import { formatCurrency } from '@/lib/format'
import { WalletDetailHeader } from '@/components/admin/wallet-detail-header'
import { WalletTransactionsTable } from '@/components/admin/wallet-transactions-table'

export default async function WalletDetailPage({ params }: { params: { id: string } }) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { id } = await params

  // Get wallet details
  const { data: wallet } = await supabase
    .from('wallet_addresses')
    .select('*')
    .eq('id', id)
    .single()

  if (!wallet) {
    redirect('/admin/wallets')
  }

  // Get blockchain transactions for this wallet
  const { data: blockchainTxs } = await supabase
    .from('blockchain_transactions')
    .select('*')
    .eq('wallet_id', id)
    .order('timestamp', { ascending: false })

  // Get balance snapshots for history
  const { data: snapshots } = await supabase
    .from('balance_snapshots')
    .select('*')
    .eq('source_type', 'wallet')
    .eq('source_id', id)
    .order('snapshot_date', { ascending: false })
    .limit(10)

  const isCrypto = !['USD', 'EUR', 'GBP'].includes(wallet.currency)

  return (
    <div className="space-y-6">
      {/* Header - Client Component */}
      <WalletDetailHeader wallet={wallet} />

      {/* Balance Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono">
              {formatCurrency(wallet.balance || 0, wallet.currency, isCrypto ? 'crypto' : 'fiat')}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Received</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono text-green-600 dark:text-green-400">
              {formatCurrency(wallet.total_received || 0, wallet.currency, isCrypto ? 'crypto' : 'fiat')}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Sent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono text-red-600 dark:text-red-400">
              {formatCurrency(wallet.total_sent || 0, wallet.currency, isCrypto ? 'crypto' : 'fiat')}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {wallet.tx_count || blockchainTxs?.length || 0}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transaction History with Search & Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>All blockchain transactions for this wallet</CardDescription>
            </div>
            <Badge variant="secondary">{blockchainTxs?.length || 0} imported</Badge>
          </div>
        </CardHeader>
        <CardContent>
          {blockchainTxs && blockchainTxs.length > 0 ? (
            <WalletTransactionsTable transactions={blockchainTxs} wallet={wallet} />
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center mb-4">
                <ArrowDownLeft className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No Transactions Yet</h3>
              <p className="text-muted-foreground mb-4">
                Click "Sync Now" above to fetch transactions from the blockchain
              </p>
              <p className="text-xs text-muted-foreground">
                {wallet.tx_count || 0} transactions detected on-chain
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Balance History */}
      {snapshots && snapshots.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Balance History</CardTitle>
            <CardDescription>Historical balance snapshots</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {snapshots.map((snapshot) => (
                <div key={snapshot.id} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm">
                        {new Date(snapshot.snapshot_date).toLocaleString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold font-mono">
                      {formatCurrency(snapshot.balance, snapshot.currency, isCrypto ? 'crypto' : 'fiat')}
                    </p>
                    {snapshot.usd_value && (
                      <p className="text-xs text-muted-foreground">
                        ${snapshot.usd_value.toFixed(2)}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Wallet Info */}
      <Card>
        <CardHeader>
          <CardTitle>Wallet Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Blockchain</p>
                <p className="font-medium capitalize">{wallet.blockchain}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Currency</p>
                <p className="font-medium">{wallet.currency}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Type</p>
                <Badge variant="outline" className="capitalize">{wallet.address_type}</Badge>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Owner</p>
                <p className="font-medium capitalize">{wallet.owner_type}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">API Provider</p>
                <p className="font-medium capitalize">{wallet.api_provider || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Last Synced</p>
                <p className="font-medium">
                  {wallet.last_sync_at
                    ? new Date(wallet.last_sync_at).toLocaleString()
                    : 'Never'}
                </p>
              </div>
            </div>
          </div>
          {wallet.notes && (
            <div className="mt-4 pt-4 border-t">
              <p className="text-sm text-muted-foreground mb-2">Notes</p>
              <p className="text-sm">{wallet.notes}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
