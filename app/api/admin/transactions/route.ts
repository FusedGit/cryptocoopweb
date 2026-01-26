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

  if (!adminUser || !['admin', 'super_admin'].includes(adminUser.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  try {
    const formData = await request.formData()
    
    const investor_id = formData.get('investor_id') as string
    const investment_id = formData.get('investment_id') as string || null
    const type = formData.get('type') as string
    const amount = parseFloat(formData.get('amount') as string)
    const currency = formData.get('currency') as string
    const currency_type = formData.get('currency_type') as string
    const payment_method = formData.get('payment_method') as string
    const status = formData.get('status') as string
    const description = formData.get('description') as string
    const hash_code = formData.get('hash_code') as string
    const blockchain_link = formData.get('blockchain_link') as string
    const conversion_rate = parseFloat(formData.get('conversion_rate') as string || '1')
    const amount_in_investment_currency = parseFloat(formData.get('amount_usd') as string || '0') || (amount * conversion_rate)
    const receiptFile = formData.get('receipt') as File | null

    // Require receipt for all transactions
    if (!receiptFile) {
      return NextResponse.json({ error: 'Receipt/proof is required for all transactions' }, { status: 400 })
    }

    // Create transaction
    const { data: transaction, error: transactionError } = await supabase
      .from('transactions')
      .insert({
        investor_id,
        investment_id,
        type,
        amount,
        currency,
        currency_type,
        payment_method,
        status,
        description,
        conversion_rate,
        amount_in_investment_currency,
        receipt_required: true,
        receipt_verified: false,
      })
      .select()
      .single()

    if (transactionError) throw transactionError

    // Upload receipt (required)
    if (receiptFile) {
      const fileExt = receiptFile.name.split('.').pop()
      const fileName = `${transaction.id}-${Date.now()}.${fileExt}`
      const filePath = `receipts/${fileName}`

      // Upload to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('transaction-receipts')
        .upload(filePath, receiptFile, {
          contentType: receiptFile.type,
          upsert: false,
        })

      if (uploadError) {
        console.error('Upload error:', uploadError)
      } else {
        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('transaction-receipts')
          .getPublicUrl(filePath)

        // Save receipt record
        await supabase.from('transaction_receipts').insert({
          transaction_id: transaction.id,
          file_url: publicUrl,
          file_name: receiptFile.name,
          file_type: receiptFile.type,
          file_size: receiptFile.size,
          hash_code: hash_code || null,
          blockchain_link: blockchain_link || null,
          uploaded_by: adminUser.id,
        })

        // Mark receipt as verified
        await supabase
          .from('transactions')
          .update({ receipt_verified: true })
          .eq('id', transaction.id)
      }
    }

    // Create payment record if linked to investment
    if (investment_id && type === 'deposit') {
      await supabase.from('investment_payments').insert({
        investment_id,
        amount,
        payment_date: new Date().toISOString().split('T')[0],
        payment_method,
        reference_number: hash_code || transaction.id,
        notes: description,
        created_by: adminUser.id,
      })
    }
    
    // Note: Investment payment_status and amount_paid are automatically updated by database trigger

    // Log admin action
    await logAdminAction('create_transaction', 'transaction', transaction.id, {
      type,
      amount,
      investor_id,
    })

    return NextResponse.json({
      message: 'Transaction created successfully',
      transaction,
    })
  } catch (error: any) {
    console.error('Error creating transaction:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
