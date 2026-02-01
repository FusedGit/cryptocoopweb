import { Suspense } from 'react'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { CreateInvestorDialog } from '@/components/admin/create-investor-dialog'
import { InvestorsTable } from '@/components/admin/investors-table'
import { PageHeader } from '@/components/admin/page-header'
import { InvestorsTableSkeleton } from '@/components/admin/dashboard-skeleton'
import { getInvestors } from '@/lib/queries'

async function InvestorsData() {
  const supabase = await createClient()
  
  // Fetch investors with React cache
  const investors = await getInvestors()

  // Get investments separately
  const investorIds = investors?.map(inv => inv.id) || []
  
  if (investorIds.length === 0) {
    return <InvestorsTable investors={[]} />
  }

  const { data: allInvestments } = await supabase
    .from('investments')
    .select('id, investor_id, amount, amount_paid, payment_status, payout_date')
    .in('investor_id', investorIds)

  // Enrich investors with their investments
  const enrichedInvestors = investors?.map(investor => ({
    ...investor,
    investments: allInvestments?.filter(inv => inv.investor_id === investor.id) || []
  })) || []

  return <InvestorsTable investors={enrichedInvestors} />
}

export default async function InvestorsCRM() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="space-y-6">
      {/* Static Header - Renders instantly, no Suspense */}
      <PageHeader
        title="Investor CRM"
        description="Manage investor profiles, contacts, and relationships"
        action={<CreateInvestorDialog />}
      />

      {/* Dynamic Table - Only this shows skeleton */}
      <Suspense fallback={<InvestorsTableSkeleton />}>
        <InvestorsData />
      </Suspense>
    </div>
  )
}
