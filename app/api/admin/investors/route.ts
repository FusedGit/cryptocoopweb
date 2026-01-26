import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { logAdminAction } from '@/lib/admin'

export async function POST(request: Request) {
  const supabase = await createClient()

  // Check if user is admin
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data: adminUser } = await supabase
    .from('admin_users')
    .select('role')
    .eq('user_id', user.id)
    .single()

  if (!adminUser || !['admin', 'super_admin'].includes(adminUser.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  try {
    const body = await request.json()

    // Create investor profile (without creating auth user for now)
    const { data: investor, error: investorError } = await supabase
      .from('investors')
      .insert({
        email: body.email,
        full_name: body.full_name,
        phone: body.phone,
        address: body.address,
        country: body.country,
        notes: body.notes,
        status: 'pending', // Will be active when they sign up
        risk_profile: body.risk_profile || 'medium',
        contract_signed: body.contract_signed || false,
        contract_date: body.contract_signed ? new Date().toISOString().split('T')[0] : null,
      })
      .select()
      .single()

    if (investorError) throw investorError

    // Log admin action
    await logAdminAction('create_investor', 'investor', investor.id, body)

    return NextResponse.json({
      message: 'Investor created successfully',
      investor,
    })
  } catch (error: any) {
    console.error('Error creating investor:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
