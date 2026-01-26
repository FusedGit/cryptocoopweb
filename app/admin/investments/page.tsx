import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { CreateInvestmentDialog } from '@/components/admin/create-investment-dialog'
import { InvestmentsTableWithFilters } from '@/components/admin/investments-table-with-filters'

export default async function AdminInvestments() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Get all investments with investor info
  const { data: investments } = await supabase
    .from('investments')
    .select(`
      *,
      investor:investors(id, full_name, email)
    `)
    .order('created_at', { ascending: false })

  // Get all investors for dropdown
  const { data: investors } = await supabase
    .from('investors')
    .select('id, full_name, email')
    .order('full_name')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Investment Management</h1>
          <p className="text-muted-foreground mt-2">
            Create and manage investment contracts with payment tracking
          </p>
        </div>
        <CreateInvestmentDialog investors={investors || []} />
      </div>

      {/* Investments Table */}
      <InvestmentsTableWithFilters investments={investments || []} />
    </div>
  )
}
