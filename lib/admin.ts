import { createClient } from '@/lib/supabase/server'

export async function isAdmin() {
  const supabase = await createClient()
  
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return false

  const { data: adminUser } = await supabase
    .from('admin_users')
    .select('role')
    .eq('user_id', user.id)
    .single()

  return !!adminUser
}

export async function getAdminRole() {
  const supabase = await createClient()
  
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  const { data: adminUser } = await supabase
    .from('admin_users')
    .select('role')
    .eq('user_id', user.id)
    .single()

  return adminUser?.role || null
}

export async function logAdminAction(
  action: string,
  entityType: string,
  entityId?: string,
  changes?: any
) {
  const supabase = await createClient()
  
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return

  const { data: adminUser } = await supabase
    .from('admin_users')
    .select('id')
    .eq('user_id', user.id)
    .single()

  if (!adminUser) return

  await supabase.from('audit_logs').insert({
    admin_id: adminUser.id,
    action,
    entity_type: entityType,
    entity_id: entityId,
    changes: changes || {},
  })
}
