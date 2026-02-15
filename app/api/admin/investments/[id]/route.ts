import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { logAdminAction } from '@/lib/admin'

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
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
    const { id } = await params
    const formData = await request.formData()
    
    const amount = parseFloat(formData.get('amount') as string)
    const currency = formData.get('currency') as string
    const apy_rate = parseFloat(formData.get('apy_rate') as string)
    const lock_period_months = parseInt(formData.get('lock_period_months') as string)
    const start_date = formData.get('start_date') as string
    const payout_date = formData.get('payout_date') as string
    const monthly_payout = parseFloat(formData.get('monthly_payout') as string)
    const total_earnings = parseFloat(formData.get('total_earnings') as string)
    const status = formData.get('status') as string
    const notes = formData.get('notes') as string
    const contractFile = formData.get('contract') as File | null

    // Get current investment
    const { data: currentInvestment } = await supabase
      .from('investments')
      .select('contract_url')
      .eq('id', id)
      .single()

    let contract_url = currentInvestment?.contract_url

    // Upload new contract if provided
    if (contractFile) {
      const fileExt = contractFile.name.split('.').pop()
      const fileName = `contract-${id}-${Date.now()}.${fileExt}`
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

    // Update investment (payment_status and amount_paid are auto-calculated)
    const { data: investment, error: investmentError } = await supabase
      .from('investments')
      .update({
        amount,
        currency,
        apy_rate,
        lock_period_months,
        start_date,
        payout_date,
        monthly_payout,
        total_earnings,
        status,
        contract_url,
        notes,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single()

    if (investmentError) throw investmentError

    // Log admin action
    await logAdminAction('update_investment', 'investment', id, {
      amount,
      apy_rate,
      status,
    })

    return NextResponse.json({
      message: 'Investment updated successfully',
      investment,
    })
  } catch (error: any) {
    console.error('Error updating investment:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
