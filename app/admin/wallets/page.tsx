import { Suspense } from 'react'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { PageHeader } from '@/components/admin/page-header'
import { AddWalletDialog } from '@/components/admin/add-wallet-dialog'
import { WalletsTable } from '@/components/admin/wallets-table'
import { Skeleton } from '@/components/ui/skeleton'

async function WalletsData() {
  const supabase = await createClient()
  
  const { data: wallets } = await supabase
    .from('wallet_addresses')
    .select('*')
    .order('created_at', { ascending: false })

  return <WalletsTable wallets={wallets || []} />
}

export default async function WalletsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Wallet Addresses"
        description="Monitor crypto wallet balances and transactions across all blockchains"
        action={<AddWalletDialog />}
      />

      <Suspense fallback={
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-20 bg-muted/50 rounded animate-pulse" />
          ))}
        </div>
      }>
        <WalletsData />
      </Suspense>
    </div>
  )
}
