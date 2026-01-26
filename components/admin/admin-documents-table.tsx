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
import { FileText, Download, Calendar, User } from 'lucide-react'

interface Document {
  id: string
  title: string
  description?: string
  category: string
  file_url: string
  file_size?: number
  file_type?: string
  uploaded_at: string
  investor?: { id: string; full_name?: string; email: string }
}

export function AdminDocumentsTable({ documents }: { documents: Document[] }) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'contract':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
      case 'legal':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400'
      case 'report':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
      case 'statement':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
      default:
        return ''
    }
  }

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return 'N/A'
    const kb = bytes / 1024
    if (kb < 1024) return `${kb.toFixed(1)} KB`
    return `${(kb / 1024).toFixed(1)} MB`
  }

  return (
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Document</TableHead>
            <TableHead>Investor</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>File Info</TableHead>
            <TableHead>Uploaded</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {documents.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                No documents uploaded yet
              </TableCell>
            </TableRow>
          ) : (
            documents.map((doc) => (
              <TableRow key={doc.id}>
                <TableCell>
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-muted">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium">{doc.title}</p>
                      {doc.description && (
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {doc.description}
                        </p>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <User className="h-3 w-3 text-muted-foreground" />
                    <span className="text-sm">
                      {doc.investor?.full_name || doc.investor?.email || 'Unknown'}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={getCategoryColor(doc.category)}>
                    {doc.category}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    <p className="text-muted-foreground">
                      {doc.file_type?.toUpperCase() || 'PDF'}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatFileSize(doc.file_size)}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {new Date(doc.uploaded_at).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button size="sm" variant="outline" asChild>
                      <a href={doc.file_url} target="_blank" rel="noopener noreferrer">
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </a>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
