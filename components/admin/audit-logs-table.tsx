'use client'

import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Activity, User } from 'lucide-react'

interface AuditLog {
  id: string
  action: string
  entity_type: string
  entity_id?: string
  changes?: any
  created_at: string
  admin_email?: string
  ip_address?: string
}

export function AuditLogsTable({ logs }: { logs: AuditLog[] }) {
  const getActionColor = (action: string) => {
    if (action.includes('create')) return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
    if (action.includes('update')) return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
    if (action.includes('delete')) return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
    return ''
  }

  return (
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Action</TableHead>
            <TableHead>Entity</TableHead>
            <TableHead>Admin</TableHead>
            <TableHead>Timestamp</TableHead>
            <TableHead>IP Address</TableHead>
            <TableHead className="text-right">Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                No audit logs yet
              </TableCell>
            </TableRow>
          ) : (
            logs.map((log) => (
              <TableRow key={log.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-muted-foreground" />
                    <Badge variant="outline" className={getActionColor(log.action)}>
                      {log.action.replace(/_/g, ' ')}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium capitalize">{log.entity_type.replace(/_/g, ' ')}</p>
                    {log.entity_id && (
                      <code className="text-xs text-muted-foreground">
                        {log.entity_id.slice(0, 8)}...
                      </code>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <User className="h-3 w-3 text-muted-foreground" />
                    <span className="text-sm">{log.admin_email || 'Unknown'}</span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {new Date(log.created_at).toLocaleString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {log.ip_address || '-'}
                </TableCell>
                <TableCell className="text-right">
                  {log.changes && Object.keys(log.changes).length > 0 && (
                    <Badge variant="secondary" className="text-xs">
                      {Object.keys(log.changes).length} changes
                    </Badge>
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
