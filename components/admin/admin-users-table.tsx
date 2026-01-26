'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Shield, Crown, Eye, Mail } from 'lucide-react'

interface AdminUser {
  id: string
  user_id: string
  role: string
  email?: string
  created_at: string
  last_login?: string
}

export function AdminUsersTable({ adminUsers, currentUserId }: { adminUsers: AdminUser[]; currentUserId: string }) {
  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'super_admin':
        return <Crown className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
      case 'admin':
        return <Shield className="h-4 w-4 text-blue-600 dark:text-blue-400" />
      case 'viewer':
        return <Eye className="h-4 w-4 text-gray-600 dark:text-gray-400" />
      default:
        return null
    }
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'super_admin':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
      case 'admin':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
      case 'viewer':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
      default:
        return ''
    }
  }

  return (
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>User</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>User ID</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Last Login</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {adminUsers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                No admin users found
              </TableCell>
            </TableRow>
          ) : (
            adminUsers.map((admin) => {
              const isCurrentUser = admin.user_id === currentUserId

              return (
                <TableRow key={admin.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getRoleIcon(admin.role)}
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{admin.email || 'No email'}</p>
                          {isCurrentUser && (
                            <Badge variant="outline" className="text-xs">You</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getRoleBadgeColor(admin.role)}>
                      {admin.role.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <code className="text-xs text-muted-foreground">
                      {admin.user_id.slice(0, 8)}...
                    </code>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {new Date(admin.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {admin.last_login
                      ? new Date(admin.last_login).toLocaleDateString()
                      : '-'}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={isCurrentUser}
                    >
                      {isCurrentUser ? 'You' : 'Manage'}
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })
          )}
        </TableBody>
      </Table>
    </div>
  )
}
