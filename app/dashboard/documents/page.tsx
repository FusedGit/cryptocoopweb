import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { FileText, Download, Calendar, File } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export default async function DocumentsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Get investor profile
  const { data: investor } = await supabase
    .from('investors')
    .select('*')
    .eq('user_id', user.id)
    .single()

  // Get documents
  const { data: documents } = await supabase
    .from('documents')
    .select('*')
    .eq('investor_id', investor?.id || '')
    .order('uploaded_at', { ascending: false })

  const categories = [
    { name: 'contract', label: 'Contracts', icon: FileText },
    { name: 'legal', label: 'Legal Documents', icon: File },
    { name: 'report', label: 'Reports', icon: FileText },
    { name: 'statement', label: 'Statements', icon: FileText },
  ]

  const getDocumentsByCategory = (category: string) => {
    return documents?.filter((doc) => doc.category === category) || []
  }

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return 'N/A'
    const kb = bytes / 1024
    if (kb < 1024) return `${kb.toFixed(1)} KB`
    return `${(kb / 1024).toFixed(1)} MB`
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Documents & Legal</h1>
        <p className="text-muted-foreground mt-2">
          Access your investment contracts, legal documents, and reports
        </p>
      </div>

      {/* Documents by Category */}
      {categories.map((category) => {
        const categoryDocs = getDocumentsByCategory(category.name)
        const CategoryIcon = category.icon

        return (
          <Card key={category.name}>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CategoryIcon className="h-5 w-5" />
                {category.label}
              </CardTitle>
              <CardDescription>
                {categoryDocs.length} document{categoryDocs.length !== 1 ? 's' : ''}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {categoryDocs.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <File className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No {category.label.toLowerCase()} available</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {categoryDocs.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors group"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className="p-2 rounded-lg bg-muted">
                          <FileText className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{doc.title}</h3>
                            {doc.file_type && (
                              <Badge variant="outline" className="text-xs uppercase">
                                {doc.file_type}
                              </Badge>
                            )}
                          </div>
                          {doc.description && (
                            <p className="text-sm text-muted-foreground">{doc.description}</p>
                          )}
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(doc.uploaded_at).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              })}
                            </span>
                            <span>{formatFileSize(doc.file_size)}</span>
                          </div>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" asChild>
                        <a href={doc.file_url} download target="_blank" rel="noopener noreferrer">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </a>
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )
      })}

      {/* Empty State */}
      {(!documents || documents.length === 0) && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Documents Yet</h3>
            <p className="text-muted-foreground text-center max-w-sm">
              Your investment contracts and legal documents will appear here once they are uploaded by our team.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
