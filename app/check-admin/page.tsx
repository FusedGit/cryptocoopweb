import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react'

export default async function CheckAdminPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <XCircle className="h-5 w-5 text-red-500" />
              Not Authenticated
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>You need to log in first. Go to <a href="/login" className="underline text-blue-600">/login</a></p>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Check if user is admin
  const { data: adminUser, error: adminError } = await supabase
    .from('admin_users')
    .select('*')
    .eq('user_id', user.id)
    .single()

  // Get all admin users (for debugging)
  const { data: allAdmins, error: allAdminsError } = await supabase
    .from('admin_users')
    .select('*')

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Admin Status Checker</h1>
          <p className="text-muted-foreground mt-2">Debug tool to check if you're an admin</p>
        </div>

        {/* Current User */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              Current User (Authenticated)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <span className="font-medium">Email:</span>
              <span>{user.email}</span>
              
              <span className="font-medium">User ID:</span>
              <span className="font-mono text-xs">{user.id}</span>
              
              <span className="font-medium">Created:</span>
              <span>{new Date(user.created_at).toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>

        {/* Admin Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {adminUser ? (
                <>
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  Admin Status: YES ✅
                </>
              ) : (
                <>
                  <XCircle className="h-5 w-5 text-red-500" />
                  Admin Status: NO ❌
                </>
              )}
            </CardTitle>
            <CardDescription>
              {adminUser ? 'You have admin access' : 'You are NOT an admin user'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {adminUser ? (
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <span className="font-medium">Role:</span>
                  <Badge variant="default" className="w-fit capitalize">
                    {adminUser.role}
                  </Badge>
                  
                  <span className="font-medium">Admin ID:</span>
                  <span className="font-mono text-xs">{adminUser.id}</span>
                  
                  <span className="font-medium">Created:</span>
                  <span>{new Date(adminUser.created_at).toLocaleString()}</span>
                </div>

                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800 mt-4">
                  <p className="text-sm font-medium text-green-800 dark:text-green-200">
                    ✅ You can access the admin panel!
                  </p>
                  <a href="/admin" className="text-sm text-green-600 dark:text-green-400 underline mt-2 inline-block">
                    Go to Admin Panel →
                  </a>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {adminError && (
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                    <p className="text-sm font-medium text-red-800 dark:text-red-200 mb-2">Error:</p>
                    <code className="text-xs text-red-700 dark:text-red-300">{adminError.message}</code>
                  </div>
                )}

                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-3">
                    ⚠️ You need to be added as an admin
                  </p>
                  <div className="space-y-2 text-sm text-yellow-700 dark:text-yellow-300">
                    <p className="font-medium">To make yourself a super admin:</p>
                    <ol className="list-decimal list-inside space-y-1 ml-2">
                      <li>Go to Supabase Dashboard</li>
                      <li>Navigate to SQL Editor</li>
                      <li>Run this query:</li>
                    </ol>
                    <div className="mt-2 p-3 bg-black/5 dark:bg-white/5 rounded font-mono text-xs overflow-x-auto">
                      <pre>{`INSERT INTO admin_users (user_id, role)
VALUES ('${user.id}', 'super_admin');`}</pre>
                    </div>
                    <p className="mt-3 text-xs">Then refresh this page to verify.</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* All Admins */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-blue-500" />
              All Admin Users ({allAdmins?.length || 0})
            </CardTitle>
            <CardDescription>List of all users with admin access</CardDescription>
          </CardHeader>
          <CardContent>
            {allAdminsError ? (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                <p className="text-sm text-red-800 dark:text-red-200">Error: {allAdminsError.message}</p>
              </div>
            ) : allAdmins && allAdmins.length > 0 ? (
              <div className="space-y-2">
                {allAdmins.map((admin) => (
                  <div key={admin.id} className="p-3 rounded-lg border flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-mono text-xs text-muted-foreground">{admin.user_id}</p>
                      {admin.user_id === user.id && (
                        <Badge variant="default" className="text-xs mt-1">You</Badge>
                      )}
                    </div>
                    <Badge variant="outline" className="capitalize">{admin.role}</Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">
                No admin users found in the database
              </p>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Links</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <a href="/dashboard" className="block p-3 rounded-lg border hover:bg-muted transition-colors">
              → Investor Dashboard
            </a>
            <a href="/admin" className="block p-3 rounded-lg border hover:bg-muted transition-colors">
              → Admin Panel {!adminUser && '(will redirect if not admin)'}
            </a>
            <a href="/login" className="block p-3 rounded-lg border hover:bg-muted transition-colors">
              → Login Page
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
