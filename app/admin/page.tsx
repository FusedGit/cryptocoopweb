import { Suspense } from 'react'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Users, TrendingUp, DollarSign, Calendar } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

// Stats component - streams independently
async function DashboardStats() {
  const supabase = await createClient()

  // Get total investors
  const { count: totalInvestors } = await supabase
    .from('investors')
    .select('*', { count: 'exact', head: true })

  // Get total investments
  const { count: totalInvestments } = await supabase
    .from('investments')
    .select('*', { count: 'exact', head: true })

  // Get all investments for calculations
  const { data: investments } = await supabase
    .from('investments')
    .select('amount, apy_rate, monthly_payout, total_earnings, status, payout_date')

  // Calculate totals
  const totalInvestedAmount = investments?.reduce((sum, inv) => sum + Number(inv.amount), 0) || 0
  const totalPayoutsScheduled = investments
    ?.filter(inv => inv.status === 'active')
    .reduce((sum, inv) => sum + Number(inv.monthly_payout), 0) || 0

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Investors</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalInvestors || 0}</div>
          <p className="text-xs text-muted-foreground mt-1">
            Registered users
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Investments</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalInvestments || 0}</div>
          <p className="text-xs text-muted-foreground mt-1">
            Active investment contracts
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Invested</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${totalInvestedAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Total capital managed
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Monthly Payouts</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${totalPayoutsScheduled.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Recurring monthly obligations
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

// Recent activity component - streams independently
async function RecentActivity() {
  const supabase = await createClient()

  // Get upcoming payouts (next 30 days)
  const thirtyDaysFromNow = new Date()
  thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30)
  
  const { data: upcomingPayments } = await supabase
    .from('scheduled_payments')
    .select('amount, payment_date, status')
    .eq('status', 'scheduled')
    .lte('payment_date', thirtyDaysFromNow.toISOString().split('T')[0])

  const upcomingPayoutsAmount = upcomingPayments?.reduce((sum, p) => sum + Number(p.amount), 0) || 0

  // Get active investors (recent activity)
  const { data: activeInvestors } = await supabase
    .from('investors')
    .select('id, full_name, email, created_at, status')
    .eq('status', 'active')
    .order('created_at', { ascending: false })
    .limit(5)

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Recent Investors */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Investors</CardTitle>
          <CardDescription>Latest registered investors</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activeInvestors && activeInvestors.length > 0 ? (
              activeInvestors.map((investor) => (
                <div key={investor.id} className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <p className="font-medium">{investor.full_name || 'No name'}</p>
                    <p className="text-sm text-muted-foreground">{investor.email}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">
                      {new Date(investor.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-muted-foreground py-8">No investors yet</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Payouts */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Payouts (30 days)</CardTitle>
          <CardDescription>Scheduled payments due soon</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingPayments && upcomingPayments.length > 0 ? (
              <>
                <div className="p-4 rounded-lg bg-muted">
                  <p className="text-sm text-muted-foreground">Total Due</p>
                  <p className="text-2xl font-bold">
                    ${upcomingPayoutsAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {upcomingPayments.length} payment{upcomingPayments.length !== 1 ? 's' : ''} scheduled
                  </p>
                </div>
                {upcomingPayments.slice(0, 3).map((payment, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <p className="font-medium">
                        ${Number(payment.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">{new Date(payment.payment_date).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <p className="text-center text-muted-foreground py-8">No upcoming payouts</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Main page component
export default async function AdminDashboard() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="space-y-8">
      {/* Header - Static, loads instantly */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Manage investors, investments, and platform operations
        </p>
      </div>

      {/* Stats - Stream with Suspense */}
      <Suspense fallback={<DashboardStatsSkeleton />}>
        <DashboardStats />
      </Suspense>

      {/* Recent Activity - Stream independently */}
      <Suspense fallback={<RecentActivitySkeleton />}>
        <RecentActivity />
      </Suspense>
    </div>
  )
}

// Skeleton components for granular loading
function DashboardStatsSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {[...Array(4)].map((_, i) => (
        <Card key={i}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="h-4 w-32 bg-muted animate-pulse rounded" />
            <div className="h-4 w-4 bg-muted animate-pulse rounded" />
          </CardHeader>
          <CardContent>
            <div className="h-8 w-24 bg-muted animate-pulse rounded mb-2" />
            <div className="h-3 w-40 bg-muted animate-pulse rounded" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function RecentActivitySkeleton() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {[...Array(2)].map((_, i) => (
        <Card key={i}>
          <CardHeader>
            <div className="h-5 w-48 bg-muted animate-pulse rounded mb-2" />
            <div className="h-4 w-64 bg-muted animate-pulse rounded" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[...Array(3)].map((_, j) => (
                <div key={j} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="space-y-2 flex-1">
                    <div className="h-4 w-48 bg-muted animate-pulse rounded" />
                    <div className="h-3 w-32 bg-muted animate-pulse rounded" />
                  </div>
                  <div className="h-3 w-20 bg-muted animate-pulse rounded" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
