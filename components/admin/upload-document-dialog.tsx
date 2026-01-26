'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Upload, AlertCircle } from 'lucide-react'

interface Investor {
  id: string
  full_name?: string
  email: string
}

export function UploadDocumentDialog({ investors }: { investors: Investor[] }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [formData, setFormData] = useState({
    investor_id: '',
    title: '',
    description: '',
    category: 'contract',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!file) {
      alert('Please select a file to upload')
      return
    }

    setLoading(true)

    try {
      const formDataToSend = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value)
      })
      formDataToSend.append('file', file)

      const response = await fetch('/api/admin/documents', {
        method: 'POST',
        body: formDataToSend,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to upload document')
      }

      setOpen(false)
      setFormData({
        investor_id: '',
        title: '',
        description: '',
        category: 'contract',
      })
      setFile(null)
      router.refresh()
    } catch (error: any) {
      console.error('Error:', error)
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Upload className="h-4 w-4 mr-2" />
          Upload Document
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Upload Document</DialogTitle>
          <DialogDescription>
            Upload contracts, legal documents, or reports for investors
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="investor_id">Investor *</Label>
              <Select
                value={formData.investor_id}
                onValueChange={(value) => setFormData({ ...formData, investor_id: value })}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select investor" />
                </SelectTrigger>
                <SelectContent>
                  {investors.map((investor) => (
                    <SelectItem key={investor.id} value={investor.id}>
                      {investor.full_name || investor.email}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Document Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Investment Agreement 2026"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="contract">Contract</SelectItem>
                  <SelectItem value="legal">Legal Document</SelectItem>
                  <SelectItem value="report">Report</SelectItem>
                  <SelectItem value="statement">Statement</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={2}
                placeholder="Brief description of the document..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="file">File * (PDF, DOC, DOCX)</Label>
              <Input
                id="file"
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                accept="application/pdf,.doc,.docx"
                required
              />
              {file && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Upload className="h-3 w-3" />
                  <span>{file.name}</span>
                  <span className="text-xs">({(file.size / 1024).toFixed(1)} KB)</span>
                </div>
              )}
            </div>

            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5" />
                <div className="text-sm text-blue-800 dark:text-blue-200">
                  <p className="font-medium mb-1">Document will be:</p>
                  <ul className="list-disc list-inside space-y-1 text-xs">
                    <li>Securely stored in Supabase Storage</li>
                    <li>Visible to the investor in their dashboard</li>
                    <li>Downloadable by investor and admins</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading || !file}>
              {loading ? 'Uploading...' : 'Upload Document'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
