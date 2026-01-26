'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Mail, Phone, MapPin, FileCheck, Search, Filter, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Investor {
  id: string
  email: string
  full_name?: string
  phone?: string
  country?: string
  address?: string
  status: string
  risk_profile?: string
  contract_signed?: boolean
  contract_date?: string
  created_at: string
  investments?: Array<{
    id?: string
    amount?: number
    amount_paid?: number
    payment_status?: string
    payout_date?: string
  }>
}

export function InvestorsTable({ investors }: { investors: Investor[] }) {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [paymentFilter, setPaymentFilter] = useState('all')
  const [riskFilter, setRiskFilter] = useState('all')
  const [payoutFilter, setPayoutFilter] = useState('all')

  // Calculate payment status for each investor
  const investorsWithPaymentStatus = useMemo(() => {
    return investors.map(investor => {
      const hasPartialPayments = investor.investments?.some(inv => 
        inv.payment_status === 'partial'
      )
      const hasUnpaid = investor.investments?.some(inv => 
        inv.payment_status === 'unpaid'
      )
      const hasFullyPaid = investor.investments?.some(inv => 
        inv.payment_status === 'paid'
      )
      
      // Check for upcoming payouts (next 30 days)
      const hasUpcomingPayout = investor.investments?.some(inv => {
        if (!inv.payout_date) return false
        const payoutDate = new Date(inv.payout_date)
        const thirtyDaysFromNow = new Date()
        thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30)
        return payoutDate <= thirtyDaysFromNow && payoutDate >= new Date()
      })
      
      return {
        ...investor,
        hasPartialPayments,
        hasUnpaid,
        hasFullyPaid,
        hasUpcomingPayout,
      }
    })
  }, [investors])

  // Filter investors
  const filteredInvestors = useMemo(() => {
    return investorsWithPaymentStatus.filter(investor => {
      // Search filter
      const searchLower = searchTerm.toLowerCase()
      const matchesSearch = 
        !searchTerm ||
        investor.full_name?.toLowerCase().includes(searchLower) ||
        investor.email.toLowerCase().includes(searchLower) ||
        investor.country?.toLowerCase().includes(searchLower)

      // Status filter
      const matchesStatus = statusFilter === 'all' || investor.status === statusFilter

      // Risk filter
      const matchesRisk = riskFilter === 'all' || investor.risk_profile === riskFilter

      // Payment filter
      let matchesPayment = true
      if (paymentFilter === 'unpaid') {
        matchesPayment = investor.hasUnpaid || false
      } else if (paymentFilter === 'partial') {
        matchesPayment = investor.hasPartialPayments || false
      } else if (paymentFilter === 'paid') {
        matchesPayment = investor.hasFullyPaid || false
      }

      // Payout filter
      let matchesPayout = true
      if (payoutFilter === 'upcoming') {
        matchesPayout = investor.hasUpcomingPayout || false
      }

      return matchesSearch && matchesStatus && matchesRisk && matchesPayment && matchesPayout
    })
  }, [investorsWithPaymentStatus, searchTerm, statusFilter, paymentFilter, riskFilter])

  const handleRowClick = (investorId: string) => {
    router.push(`/admin/investors/${investorId}`)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'default'
      case 'pending':
        return 'secondary'
      case 'suspended':
      case 'inactive':
        return 'destructive'
      default:
        return 'secondary'
    }
  }

  const getRiskColor = (risk?: string) => {
    switch (risk) {
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
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
            placeholder="Search by name, email, or country..."
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
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>

          <Select value={riskFilter} onValueChange={setRiskFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Risk" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Risk</SelectItem>
              <SelectItem value="low">Low Risk</SelectItem>
              <SelectItem value="medium">Medium Risk</SelectItem>
              <SelectItem value="high">High Risk</SelectItem>
            </SelectContent>
          </Select>

          <Select value={paymentFilter} onValueChange={setPaymentFilter}>
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

          <Select value={payoutFilter} onValueChange={setPayoutFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Payouts" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Payouts</SelectItem>
              <SelectItem value="upcoming">Upcoming (30d)</SelectItem>
            </SelectContent>
          </Select>

          {(statusFilter !== 'all' || riskFilter !== 'all' || paymentFilter !== 'all' || payoutFilter !== 'all') && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setStatusFilter('all')
                setRiskFilter('all')
                setPaymentFilter('all')
                setPayoutFilter('all')
              }}
            >
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* Results count */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredInvestors.length} of {investors.length} investors
      </div>

      {/* Table */}
      <div className="rounded-lg border bg-card">
        <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Investor</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Investments</TableHead>
            <TableHead>Risk Profile</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Contract</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredInvestors.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                {searchTerm || statusFilter !== 'all' || riskFilter !== 'all'
                  ? 'No investors match your filters'
                  : 'No investors found'}
              </TableCell>
            </TableRow>
          ) : (
            filteredInvestors.map((investor) => {
              // Count investments
              const investmentCount = investor.investments?.length || 0

              return (
                <TableRow 
                  key={investor.id} 
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => handleRowClick(investor.id)}
                >
                  <TableCell>
                    <div>
                      <p className="font-medium">{investor.full_name || 'No name'}</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                        <Mail className="h-3 w-3" />
                        {investor.email}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    {investor.phone ? (
                      <p className="text-sm flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {investor.phone}
                      </p>
                    ) : (
                      <span className="text-muted-foreground text-sm">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {investor.country ? (
                      <p className="text-sm flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {investor.country}
                      </p>
                    ) : (
                      <span className="text-muted-foreground text-sm">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <span className="font-semibold">{investmentCount}</span>
                  </TableCell>
                  <TableCell>
                    {investor.risk_profile ? (
                      <Badge variant="outline" className={getRiskColor(investor.risk_profile)}>
                        {investor.risk_profile}
                      </Badge>
                    ) : (
                      <span className="text-muted-foreground text-sm">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(investor.status)} className="capitalize">
                      {investor.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {investor.contract_signed ? (
                      <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                        <FileCheck className="h-4 w-4" />
                        <span className="text-xs">Signed</span>
                      </div>
                    ) : (
                      <span className="text-muted-foreground text-sm">Pending</span>
                    )}
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
