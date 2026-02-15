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
import { ArrowDownLeft, ArrowUpRight, Download, ExternalLink, FileText, AlertTriangle } from 'lucide-react'
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

export function AdminTransactionsTable({ transactions }: { transactions: Transaction[] }) {
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
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                No transactions found
              </TableCell>
            </TableRow>
          ) : (
            transactions.map((transaction) => {
              const isIncoming = transaction.type === 'deposit' || transaction.type === 'payout'
              const receipt = transaction.receipts?.[0] ?? null
              const hasReceipt = receipt !== null
              const needsReceipt = transaction.receipt_required && !transaction.receipt_verified

              return (
                <TableRow key={transaction.id}>
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
                      <div className="flex flex-col gap-1">
                        <Button size="sm" variant="outline" asChild>
                          <a href={receipt.file_url} target="_blank" rel="noopener noreferrer">
                            <FileText className="h-3 w-3 mr-1" />
                            Receipt
                          </a>
                        </Button>
                        {receipt.blockchain_link && (
                          <Button size="sm" variant="ghost" asChild>
                            <a href={receipt.blockchain_link} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-3 w-3 mr-1" />
                              Blockchain
                            </a>
                          </Button>
                        )}
                      </div>
                    ) : (
                      <span className="text-muted-foreground text-sm">-</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="outline">
                      Edit
                    </Button>
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
