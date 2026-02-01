import { Suspense } from 'react'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { CreateTransactionDialog } from '@/components/admin/create-transaction-dialog'
import { AdminTransactionsTableWithFilters } from '@/components/admin/transactions-table-with-filters'
import { PageHeader } from '@/components/admin/page-header'
import { TransactionsTableSkeleton } from '@/components/admin/dashboard-skeleton'
import { getTransactions } from '@/lib/queries'

async function TransactionsData() {
  // Use cached query
  const transactions = await getTransactions()
  return <AdminTransactionsTableWithFilters transactions={transactions} />
}

async function TransactionsHeader() {
  const supabase = await createClient()
  
  const { data: investors } = await supabase
    .from('investors')
    .select('id, full_name, email')
    .order('full_name')
  
  return (
    <PageHeader
      title="Transaction Management"
      description="Record and manage all investor transactions with receipts"
      action={<CreateTransactionDialog investors={investors || []} />}
    />
  )
}

export default async function AdminTransactions() {
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
        title="Transaction Management"
        description="Record and manage all investor transactions with receipts"
        action={<CreateTransactionDialog investors={investors || []} />}
      />

      {/* Dynamic Table - Only this shows skeleton */}
      <Suspense fallback={<TransactionsTableSkeleton />}>
        <TransactionsData />
      </Suspense>
    </div>
  )
}
