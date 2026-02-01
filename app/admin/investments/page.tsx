import { Suspense } from 'react'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { CreateInvestmentDialog } from '@/components/admin/create-investment-dialog'
import { InvestmentsTableWithFilters } from '@/components/admin/investments-table-with-filters'
import { PageHeader } from '@/components/admin/page-header'
import { Skeleton } from '@/components/ui/skeleton'
import { getInvestments } from '@/lib/queries'

async function InvestmentsData() {
  // Use cached query
  const investments = await getInvestments()
  return <InvestmentsTableWithFilters investments={investments} />
}

async function InvestmentsHeader() {
  const supabase = await createClient()
  
  const { data: investors } = await supabase
    .from('investors')
    .select('id, full_name, email')
    .order('full_name')
  
  return (
    <PageHeader
      title="Investment Management"
      description="Create and manage investment contracts with payment tracking"
      action={<CreateInvestmentDialog investors={investors || []} />}
    />
  )
}

export default async function AdminInvestments() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Get investors for the dialog - no Suspense needed
  const { data: investors } = await supabase
    .from('investors')
    .select('id, full_name, email')
    .order('full_name')

  return (
    <div className="space-y-6">
      {/* Static Header - Renders instantly, no skeleton */}
      <PageHeader
        title="Investment Management"
        description="Create and manage investment contracts with payment tracking"
        action={<CreateInvestmentDialog investors={investors || []} />}
      />

      {/* Dynamic Table - Only this shows skeleton */}
      <Suspense fallback={
        <div className="space-y-4">
          <div className="flex gap-4">
            <Skeleton className="h-9 w-[130px]" />
            <Skeleton className="h-9 w-[160px]" />
          </div>
          <Skeleton className="h-4 w-48" />
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-16 bg-muted/50 rounded animate-pulse" />
          ))}
        </div>
      }>
        <InvestmentsData />
      </Suspense>
    </div>
  )
}
