import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // Check if investor profile exists
    let { data: investor } = await supabase
      .from('investors')
      .select('*')
      .eq('user_id', user.id)
      .single()

    // Create investor profile if it doesn't exist
    if (!investor) {
      const { data: newInvestor, error: investorError } = await supabase
        .from('investors')
        .insert({
          user_id: user.id,
          email: user.email,
          full_name: user.user_metadata?.full_name || 'Investor',
        })
        .select()
        .single()

      if (investorError) throw investorError
      investor = newInvestor
    }

    // Check if investments already exist
    const { data: existingInvestments } = await supabase
      .from('investments')
      .select('*')
      .eq('investor_id', investor.id)

    if (existingInvestments && existingInvestments.length > 0) {
      return NextResponse.json({ message: 'Investments already exist', investments: existingInvestments })
    }

    // Create sample investments
    const sampleInvestments = [
      {
        investor_id: investor.id,
        amount: 50000,
        currency: 'USD',
        apy_rate: 12.5,
        start_date: new Date().toISOString().split('T')[0],
        lock_period_months: 24,
        payout_date: new Date(Date.now() + 24 * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        status: 'active',
        monthly_payout: (50000 * 0.125) / 12,
        total_earnings: (50000 * 0.125) * 2,
      },
      {
        investor_id: investor.id,
        amount: 25000,
        currency: 'USD',
        apy_rate: 15.0,
        start_date: new Date(Date.now() - 6 * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        lock_period_months: 18,
        payout_date: new Date(Date.now() + 12 * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        status: 'active',
        monthly_payout: (25000 * 0.15) / 12,
        total_earnings: (25000 * 0.15) * 1.5,
      },
    ]

    const { data: investments, error: investmentError } = await supabase
      .from('investments')
      .insert(sampleInvestments)
      .select()

    if (investmentError) throw investmentError

    // Create sample transactions
    const sampleTransactions = [
      {
        investor_id: investor.id,
        type: 'deposit',
        amount: 50000,
        currency: 'USD',
        currency_type: 'fiat',
        payment_method: 'Bank Transfer',
        status: 'completed',
        description: 'Initial investment deposit',
        transaction_date: new Date().toISOString(),
      },
      {
        investor_id: investor.id,
        type: 'deposit',
        amount: 25000,
        currency: 'USD',
        currency_type: 'fiat',
        payment_method: 'VISA',
        status: 'completed',
        description: 'Additional investment',
        transaction_date: new Date(Date.now() - 6 * 30 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        investor_id: investor.id,
        type: 'payout',
        amount: 520.83,
        currency: 'USD',
        currency_type: 'fiat',
        payment_method: 'Bank Transfer',
        status: 'completed',
        description: 'Monthly interest payout',
        transaction_date: new Date(Date.now() - 1 * 30 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        investor_id: investor.id,
        type: 'deposit',
        amount: 0.5,
        currency: 'BTC',
        currency_type: 'crypto',
        payment_method: 'Bitcoin',
        status: 'pending',
        description: 'BTC deposit confirmation pending',
        transaction_date: new Date().toISOString(),
      },
    ]

    await supabase.from('transactions').insert(sampleTransactions)

    // Create sample scheduled payments
    const sampleScheduledPayments = [
      {
        investor_id: investor.id,
        investment_id: investments[0].id,
        amount: 520.83,
        payment_date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        status: 'scheduled',
        description: 'Monthly interest payment',
      },
      {
        investor_id: investor.id,
        investment_id: investments[0].id,
        amount: 520.83,
        payment_date: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        status: 'scheduled',
        description: 'Monthly interest payment',
      },
      {
        investor_id: investor.id,
        investment_id: investments[1].id,
        amount: 312.50,
        payment_date: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        status: 'scheduled',
        description: 'Monthly interest payment',
      },
    ]

    await supabase.from('scheduled_payments').insert(sampleScheduledPayments)

    // Create sample documents
    const sampleDocuments = [
      {
        investor_id: investor.id,
        title: 'Investment Agreement - 2026',
        description: 'Main investment contract and terms',
        category: 'contract',
        file_url: '#',
        file_size: 524288,
        file_type: 'pdf',
      },
      {
        investor_id: investor.id,
        title: 'Terms and Conditions',
        description: 'Platform terms and conditions',
        category: 'legal',
        file_url: '#',
        file_size: 245760,
        file_type: 'pdf',
      },
      {
        investor_id: investor.id,
        title: 'Q4 2025 Investment Report',
        description: 'Quarterly performance report',
        category: 'report',
        file_url: '#',
        file_size: 1048576,
        file_type: 'pdf',
      },
    ]

    await supabase.from('documents').insert(sampleDocuments)

    return NextResponse.json({ 
      message: 'Sample data created successfully',
      investments,
      transactionsCount: sampleTransactions.length,
      paymentsCount: sampleScheduledPayments.length,
      documentsCount: sampleDocuments.length,
    })
  } catch (error: any) {
    console.error('Error seeding investments:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
