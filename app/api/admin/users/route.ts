import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { logAdminAction } from '@/lib/admin'

export async function POST(request: Request) {
  const supabase = await createClient()

  // Check if user is super admin
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

  if (!adminUser || adminUser.role !== 'super_admin') {
    return NextResponse.json({ error: 'Forbidden - Super Admin access required' }, { status: 403 })
  }

  try {
    const { email, role } = await request.json()

    // Find user by email using admin API
    const { data: { users }, error: usersError } = await supabase.auth.admin.listUsers()

    if (usersError) {
      throw new Error('Could not fetch users')
    }

    const targetUser = users?.find(u => u.email === email)

    if (!targetUser) {
      return NextResponse.json({ error: 'User not found. Make sure they have an account first.' }, { status: 404 })
    }

    // Check if already admin
    const { data: existingAdmin } = await supabase
      .from('admin_users')
      .select('*')
      .eq('user_id', targetUser.id)
      .single()

    if (existingAdmin) {
      return NextResponse.json({ error: 'User is already an admin' }, { status: 400 })
    }

    // Create admin user
    const { data: newAdmin, error: createError } = await supabase
      .from('admin_users')
      .insert({
        user_id: targetUser.id,
        role,
      })
      .select()
      .single()

    if (createError) throw createError

    // Log action
    await logAdminAction('create_admin', 'admin_user', newAdmin.id, { email, role })

    return NextResponse.json({
      message: 'Admin user created successfully',
      admin: newAdmin,
    })
  } catch (error: any) {
    console.error('Error creating admin:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
