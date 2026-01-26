import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Mail, Phone, MapPin, Calendar, FileCheck, TrendingUp, FileText, Download, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export default async function InvestorDetailPage({ params }: { params: { id: string } }) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { id } = await params

  // Get investor details
  const { data: investor } = await supabase
    .from('investors')
    .select('*')
    .eq('id', id)
    .single()

  if (!investor) {
    redirect('/admin/investors')
  }

  // Get investor's investments
  const { data: investments } = await supabase
    .from('investments')
    .select('*')
    .eq('investor_id', id)
    .order('created_at', { ascending: false })

  // Get investor's transactions
  const { data: transactions } = await supabase
    .from('transactions')
    .select('*')
    .eq('investor_id', id)
    .order('transaction_date', { ascending: false })
    .limit(10)

  // Get all deposit transactions for payment tracking
  const { data: depositTransactions } = await supabase
    .from('transactions')
    .select('*, investment:investments(id, amount)')
    .eq('investor_id', id)
    .eq('type', 'deposit')
    .eq('status', 'completed')
    .order('transaction_date', { ascending: true })

  // Get investor's documents
  const { data: documents } = await supabase
    .from('documents')
    .select('*')
    .eq('investor_id', id)
    .order('uploaded_at', { ascending: false })

  // Calculate totals
  const totalInvested = investments?.reduce((sum, inv) => sum + Number(inv.amount), 0) || 0
  const totalEarnings = investments?.reduce((sum, inv) => sum + Number(inv.total_earnings), 0) || 0

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight">
              {investor.full_name || 'Investor Details'}
            </h1>
            <Badge variant={getStatusColor(investor.status)} className="capitalize">
              {investor.status}
            </Badge>
          </div>
          <p className="text-muted-foreground mt-2">{investor.email}</p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/admin/investors">← Back to CRM</Link>
        </Button>
      </div>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
          <CardDescription>Investor details and profile</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="h-4 w-4 text-muted-foreground mt-1" />
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">{investor.email}</p>
                </div>
              </div>
              {investor.phone && (
                <div className="flex items-start gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground mt-1" />
                  <div>
                    <p className="text-sm font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">{investor.phone}</p>
                  </div>
                </div>
              )}
              {investor.country && (
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                  <div>
                    <p className="text-sm font-medium">Location</p>
                    <p className="text-sm text-muted-foreground">
                      {investor.address ? `${investor.address}, ` : ''}{investor.country}
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Calendar className="h-4 w-4 text-muted-foreground mt-1" />
                <div>
                  <p className="text-sm font-medium">Member Since</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(investor.created_at).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              </div>
              {investor.contract_signed && (
                <div className="flex items-start gap-3">
                  <FileCheck className="h-4 w-4 text-green-600 dark:text-green-400 mt-1" />
                  <div>
                    <p className="text-sm font-medium">Contract Status</p>
                    <p className="text-sm text-green-600 dark:text-green-400">
                      Signed {investor.contract_date && `on ${new Date(investor.contract_date).toLocaleDateString()}`}
                    </p>
                  </div>
                </div>
              )}
              {investor.risk_profile && (
                <div className="flex items-start gap-3">
                  <TrendingUp className="h-4 w-4 text-muted-foreground mt-1" />
                  <div>
                    <p className="text-sm font-medium">Risk Profile</p>
                    <p className="text-sm text-muted-foreground capitalize">{investor.risk_profile}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          {investor.notes && (
            <div className="mt-4 pt-4 border-t">
              <p className="text-sm font-medium mb-2">Internal Notes</p>
              <p className="text-sm text-muted-foreground">{investor.notes}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Investment Summary */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Investment Size</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totalInvested.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Contract amount</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Paid to Date</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              ${(investments?.reduce((sum, inv) => sum + Number(inv.amount_paid || 0), 0) || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Actually invested</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Remaining</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              ${(investments?.reduce((sum, inv) => sum + (Number(inv.amount) - Number(inv.amount_paid || 0)), 0) || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Still to invest</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totalEarnings.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Projected APY</p>
          </CardContent>
        </Card>
      </div>

      {/* Investments with Payment Details */}
      <Card>
        <CardHeader>
          <CardTitle>Investments</CardTitle>
          <CardDescription>{investments?.length || 0} total</CardDescription>
        </CardHeader>
        <CardContent>
          {investments && investments.length > 0 ? (
            <div className="space-y-4">
              {investments.map((investment) => {
                const amountPaid = investment.amount_paid || 0
                const amountRemaining = investment.amount - amountPaid
                const paymentProgress = (amountPaid / investment.amount) * 100
                const isPaid = investment.payment_status === 'paid'

                return (
                  <div key={investment.id} className="p-4 rounded-lg border space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold font-mono">
                            ${Number(investment.amount).toLocaleString('en-US', { 
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2 
                            })}
                          </h3>
                          <Badge variant="outline" className="capitalize">
                            {investment.payment_status || 'unpaid'}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {investment.apy_rate}% APY • {investment.lock_period_months} months
                        </p>
                      </div>
                      <Badge variant="outline" className="capitalize">
                        {investment.status}
                      </Badge>
                    </div>

                    {/* Payment Progress */}
                    {!isPaid && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Payment Progress</span>
                          <span className="font-medium font-mono">
                            ${Number(amountPaid).toLocaleString('en-US', { 
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2 
                            })} / ${Number(investment.amount).toLocaleString('en-US', { 
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2 
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-green-600 dark:bg-green-400 transition-all"
                              style={{ width: `${Math.min(100, paymentProgress)}%` }}
                            />
                          </div>
                          <span className="text-xs font-medium w-12 text-right">
                            {paymentProgress.toFixed(1)}%
                          </span>
                        </div>
                        {amountRemaining > 0 && (
                          <p className="text-xs text-muted-foreground">
                            Remaining: ${Number(amountRemaining).toLocaleString('en-US', { 
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2 
                            })}
                          </p>
                        )}
                      </div>
                    )}

                    {isPaid && (
                      <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                        <p className="text-sm font-medium text-green-800 dark:text-green-200">
                          ✅ Fully Invested
                        </p>
                        <p className="text-xs text-green-700 dark:text-green-300 mt-1">
                          Last payment: {investment.last_payment_date ? new Date(investment.last_payment_date).toLocaleDateString() : 'N/A'}
                        </p>
                      </div>
                    )}

                    {/* Payment History for this Investment */}
                    {depositTransactions && depositTransactions.filter(t => t.investment_id === investment.id).length > 0 && (
                      <div className="pt-3 border-t">
                        <p className="text-sm font-medium mb-2">Payment History</p>
                        <div className="space-y-2">
                          {depositTransactions
                            .filter(t => t.investment_id === investment.id)
                            .map((txn) => {
                              const isCrypto = txn.currency_type === 'crypto' || !['USD', 'EUR', 'GBP'].includes(txn.currency)
                              const decimals = isCrypto ? 8 : 2
                              
                              return (
                                <div key={txn.id} className="flex items-center justify-between text-sm p-2 rounded bg-muted/50">
                                  <div>
                                    <span className="text-muted-foreground">
                                      {new Date(txn.transaction_date).toLocaleDateString()}
                                    </span>
                                    <span className="text-xs text-muted-foreground ml-2">
                                      via {txn.payment_method}
                                    </span>
                                  </div>
                                  <span className="font-medium font-mono">
                                    +{txn.currency === 'USD' ? '$' : ''}{Number(txn.amount).toLocaleString('en-US', { 
                                      minimumFractionDigits: decimals,
                                      maximumFractionDigits: decimals 
                                    })}{txn.currency !== 'USD' ? ' ' + txn.currency : ''}
                                  </span>
                                </div>
                              )
                            })}
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-3 gap-4 pt-3 border-t text-sm">
                      <div>
                        <p className="text-muted-foreground text-xs">Monthly Payout</p>
                        <p className="font-medium">${Number(investment.monthly_payout).toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs">Total Earnings</p>
                        <p className="font-medium">${Number(investment.total_earnings).toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs">Payout Date</p>
                        <p className="font-medium">{new Date(investment.payout_date).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">No investments</p>
          )}
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Last 10 transactions</CardDescription>
        </CardHeader>
        <CardContent>
          {transactions && transactions.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Payment Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => {
                const isCrypto = transaction.currency_type === 'crypto' || 
                                !['USD', 'EUR', 'GBP'].includes(transaction.currency)
                const decimals = isCrypto ? 8 : 2
                
                return (
                  <TableRow key={transaction.id}>
                    <TableCell className="capitalize">{transaction.type}</TableCell>
                    <TableCell className="font-medium font-mono">
                      {transaction.currency === 'USD' ? '$' : ''}
                      {Number(transaction.amount).toLocaleString('en-US', {
                        minimumFractionDigits: decimals,
                        maximumFractionDigits: decimals,
                      })}
                      {transaction.currency !== 'USD' ? ' ' + transaction.currency : ''}
                    </TableCell>
                    <TableCell>{transaction.payment_method}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {transaction.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">
                      {new Date(transaction.transaction_date).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                )
              })}
              </TableBody>
            </Table>
          ) : (
            <p className="text-center text-muted-foreground py-8">No transactions</p>
          )}
        </CardContent>
      </Card>

      {/* Documents */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Documents</CardTitle>
              <CardDescription>{documents?.length || 0} documents</CardDescription>
            </div>
            <Button size="sm" asChild>
              <Link href="/admin/documents">
                Upload Document
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {documents && documents.length > 0 ? (
            <div className="space-y-3">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className="p-2 rounded-lg bg-muted">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{doc.title}</h3>
                        <Badge variant="outline" className="text-xs capitalize">
                          {doc.category}
                        </Badge>
                      </div>
                      {doc.description && (
                        <p className="text-sm text-muted-foreground mt-1">{doc.description}</p>
                      )}
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(doc.uploaded_at).toLocaleDateString()}
                        </span>
                        {doc.file_type && (
                          <span className="uppercase">{doc.file_type}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" asChild>
                      <a href={doc.file_url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        View
                      </a>
                    </Button>
                    <Button size="sm" variant="outline" asChild>
                      <a href={doc.file_url} download>
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </a>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <FileText className="h-8 w-8 text-muted-foreground mx-auto mb-2 opacity-50" />
              <p className="text-muted-foreground mb-4">No documents uploaded</p>
              <Button size="sm" variant="outline" asChild>
                <Link href="/admin/documents">
                  Upload First Document
                </Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
