import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { CreateTransactionDialog } from '@/components/admin/create-transaction-dialog'
import { AdminTransactionsTableWithFilters } from '@/components/admin/transactions-table-with-filters'

export default async function AdminTransactions() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Get all transactions with investor info
  const { data: transactions } = await supabase
    .from('transactions')
    .select(`
      *,
      investor:investors(full_name, email),
      receipts:transaction_receipts(*)
    `)
    .order('transaction_date', { ascending: false })

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
          <h1 className="text-3xl font-bold tracking-tight">Transaction Management</h1>
          <p className="text-muted-foreground mt-2">
            Record and manage all investor transactions with receipts
          </p>
        </div>
        <CreateTransactionDialog investors={investors || []} />
      </div>

      {/* Transactions Table */}
      <AdminTransactionsTableWithFilters transactions={transactions || []} />
    </div>
  )
}
