import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { CreateAdminDialog } from '@/components/admin/create-admin-dialog'
import { AdminUsersTable } from '@/components/admin/admin-users-table'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default async function AdminUsersPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Check if user is super admin
  const { data: currentAdmin } = await supabase
    .from('admin_users')
    .select('role')
    .eq('user_id', user.id)
    .single()

  if (!currentAdmin || currentAdmin.role !== 'super_admin') {
    redirect('/admin') // Only super admins can manage admin users
  }

  // Get all admin users with their auth info
  const { data: adminUsers } = await supabase
    .from('admin_users')
    .select('*')
    .order('created_at', { ascending: false })

  // Get auth users to match with admin records
  const adminUserIds = adminUsers?.map(a => a.user_id) || []
  
  // Fetch user details from auth
  const enrichedAdmins = await Promise.all(
    (adminUsers || []).map(async (admin) => {
      const { data: { user: authUser } } = await supabase.auth.admin.getUserById(admin.user_id)
      return {
        ...admin,
        email: authUser?.email,
        created_at_auth: authUser?.created_at,
      }
    })
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin User Management</h1>
          <p className="text-muted-foreground mt-2">
            Manage admin users and their roles (Super Admin Only)
          </p>
        </div>
        <CreateAdminDialog />
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Admins</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{adminUsers?.length || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Super Admins</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {adminUsers?.filter(a => a.role === 'super_admin').length || 0}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Regular Admins</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {adminUsers?.filter(a => a.role === 'admin').length || 0}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Admin Users Table */}
      <AdminUsersTable adminUsers={enrichedAdmins || []} currentUserId={user.id} />
    </div>
  )
}
