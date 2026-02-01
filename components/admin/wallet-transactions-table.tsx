'use client'

import { useState, useMemo } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { 
  ArrowDownLeft, 
  ArrowUpRight, 
  Clock, 
  ExternalLink,
  CheckCircle2,
  XCircle,
  Search,
  Filter,
  X,
} from 'lucide-react'
import { formatCurrency } from '@/lib/format'

interface Transaction {
  id: string
  tx_hash: string
  direction: string
  amount: number
  currency: string
  from_address?: string
  to_address?: string
  status: string
  confirmations: number
  timestamp?: string
  fee?: number
  blockchain: string
}

export function WalletTransactionsTable({ transactions, wallet }: { transactions: Transaction[], wallet: any }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [directionFilter, setDirectionFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredTransactions = useMemo(() => {
    return transactions.filter(tx => {
      const searchLower = searchTerm.toLowerCase()
      const matchesSearch = 
        !searchTerm ||
        tx.tx_hash.toLowerCase().includes(searchLower) ||
        tx.from_address?.toLowerCase().includes(searchLower) ||
        tx.to_address?.toLowerCase().includes(searchLower)

      const matchesDirection = directionFilter === 'all' || tx.direction === directionFilter
      const matchesStatus = statusFilter === 'all' || tx.status === statusFilter

      return matchesSearch && matchesDirection && matchesStatus
    })
  }, [transactions, searchTerm, directionFilter, statusFilter])

  const isCrypto = !['USD', 'EUR', 'GBP'].includes(wallet.currency)

  const getExplorerUrl = (txHash: string) => {
    const explorers: Record<string, string> = {
      bitcoin: `https://blockchain.info/tx/${txHash}`,
      ethereum: `https://etherscan.io/tx/${txHash}`,
      bsc: `https://bscscan.com/tx/${txHash}`,
      polygon: `https://polygonscan.com/tx/${txHash}`,
    }
    return explorers[wallet.blockchain] || `https://blockchain.info/tx/${txHash}`
  }

  return (
    <div className="space-y-4">
      {/* Search and Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by hash or address..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 font-mono text-sm"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          
          <Select value={directionFilter} onValueChange={setDirectionFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Direction" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="incoming">Incoming</SelectItem>
              <SelectItem value="outgoing">Outgoing</SelectItem>
              <SelectItem value="internal">Internal</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>

          {(directionFilter !== 'all' || statusFilter !== 'all') && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setDirectionFilter('all')
                setStatusFilter('all')
              }}
            >
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* Results count */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredTransactions.length} of {transactions.length} transactions
      </div>

      {/* Transaction Table */}
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Type</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>From/To</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Hash</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransactions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                  {searchTerm || directionFilter !== 'all' || statusFilter !== 'all'
                    ? 'No transactions match your filters'
                    : 'No transactions found'}
                </TableCell>
              </TableRow>
            ) : (
              filteredTransactions.map((tx) => {
                const isIncoming = tx.direction === 'incoming'
                
                return (
                  <TableRow key={tx.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className={`p-2 rounded-lg ${isIncoming ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'}`}>
                          {isIncoming ? (
                            <ArrowDownLeft className="h-4 w-4 text-green-600 dark:text-green-400" />
                          ) : (
                            <ArrowUpRight className="h-4 w-4 text-red-600 dark:text-red-400" />
                          )}
                        </div>
                        <span className="capitalize font-medium">{tx.direction}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className={`font-semibold font-mono ${isIncoming ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                          {isIncoming ? '+' : '-'}
                          {formatCurrency(tx.amount, tx.currency, 'crypto')}
                        </p>
                        {tx.fee && tx.fee > 0 && (
                          <p className="text-xs text-muted-foreground">
                            Fee: {formatCurrency(tx.fee, tx.currency, 'crypto')}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <code className="text-xs font-mono bg-muted px-2 py-1 rounded">
                        {isIncoming 
                          ? (tx.from_address?.slice(0, 8) + '...' + tx.from_address?.slice(-6)) || 'Unknown'
                          : (tx.to_address?.slice(0, 8) + '...' + tx.to_address?.slice(-6)) || 'Unknown'
                        }
                      </code>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {tx.status === 'confirmed' ? (
                          <>
                            <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                            <span className="text-sm">Confirmed</span>
                          </>
                        ) : tx.status === 'pending' ? (
                          <>
                            <Clock className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                            <span className="text-sm">Pending</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                            <span className="text-sm">Failed</span>
                          </>
                        )}
                        <span className="text-xs text-muted-foreground">
                          ({tx.confirmations || 0})
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {tx.timestamp 
                        ? new Date(tx.timestamp).toLocaleString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })
                        : '-'}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="ghost" asChild>
                        <a 
                          href={getExplorerUrl(tx.tx_hash)}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-3 w-3 mr-1" />
                          View
                        </a>
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
