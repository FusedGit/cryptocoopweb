import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { logAdminAction } from '@/lib/admin'

export async function POST(request: Request) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data: adminUser } = await supabase
    .from('admin_users')
    .select('id, role')
    .eq('user_id', user.id)
    .single()

  if (!adminUser) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  try {
    const body = await request.json()

    // Create wallet address
    const { data: wallet, error: walletError } = await supabase
      .from('wallet_addresses')
      .insert({
        address: body.address,
        currency: body.currency,
        blockchain: body.blockchain,
        address_type: body.address_type,
        owner_type: body.owner_type,
        label: body.label,
        notes: body.notes,
        api_provider: 'moralis',
        balance: 0,
      })
      .select()
      .single()

    if (walletError) throw walletError

    // Log action
    await logAdminAction('add_wallet', 'wallet_address', wallet.id, body)

    // TODO: Trigger initial sync via Moralis
    // This would call Moralis API to get current balance
    // await syncWalletBalance(wallet.id)

    return NextResponse.json({
      message: 'Wallet added successfully. Sync will begin shortly.',
      wallet,
    })
  } catch (error: any) {
    console.error('Error adding wallet:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
