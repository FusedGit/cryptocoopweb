import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await params

    const { data: investments, error } = await supabase
      .from('investments')
      .select('id, amount, apy_rate, status, lock_period_months')
      .eq('investor_id', id)
      .eq('status', 'active')

    if (error) throw error

    return NextResponse.json({ investments })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
