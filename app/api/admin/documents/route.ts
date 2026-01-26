import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { logAdminAction } from '@/lib/admin'

export async function POST(request: Request) {
  const supabase = await createClient()

  // Check if user is admin
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data: adminUser } = await supabase
    .from('admin_users')
    .select('id, role')
    .eq('user_id', user.id)
    .single()

  if (!adminUser) {
    return NextResponse.json({ error: 'Forbidden - Admin access required' }, { status: 403 })
  }

  try {
    const formData = await request.formData()
    
    const investor_id = formData.get('investor_id') as string
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const category = formData.get('category') as string
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Upload to Supabase Storage
    const fileExt = file.name.split('.').pop()
    const fileName = `${category}-${investor_id}-${Date.now()}.${fileExt}`
    const filePath = `${category}s/${fileName}`

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('investor-documents')
      .upload(filePath, file, {
        contentType: file.type,
        upsert: false,
      })

    if (uploadError) {
      throw new Error(`Upload failed: ${uploadError.message}`)
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('investor-documents')
      .getPublicUrl(filePath)

    // Save document record
    const { data: document, error: docError } = await supabase
      .from('documents')
      .insert({
        investor_id,
        title,
        description,
        category,
        file_url: publicUrl,
        file_size: file.size,
        file_type: file.type,
      })
      .select()
      .single()

    if (docError) throw docError

    // Log admin action
    await logAdminAction('upload_document', 'document', document.id, {
      investor_id,
      title,
      category,
    })

    return NextResponse.json({
      message: 'Document uploaded successfully',
      document,
    })
  } catch (error: any) {
    console.error('Error uploading document:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
