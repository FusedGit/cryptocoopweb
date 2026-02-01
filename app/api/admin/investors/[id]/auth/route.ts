import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { logAdminAction } from '@/lib/admin'

// Check if investor has an auth account
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

    // Get investor
    const { data: investor } = await supabase
      .from('investors')
      .select('user_id, email')
      .eq('id', id)
      .single()

    if (!investor) {
      return NextResponse.json({ error: 'Investor not found' }, { status: 404 })
    }

    // Check if they have a user_id (linked to auth)
    if (investor.user_id) {
      // Try to get the auth user details
      const { data: authUser, error } = await supabase.auth.admin.getUserById(investor.user_id)
      
      if (!error && authUser) {
        return NextResponse.json({
          hasAccount: true,
          user: authUser.user,
        })
      }
    }

    return NextResponse.json({ hasAccount: false })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// Create auth account for investor
export async function POST(
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

  const { data: adminUser } = await supabase
    .from('admin_users')
    .select('id, role')
    .eq('user_id', user.id)
    .single()

  if (!adminUser || !['admin', 'super_admin'].includes(adminUser.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  try {
    const { id } = await params
    const { password } = await request.json()

    // Get investor
    const { data: investor } = await supabase
      .from('investors')
      .select('email, full_name, user_id')
      .eq('id', id)
      .single()

    if (!investor) {
      return NextResponse.json({ error: 'Investor not found' }, { status: 404 })
    }

    if (investor.user_id) {
      return NextResponse.json({ error: 'Investor already has an account' }, { status: 400 })
    }

    // Create auth user with temporary password
    const { data: authData, error: createError } = await supabase.auth.admin.createUser({
      email: investor.email,
      password: password || Math.random().toString(36).slice(-12), // Random password if not provided
      email_confirm: false, // User needs to confirm email
      user_metadata: {
        full_name: investor.full_name,
      },
    })

    if (createError) throw createError

    // Update investor with user_id
    await supabase
      .from('investors')
      .update({ 
        user_id: authData.user.id,
        status: 'active',
      })
      .eq('id', id)

    // Log action
    await logAdminAction('create_investor_account', 'investor', id, {
      email: investor.email,
    })

    return NextResponse.json({
      message: 'Account created successfully. Confirmation email sent.',
      user: authData.user,
    })
  } catch (error: any) {
    console.error('Error creating account:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
