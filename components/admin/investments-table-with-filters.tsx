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
import { FileText, DollarSign, Search, Filter, X, Edit, Eye, Trash2, FileDown } from 'lucide-react'
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

export function InvestmentsTableWithFilters({ investments }: { investments: Investment[] }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [paymentStatusFilter, setPaymentStatusFilter] = useState('all')
  const [editingInvestment, setEditingInvestment] = useState<Investment | null>(null)

  const filteredInvestments = useMemo(() => {
    return investments.filter(inv => {
      const searchLower = searchTerm.toLowerCase()
      const matchesSearch = 
        !searchTerm ||
        inv.investor?.full_name?.toLowerCase().includes(searchLower) ||
        inv.investor?.email.toLowerCase().includes(searchLower) ||
        inv.notes?.toLowerCase().includes(searchLower)

      const matchesStatus = statusFilter === 'all' || inv.status === statusFilter
      const matchesPayment = paymentStatusFilter === 'all' || inv.payment_status === paymentStatusFilter

      return matchesSearch && matchesStatus && matchesPayment
    })
  }, [investments, searchTerm, statusFilter, paymentStatusFilter])

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
    <div className="space-y-4">
      {/* Search and Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by investor name, email, or notes..."
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
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="withdrawn">Withdrawn</SelectItem>
            </SelectContent>
          </Select>

          <Select value={paymentStatusFilter} onValueChange={setPaymentStatusFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Payment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Payments</SelectItem>
              <SelectItem value="unpaid">Unpaid</SelectItem>
              <SelectItem value="partial">Partially Paid</SelectItem>
              <SelectItem value="paid">Fully Paid</SelectItem>
            </SelectContent>
          </Select>

          {(statusFilter !== 'all' || paymentStatusFilter !== 'all') && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setStatusFilter('all')
                setPaymentStatusFilter('all')
              }}
            >
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* Results count */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredInvestments.length} of {investments.length} investments
      </div>

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
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInvestments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                  {searchTerm || statusFilter !== 'all' || paymentStatusFilter !== 'all'
                    ? 'No investments match your filters'
                    : 'No investments found'}
                </TableCell>
              </TableRow>
            ) : (
              filteredInvestments.map((investment) => {
                const paymentPercentage = getPaymentPercentage(investment)
                const monthsRemaining = Math.max(
                  0,
                  Math.floor(
                    (new Date(investment.payout_date).getTime() - new Date().getTime()) /
                      (1000 * 60 * 60 * 24 * 30)
                  )
                )

                return (
                  <ContextMenu key={investment.id}>
                    <ContextMenuTrigger asChild>
                      <TableRow className="cursor-context-menu hover:bg-muted/50">
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
                  </TableRow>
                    </ContextMenuTrigger>
                    <ContextMenuContent className="w-48">
                      <ContextMenuItem onClick={() => setEditingInvestment(investment)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Investment
                      </ContextMenuItem>
                      {investment.contract_url && (
                        <ContextMenuItem asChild>
                          <a href={investment.contract_url} target="_blank" rel="noopener noreferrer">
                            <FileDown className="h-4 w-4 mr-2" />
                            Download Contract
                          </a>
                        </ContextMenuItem>
                      )}
                      <ContextMenuSeparator />
                      <ContextMenuItem className="text-red-600 dark:text-red-400">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Investment
                      </ContextMenuItem>
                    </ContextMenuContent>
                  </ContextMenu>
                )
              })
            )}
          </TableBody>
        </Table>
      </div>

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
