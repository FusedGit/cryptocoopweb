'use client'

import { useState } from 'react'
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
import { FileText, Download, DollarSign } from 'lucide-react'
import { EditInvestmentDialog } from './edit-investment-dialog'

interface Investment {
  id: string
  amount: number
  currency: string
  apy_rate: number
  lock_period_months: number
  start_date: string
  payout_date: string
  monthly_payout: number
  total_earnings: number
  status: string
  payment_status?: string
  amount_paid?: number
  contract_url?: string
  notes?: string
  investor?: { id: string; full_name?: string; email: string }
}

export function InvestmentsManagementTable({ investments }: { investments: Investment[] }) {
  const [editingInvestment, setEditingInvestment] = useState<Investment | null>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'default'
      case 'completed':
        return 'secondary'
      case 'withdrawn':
        return 'destructive'
      default:
        return 'secondary'
    }
  }

  const getPaymentStatusColor = (status?: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
      case 'partial':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
      case 'unpaid':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
      default:
        return ''
    }
  }

  const getPaymentPercentage = (investment: Investment) => {
    if (!investment.amount_paid) return 0
    return (investment.amount_paid / investment.amount) * 100
  }

  return (
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Investor</TableHead>
            <TableHead>Amount & APY</TableHead>
            <TableHead>Term</TableHead>
            <TableHead>Payment Status</TableHead>
            <TableHead>Earnings</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Contract</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {investments.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
                No investments found
              </TableCell>
            </TableRow>
          ) : (
            investments.map((investment) => {
              const paymentPercentage = getPaymentPercentage(investment)
              const monthsRemaining = Math.max(
                0,
                Math.floor(
                  (new Date(investment.payout_date).getTime() - new Date().getTime()) /
                    (1000 * 60 * 60 * 24 * 30)
                )
              )

              return (
                <TableRow key={investment.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">
                        {investment.investor?.full_name || investment.investor?.email || 'Unknown'}
                      </p>
                      {investment.notes && (
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                          {investment.notes}
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-semibold">
                          ${Number(investment.amount).toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                          })}
                        </p>
                        <p className="text-xs text-muted-foreground">{investment.apy_rate}% APY</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm font-medium">{investment.lock_period_months} months</p>
                      <p className="text-xs text-muted-foreground">
                        {monthsRemaining > 0 ? `${monthsRemaining} left` : 'Completed'}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <Badge
                        variant="outline"
                        className={getPaymentStatusColor(investment.payment_status)}
                      >
                        {investment.payment_status || 'unknown'}
                      </Badge>
                      {investment.amount_paid !== undefined && investment.amount_paid > 0 && (
                        <div className="text-xs text-muted-foreground">
                          ${Number(investment.amount_paid).toLocaleString()} ({paymentPercentage.toFixed(0)}%)
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm font-medium">
                        ${Number(investment.monthly_payout).toFixed(2)}/mo
                      </p>
                      <p className="text-xs text-muted-foreground">
                        ${Number(investment.total_earnings).toLocaleString()} total
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(investment.status)} className="capitalize">
                      {investment.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {investment.contract_url ? (
                      <Button size="sm" variant="outline" asChild>
                        <a href={investment.contract_url} target="_blank" rel="noopener noreferrer">
                          <FileText className="h-3 w-3 mr-1" />
                          View
                        </a>
                      </Button>
                    ) : (
                      <span className="text-muted-foreground text-sm">-</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => setEditingInvestment(investment)}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })
          )}
        </TableBody>
      </Table>

      {/* Edit Dialog */}
      {editingInvestment && (
        <EditInvestmentDialog
          investment={editingInvestment}
          open={!!editingInvestment}
          onOpenChange={(open) => !open && setEditingInvestment(null)}
        />
      )}
    </div>
  )
}
