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
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuSeparator,
} from '@/components/ui/context-menu'
import { ArrowDownLeft, ArrowUpRight, Download, ExternalLink, FileText, AlertTriangle, Search, Filter, X, Edit, Eye, Trash2, Link as LinkIcon } from 'lucide-react'
import { formatCurrency } from '@/lib/format'

interface Transaction {
  id: string
  type: string
  amount: number
  currency: string
  currency_type: string
  payment_method: string
  status: string
  description?: string
  transaction_date: string
  receipt_required?: boolean
  receipt_verified?: boolean
  investment_id?: string
  investor?: { full_name?: string; email: string }
  receipts?: { file_url: string; hash_code?: string; blockchain_link?: string }[]
}

export function AdminTransactionsTableWithFilters({ transactions }: { transactions: Transaction[] }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [currencyFilter, setCurrencyFilter] = useState('all')

  const filteredTransactions = useMemo(() => {
    return transactions.filter(txn => {
      const searchLower = searchTerm.toLowerCase()
      const matchesSearch = 
        !searchTerm ||
        txn.investor?.full_name?.toLowerCase().includes(searchLower) ||
        txn.investor?.email.toLowerCase().includes(searchLower) ||
        txn.description?.toLowerCase().includes(searchLower) ||
        txn.payment_method.toLowerCase().includes(searchLower)

      const matchesType = typeFilter === 'all' || txn.type === typeFilter
      const matchesStatus = statusFilter === 'all' || txn.status === statusFilter
      const matchesCurrency = currencyFilter === 'all' || txn.currency === currencyFilter

      return matchesSearch && matchesType && matchesStatus && matchesCurrency
    })
  }, [transactions, searchTerm, typeFilter, statusFilter, currencyFilter])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'default'
      case 'pending':
        return 'secondary'
      case 'failed':
      case 'cancelled':
        return 'destructive'
      default:
        return 'secondary'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'deposit':
        return 'text-green-600 dark:text-green-400'
      case 'withdrawal':
      case 'fee':
        return 'text-red-600 dark:text-red-400'
      case 'payout':
        return 'text-blue-600 dark:text-blue-400'
      default:
        return ''
    }
  }

  return (
    <div className="space-y-4">
      {/* Search and Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search investor, description, or payment method..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
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
          
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="deposit">Deposits</SelectItem>
              <SelectItem value="withdrawal">Withdrawals</SelectItem>
              <SelectItem value="payout">Payouts</SelectItem>
              <SelectItem value="fee">Fees</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>

          <Select value={currencyFilter} onValueChange={setCurrencyFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Currency</SelectItem>
              <SelectItem value="USD">USD</SelectItem>
              <SelectItem value="BTC">BTC</SelectItem>
              <SelectItem value="ETH">ETH</SelectItem>
              <SelectItem value="XMR">XMR</SelectItem>
            </SelectContent>
          </Select>

          {(typeFilter !== 'all' || statusFilter !== 'all' || currencyFilter !== 'all') && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setTypeFilter('all')
                setStatusFilter('all')
                setCurrencyFilter('all')
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

      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Investor</TableHead>
              <TableHead>Type & Amount</TableHead>
              <TableHead>Payment Method</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Receipt/Proof</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
          {filteredTransactions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                  {searchTerm || typeFilter !== 'all' || statusFilter !== 'all' || currencyFilter !== 'all'
                    ? 'No transactions match your filters'
                    : 'No transactions found'}
                </TableCell>
              </TableRow>
            ) : (
              filteredTransactions.map((transaction) => {
                const isIncoming = transaction.type === 'deposit' || transaction.type === 'payout'
                const hasReceipt = transaction.receipts && transaction.receipts.length > 0
                const receipt = hasReceipt ? transaction.receipts[0] : null
                const needsReceipt = transaction.receipt_required && !transaction.receipt_verified

                return (
                  <ContextMenu key={transaction.id}>
                    <ContextMenuTrigger asChild>
                      <TableRow className="cursor-context-menu hover:bg-muted/50">
                    <TableCell>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">
                            {transaction.investor?.full_name || transaction.investor?.email || 'Unknown'}
                          </p>
                          {needsReceipt && (
                            <AlertTriangle className="h-3 w-3 text-yellow-600 dark:text-yellow-400" />
                          )}
                        </div>
                        {transaction.description && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {transaction.description}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-lg bg-muted/50">
                          {isIncoming ? (
                            <ArrowDownLeft className="h-4 w-4 text-green-600 dark:text-green-400" />
                          ) : (
                            <ArrowUpRight className="h-4 w-4 text-red-600 dark:text-red-400" />
                          )}
                        </div>
                        <div>
                          <p className={`font-semibold font-mono ${getTypeColor(transaction.type)}`}>
                            {isIncoming ? '+' : '-'}
                            {formatCurrency(transaction.amount, transaction.currency, transaction.currency_type as any)}
                          </p>
                          <p className="text-xs text-muted-foreground capitalize">
                            {transaction.type} • {transaction.currency_type}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span>{transaction.payment_method}</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(transaction.status)} className="capitalize">
                        {transaction.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(transaction.transaction_date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </TableCell>
                    <TableCell>
                      {hasReceipt && receipt ? (
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-green-600 dark:text-green-400">✓ Verified</span>
                          {receipt.blockchain_link && (
                            <ExternalLink className="h-3 w-3 text-muted-foreground" />
                          )}
                        </div>
                      ) : (
                        <span className="text-muted-foreground text-sm">-</span>
                      )}
                    </TableCell>
                  </TableRow>
                    </ContextMenuTrigger>
                    <ContextMenuContent className="w-52">
                      <ContextMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Transaction
                      </ContextMenuItem>
                      <ContextMenuItem>
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </ContextMenuItem>
                      {hasReceipt && receipt && (
                        <>
                          <ContextMenuSeparator />
                          <ContextMenuItem asChild>
                            <a href={receipt.file_url} target="_blank" rel="noopener noreferrer">
                              <FileText className="h-4 w-4 mr-2" />
                              View Receipt
                            </a>
                          </ContextMenuItem>
                          <ContextMenuItem asChild>
                            <a href={receipt.file_url} download>
                              <Download className="h-4 w-4 mr-2" />
                              Download Receipt
                            </a>
                          </ContextMenuItem>
                          {receipt.blockchain_link && (
                            <ContextMenuItem asChild>
                              <a href={receipt.blockchain_link} target="_blank" rel="noopener noreferrer">
                                <LinkIcon className="h-4 w-4 mr-2" />
                                View on Blockchain
                              </a>
                            </ContextMenuItem>
                          )}
                        </>
                      )}
                      <ContextMenuSeparator />
                      <ContextMenuItem className="text-red-600 dark:text-red-400">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Transaction
                      </ContextMenuItem>
                    </ContextMenuContent>
                  </ContextMenu>
                )
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
