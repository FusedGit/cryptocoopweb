import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { logAdminAction } from '@/lib/admin'

export async function POST(request: Request) {
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

  if (!adminUser || adminUser.role !== 'super_admin') {
    return NextResponse.json({ error: 'Forbidden - Super Admin only' }, { status: 403 })
  }

  try {
    const { userId } = await request.json()

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 })
    }

    // Get target user
    const { data: targetUser, error: userError } = await supabase.auth.admin.getUserById(userId)

    if (userError || !targetUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Generate a session for the target user
    const { data: sessionData, error: sessionError } = await supabase.auth.admin.generateLink({
      type: 'magiclink',
      email: targetUser.user.email!,
    })

    if (sessionError) throw sessionError

    // Log impersonation
    await logAdminAction('impersonate_user', 'user', userId, {
      target_email: targetUser.user.email,
      admin_email: user.email,
    })

    return NextResponse.json({
      message: 'Impersonation link generated',
      link: sessionData.properties.action_link,
      email: targetUser.user.email,
    })
  } catch (error: any) {
    console.error('Error generating impersonation link:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
