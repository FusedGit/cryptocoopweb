import { cache } from 'react'
import { createClient } from '@/lib/supabase/server'

// React cache - dedups requests within a single render
// Data is cached for the duration of the request

export const getInvestors = cache(async () => {
  const supabase = await createClient()
  const { data } = await supabase
    .from('investors')
    .select('*')
    .order('created_at', { ascending: false })
  
  return data || []
})

export const getInvestments = cache(async () => {
  const supabase = await createClient()
  const { data } = await supabase
    .from('investments')
    .select(`*, investor:investors(id, full_name, email)`)
    .order('created_at', { ascending: false })
  
  return data || []
})

export const getTransactions = cache(async () => {
  const supabase = await createClient()
  const { data } = await supabase
    .from('transactions')
    .select(`
      *,
      investor:investors(full_name, email),
      receipts:transaction_receipts(*)
    `)
    .order('transaction_date', { ascending: false })
  
  return data || []
})

export const getDocuments = cache(async () => {
  const supabase = await createClient()
  const { data } = await supabase
    .from('documents')
    .select(`
      *,
      investor:investors(id, full_name, email)
    `)
    .order('uploaded_at', { ascending: false })
  
  return data || []
})

export const getInvestorWithDetails = cache(async (id: string) => {
  const supabase = await createClient()
  
  const { data: investor } = await supabase
    .from('investors')
    .select('*')
    .eq('id', id)
    .single()

  const { data: investments } = await supabase
    .from('investments')
    .select('*')
    .eq('investor_id', id)
    .order('created_at', { ascending: false })

  const { data: transactions } = await supabase
    .from('transactions')
    .select('*')
    .eq('investor_id', id)
    .order('transaction_date', { ascending: false })
    .limit(10)

  const { data: depositTransactions } = await supabase
    .from('transactions')
    .select('*, investment:investments(id, amount)')
    .eq('investor_id', id)
    .eq('type', 'deposit')
    .eq('status', 'completed')
    .order('transaction_date', { ascending: true })

  const { data: documents } = await supabase
    .from('documents')
    .select('*')
    .eq('investor_id', id)
    .order('uploaded_at', { ascending: false })

  return {
    investor,
    investments,
    transactions,
    depositTransactions,
    documents,
  }
})
