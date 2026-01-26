import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { CreateInvestorDialog } from '@/components/admin/create-investor-dialog'
import { InvestorsTable } from '@/components/admin/investors-table'

export default async function InvestorsCRM() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Get all investors
  const { data: investors, error: investorsError } = await supabase
    .from('investors')
    .select('*')
    .order('created_at', { ascending: false })

  // Get investments separately to avoid RLS issues
  const investorIds = investors?.map(inv => inv.id) || []
  const { data: allInvestments } = await supabase
    .from('investments')
    .select('id, investor_id, amount, amount_paid, payment_status, payout_date')
    .in('investor_id', investorIds)

  // Enrich investors with their investments
  const enrichedInvestors = investors?.map(investor => ({
    ...investor,
    investments: allInvestments?.filter(inv => inv.investor_id === investor.id) || []
  })) || []

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Investor CRM</h1>
          <p className="text-muted-foreground mt-2">
            Manage investor profiles, contacts, and relationships
          </p>
        </div>
        <CreateInvestorDialog />
      </div>

      {/* Investors Table */}
      <InvestorsTable investors={enrichedInvestors} />
    </div>
  )
}
