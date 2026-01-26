'use client'

import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ArrowDownLeft, ArrowUpRight, CreditCard, Landmark, Bitcoin, DollarSign } from 'lucide-react'
import { formatCurrency } from '@/lib/format'

interface Transaction {
  id: string
  type: 'deposit' | 'withdrawal' | 'payout' | 'fee'
  amount: number
  currency: string
  currency_type: 'fiat' | 'crypto'
  payment_method: string
  status: 'pending' | 'completed' | 'failed' | 'cancelled'
  description?: string
  transaction_date: string
}

interface TransactionsTableProps {
  transactions: Transaction[]
}

const getPaymentMethodIcon = (method: string) => {
  const lower = method.toLowerCase()
  if (lower.includes('visa') || lower.includes('card')) return CreditCard
  if (lower.includes('bank') || lower.includes('wire')) return Landmark
  if (lower.includes('btc') || lower.includes('bitcoin')) return Bitcoin
  return DollarSign
}

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

export function TransactionsTable({ transactions }: TransactionsTableProps) {
  return (
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Type</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Payment Method</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                No transactions yet
              </TableCell>
            </TableRow>
          ) : (
            transactions.map((transaction) => {
              const PaymentIcon = getPaymentMethodIcon(transaction.payment_method)
              const isIncoming = transaction.type === 'deposit' || transaction.type === 'payout'
              
              return (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <div className={`p-2 rounded-lg bg-muted/50`}>
                        {isIncoming ? (
                          <ArrowDownLeft className="h-4 w-4 text-green-600 dark:text-green-400" />
                        ) : (
                          <ArrowUpRight className="h-4 w-4 text-red-600 dark:text-red-400" />
                        )}
                      </div>
                      <span className="capitalize">{transaction.type}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className={`font-semibold font-mono ${getTypeColor(transaction.type)}`}>
                        {isIncoming ? '+' : '-'}
                        {formatCurrency(transaction.amount, transaction.currency, transaction.currency_type as any)}
                      </span>
                      <span className="text-xs text-muted-foreground capitalize">
                        {transaction.currency_type}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <PaymentIcon className="h-4 w-4 text-muted-foreground" />
                      <span>{transaction.payment_method}</span>
                    </div>
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
                  <TableCell className="text-right text-sm text-muted-foreground">
                    {transaction.description || '-'}
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
