import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { AuditLogsTable } from '@/components/admin/audit-logs-table'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default async function AuditLogsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Get audit logs with admin info
  const { data: auditLogs } = await supabase
    .from('audit_logs')
    .select(`
      *,
      admin:admin_users(id, user_id)
    `)
    .order('created_at', { ascending: false })
    .limit(100)

  // Enrich with admin email
  const enrichedLogs = await Promise.all(
    (auditLogs || []).map(async (log) => {
      if (log.admin?.user_id) {
        const { data: { user: adminUser } } = await supabase.auth.admin.getUserById(log.admin.user_id)
        return {
          ...log,
          admin_email: adminUser?.email,
        }
      }
      return log
    })
  )

  // Get stats
  const totalActions = auditLogs?.length || 0
  const uniqueAdmins = new Set(auditLogs?.map(log => log.admin_id).filter(Boolean)).size

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Audit Logs</h1>
        <p className="text-muted-foreground mt-2">
          Complete history of all admin actions and changes
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalActions}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Active Admins</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{uniqueAdmins}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Last 24 Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {auditLogs?.filter(log => {
                const dayAgo = new Date()
                dayAgo.setDate(dayAgo.getDate() - 1)
                return new Date(log.created_at) > dayAgo
              }).length || 0}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Audit Logs Table */}
      <AuditLogsTable logs={enrichedLogs || []} />
    </div>
  )
}
