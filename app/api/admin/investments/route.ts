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
    .select('id, role')
    .eq('user_id', user.id)
    .single()

  if (!adminUser) {
    return NextResponse.json({ error: 'Forbidden - Admin access required' }, { status: 403 })
  }

  try {
    const formData = await request.formData()
    
    const investor_id = formData.get('investor_id') as string
    const amount = parseFloat(formData.get('amount') as string)
    const currency = formData.get('currency') as string
    const apy_rate = parseFloat(formData.get('apy_rate') as string)
    const lock_period_months = parseInt(formData.get('lock_period_months') as string)
    const start_date = formData.get('start_date') as string
    const payout_date = formData.get('payout_date') as string
    const monthly_payout = parseFloat(formData.get('monthly_payout') as string)
    const total_earnings = parseFloat(formData.get('total_earnings') as string)
    const notes = formData.get('notes') as string
    const contractFile = formData.get('contract') as File | null

    let contract_url = null

    // Upload contract if provided
    if (contractFile) {
      const fileExt = contractFile.name.split('.').pop()
      const fileName = `contract-${investor_id}-${Date.now()}.${fileExt}`
      const filePath = `contracts/${fileName}`

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('investor-documents')
        .upload(filePath, contractFile, {
          contentType: contractFile.type,
          upsert: false,
        })

      if (!uploadError) {
        const { data: { publicUrl } } = supabase.storage
          .from('investor-documents')
          .getPublicUrl(filePath)
        
        contract_url = publicUrl
      }
    }

    // Create investment
    const { data: investment, error: investmentError } = await supabase
      .from('investments')
      .insert({
        investor_id,
        amount,
        currency,
        apy_rate,
        lock_period_months,
        start_date,
        payout_date,
        monthly_payout,
        total_earnings,
        status: 'active',
        payment_status: 'unpaid', // Will be updated by transactions
        amount_paid: 0, // Will be calculated from transactions
        contract_url,
        notes,
        next_payout_date: start_date,
      })
      .select()
      .single()

    if (investmentError) throw investmentError

    // Log admin action
    await logAdminAction('create_investment', 'investment', investment.id, {
      investor_id,
      amount,
      apy_rate,
    })

    return NextResponse.json({
      message: 'Investment created successfully',
      investment,
    })
  } catch (error: any) {
    console.error('Error creating investment:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
