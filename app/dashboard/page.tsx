import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { TrendingUp } from 'lucide-react'
import { StatCard } from '@/components/dashboard/stat-card'
import { InvestmentGrowthChart } from '@/components/dashboard/investment-growth-chart'
import { MonthlyEarningsChart } from '@/components/dashboard/monthly-earnings-chart'
import { TransactionsTable } from '@/components/dashboard/transactions-table'
import { NextPayments } from '@/components/dashboard/next-payments'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Get investor profile
  const { data: investor } = await supabase
    .from('investors')
    .select('*')
    .eq('user_id', user.id)
    .single()

  // Get investments
  const { data: investments } = await supabase
    .from('investments')
    .select('*')
    .eq('investor_id', investor?.id || '')
    .eq('status', 'active')

  // Get transactions
  const { data: transactions } = await supabase
    .from('transactions')
    .select('*')
    .eq('investor_id', investor?.id || '')
    .order('transaction_date', { ascending: false })
    .limit(10)

  // Get scheduled payments
  const { data: scheduledPayments } = await supabase
    .from('scheduled_payments')
    .select('*')
    .eq('investor_id', investor?.id || '')
    .eq('status', 'scheduled')
    .order('payment_date', { ascending: true })

  // Calculate totals
  const totalInvested = investments?.reduce((sum, inv) => sum + Number(inv.amount), 0) || 0
  const totalMonthlyEarnings = investments?.reduce((sum, inv) => sum + Number(inv.monthly_payout), 0) || 0
  const totalProjectedEarnings = investments?.reduce((sum, inv) => sum + Number(inv.total_earnings), 0) || 0
  const averageAPY = investments?.length
    ? investments.reduce((sum, inv) => sum + Number(inv.apy_rate), 0) / investments.length
    : 0

  // Get the primary investment for chart display
  const primaryInvestment = investments?.[0]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Investment Overview</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Track your investments and earnings in real-time
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Invested"
          value={`$${totalInvested.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          subtitle={`${investments?.length || 0} active ${investments?.length === 1 ? 'investment' : 'investments'}`}
          icon="DollarSign"
          delay={0}
        />
        <StatCard
          title="Average APY"
          value={`${averageAPY.toFixed(2)}%`}
          subtitle="Annual percentage yield"
          icon="TrendingUp"
          delay={0.1}
        />
        <StatCard
          title="Monthly Earnings"
          value={`$${totalMonthlyEarnings.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          subtitle="Recurring monthly payout"
          icon="Wallet"
          trend={{ value: '12.5%', positive: true }}
          delay={0.2}
        />
        <StatCard
          title="Total Projected"
          value={`$${totalProjectedEarnings.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          subtitle="At deal completion"
          icon="Calendar"
          delay={0.3}
        />
      </div>

      {/* Charts and Next Payments Section */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Investment Growth Chart */}
        {primaryInvestment && (
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Investment Growth Projection</CardTitle>
              <CardDescription>
                Your investment value over time at {primaryInvestment.apy_rate}% APY
              </CardDescription>
            </CardHeader>
            <CardContent>
              <InvestmentGrowthChart
                principal={Number(primaryInvestment.amount)}
                monthlyRate={Number(primaryInvestment.apy_rate) / 12}
                months={primaryInvestment.lock_period_months}
              />
            </CardContent>
          </Card>
        )}

        {/* Next Payments */}
        <NextPayments payments={scheduledPayments || []} />
      </div>

      {/* Monthly Earnings Chart */}
      {primaryInvestment && (
        <Card>
          <CardHeader>
            <CardTitle>Monthly Earnings Breakdown</CardTitle>
            <CardDescription>
              Consistent monthly payouts of ${Number(primaryInvestment.monthly_payout).toFixed(2)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <MonthlyEarningsChart
              monthlyPayout={Number(primaryInvestment.monthly_payout)}
              months={primaryInvestment.lock_period_months}
            />
          </CardContent>
        </Card>
      )}

      {/* Transactions Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Recent Transactions</h2>
            <p className="text-muted-foreground">
              Your latest deposits, withdrawals, and payouts
            </p>
          </div>
        </div>
        <TransactionsTable transactions={transactions || []} />
      </div>

      {/* Active Investments List */}
      {investments && investments.length > 0 && (
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-800">
            <h3 className="text-lg font-semibold">Active Investments</h3>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-800">
            {investments.map((investment, index) => {
              const daysUntilPayout = Math.floor(
                (new Date(investment.payout_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
              )
              const monthsRemaining = Math.floor(daysUntilPayout / 30)

              return (
                <div key={investment.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <h4 className="font-semibold">Investment #{index + 1}</h4>
                        <span className="px-2 py-1 text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full">
                          Active
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <span>
                          Principal: <span className="font-medium text-gray-900 dark:text-gray-100">${Number(investment.amount).toLocaleString()}</span>
                        </span>
                        <span>•</span>
                        <span>
                          APY: <span className="font-medium text-gray-900 dark:text-gray-100">{investment.apy_rate}%</span>
                        </span>
                        <span>•</span>
                        <span>
                          Lock Period: <span className="font-medium text-gray-900 dark:text-gray-100">{investment.lock_period_months} months</span>
                        </span>
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Payout Date</p>
                      <p className="font-semibold">{new Date(investment.payout_date).toLocaleDateString()}</p>
                      <p className="text-xs text-gray-500">
                        {monthsRemaining} months remaining
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Monthly Payout</p>
                        <p className="text-lg font-semibold text-green-600 dark:text-green-400">
                          ${Number(investment.monthly_payout).toFixed(2)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Total Earnings</p>
                        <p className="text-lg font-semibold">
                          ${Number(investment.total_earnings).toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Final Value</p>
                        <p className="text-lg font-semibold">
                          ${(Number(investment.amount) + Number(investment.total_earnings)).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Empty State */}
      {(!investments || investments.length === 0) && (
        <div className="bg-white dark:bg-gray-900 rounded-xl p-12 border border-gray-200 dark:border-gray-800 text-center">
          <div className="max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 mx-auto bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
              <TrendingUp className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold">No Active Investments</h3>
            <p className="text-gray-600 dark:text-gray-400">
              You don't have any active investments yet. Contact us to get started with your first investment.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
