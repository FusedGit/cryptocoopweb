import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { UploadDocumentDialog } from '@/components/admin/upload-document-dialog'
import { AdminDocumentsTableWithFilters } from '@/components/admin/documents-table-with-filters'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default async function AdminDocumentsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Get all documents with investor info
  const { data: documents } = await supabase
    .from('documents')
    .select(`
      *,
      investor:investors(id, full_name, email)
    `)
    .order('uploaded_at', { ascending: false })

  // Get all investors for dropdown
  const { data: investors } = await supabase
    .from('investors')
    .select('id, full_name, email')
    .order('full_name')

  // Get stats by category
  const contractCount = documents?.filter(d => d.category === 'contract').length || 0
  const legalCount = documents?.filter(d => d.category === 'legal').length || 0
  const reportCount = documents?.filter(d => d.category === 'report').length || 0
  const statementCount = documents?.filter(d => d.category === 'statement').length || 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Document Management</h1>
          <p className="text-muted-foreground mt-2">
            Upload and manage investor contracts, legal documents, and reports
          </p>
        </div>
        <UploadDocumentDialog investors={investors || []} />
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Contracts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contractCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Legal Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{legalCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reportCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Statements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statementCount}</div>
          </CardContent>
        </Card>
      </div>

      {/* Documents Table */}
      <AdminDocumentsTableWithFilters documents={documents || []} />
    </div>
  )
}
