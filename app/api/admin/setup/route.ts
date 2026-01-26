import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

// ⚠️ TEMPORARY SETUP ENDPOINT - DELETE AFTER CREATING YOUR ADMIN USER!
export async function POST(request: Request) {
  const supabase = await createClient()

  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 })
    }

    // Get all users (only works with service role key)
    const { data: { users }, error: usersError } = await supabase.auth.admin.listUsers()

    if (usersError) {
      // If admin API doesn't work, try to get current user
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
      }

      if (user.email !== email) {
        return NextResponse.json({ 
          error: 'Email does not match current user. Please sign in with the email you want to make admin.' 
        }, { status: 403 })
      }

      // Create admin user with current user
      const { data: adminUser, error: adminError } = await supabase
        .from('admin_users')
        .insert({ user_id: user.id, role: 'super_admin' })
        .select()
        .single()

      if (adminError) {
        return NextResponse.json({ error: adminError.message }, { status: 500 })
      }

      return NextResponse.json({ 
        success: true, 
        message: 'Super admin created successfully!',
        admin: {
          email: user.email,
          role: 'super_admin',
        }
      })
    }

    // Find user by email
    const user = users?.find(u => u.email === email)

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Check if already admin
    const { data: existingAdmin } = await supabase
      .from('admin_users')
      .select('*')
      .eq('user_id', user.id)
      .single()

    if (existingAdmin) {
      return NextResponse.json({ 
        success: true,
        message: 'User is already an admin',
        admin: existingAdmin 
      })
    }

    // Create admin user
    const { data: adminUser, error: adminError } = await supabase
      .from('admin_users')
      .insert({ user_id: user.id, role: 'super_admin' })
      .select()
      .single()

    if (adminError) {
      return NextResponse.json({ error: adminError.message }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Super admin created successfully!',
      admin: {
        email: user.email,
        role: 'super_admin',
      }
    })
  } catch (error: any) {
    console.error('Setup error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// Test endpoint to check if user is admin
export async function GET() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return NextResponse.json({ authenticated: false })
  }

  const { data: adminUser } = await supabase
    .from('admin_users')
    .select('role')
    .eq('user_id', user.id)
    .single()

  return NextResponse.json({ 
    authenticated: true,
    email: user.email,
    isAdmin: !!adminUser,
    role: adminUser?.role || null 
  })
}
