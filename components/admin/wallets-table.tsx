'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Wallet, RefreshCw, ExternalLink, Clock, CheckCircle2, XCircle } from 'lucide-react'
import { formatCurrency } from '@/lib/format'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { CryptoIcon } from '@/components/crypto-icon'

interface WalletAddress {
  id: string
  address: string
  currency: string
  blockchain?: string
  address_type: string
  owner_type: string
  balance?: number
  confirmed_balance?: number
  unconfirmed_balance?: number
  last_sync_at?: string
  label?: string
  notes?: string
  created_at: string
}

export function WalletsTable({ wallets }: { wallets: WalletAddress[] }) {
  const router = useRouter()

  const handleRowClick = (walletId: string) => {
    router.push(`/admin/wallets/${walletId}`)
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'hot':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400'
      case 'cold':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
      case 'custodial':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400'
      default:
        return ''
    }
  }

  const handleSync = async (walletId: string, e: React.MouseEvent) => {
    e.preventDefault()
    
    toast.loading('Syncing wallet from blockchain...')

    try {
      const response = await fetch(`/api/admin/wallets/${walletId}/sync`, {
        method: 'POST',
      })
      
      const data = await response.json()
      
      if (response.ok) {
        toast.success(
          `✅ Synced! Balance: ${data.balance?.toFixed(8) || 0} ${data.wallet?.currency}\nUSD: $${data.usd_value?.toFixed(2) || '0.00'}\nTransactions: ${data.transactions_found}`,
          { duration: 5000 }
        )
        
        // Refresh the page to show updated data
        setTimeout(() => window.location.reload(), 1000)
      } else {
        toast.error(`Failed to sync: ${data.error}`)
      }
    } catch (error: any) {
      console.error('Error syncing wallet:', error)
      toast.error('Failed to sync wallet')
    }
  }

  return (
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Address</TableHead>
            <TableHead>Blockchain</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Balance</TableHead>
            <TableHead>Last Sync</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {wallets.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                No wallet addresses added yet
              </TableCell>
            </TableRow>
          ) : (
            wallets.map((wallet) => {
              const balance = wallet.confirmed_balance || wallet.balance || 0
              const isCrypto = !['USD', 'EUR', 'GBP'].includes(wallet.currency)

              return (
                <TableRow 
                  key={wallet.id}
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => handleRowClick(wallet.id)}
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <CryptoIcon symbol={wallet.currency} size={32} />
                      <div className="space-y-1">
                        <code className="text-xs font-mono bg-muted px-2 py-1 rounded">
                          {wallet.address.slice(0, 12)}...{wallet.address.slice(-8)}
                        </code>
                        {wallet.label && (
                          <p className="text-sm font-medium">{wallet.label}</p>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium capitalize">{wallet.blockchain || wallet.currency}</p>
                      <p className="text-xs text-muted-foreground">{wallet.currency}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getTypeColor(wallet.address_type)}>
                      {wallet.address_type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {balance > 0 ? (
                      <div className="space-y-1">
                        <p className="font-semibold font-mono">
                          {formatCurrency(balance, wallet.currency, isCrypto ? 'crypto' : 'fiat')}
                        </p>
                        {wallet.unconfirmed_balance && wallet.unconfirmed_balance > 0 && (
                          <p className="text-xs text-muted-foreground">
                            +{formatCurrency(wallet.unconfirmed_balance, wallet.currency, 'crypto')} unconfirmed
                          </p>
                        )}
                      </div>
                    ) : (
                      <span className="text-muted-foreground">0 {wallet.currency}</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {wallet.last_sync_at 
                        ? new Date(wallet.last_sync_at).toLocaleString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })
                        : 'Never'}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation() // Prevent row click
                          handleSync(wallet.id, e)
                        }}
                      >
                        <RefreshCw className="h-3 w-3 mr-1" />
                        Sync
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        asChild
                        onClick={(e: any) => e.stopPropagation()}
                      >
                        <a 
                          href={`https://blockchain.info/address/${wallet.address}`}
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )
            })
          )}
        </TableBody>
      </Table>
    </div>
  )
}
