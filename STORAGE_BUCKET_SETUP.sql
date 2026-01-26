-- ========================================
-- SUPABASE STORAGE BUCKET SETUP
-- Run these commands in Supabase SQL Editor
-- ========================================

-- Step 1: Create the storage buckets (if not exists)
-- Note: You may need to create these via the Supabase Dashboard UI
-- Go to Storage → New Bucket

-- Bucket 1: transaction-receipts (public)
-- Bucket 2: investor-documents (public for easy access, but protected by RLS)

-- ========================================
-- Step 2: Set up RLS policies for storage
-- ========================================

-- For transaction-receipts bucket
-- ========================================

-- Allow admins to upload receipts
CREATE POLICY "Admins can upload receipts"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'transaction-receipts' AND
  auth.uid() IN (SELECT user_id FROM admin_users)
);

-- Allow admins to view all receipts
CREATE POLICY "Admins can view all receipts"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'transaction-receipts' AND
  auth.uid() IN (SELECT user_id FROM admin_users)
);

-- Allow admins to delete receipts
CREATE POLICY "Admins can delete receipts"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'transaction-receipts' AND
  auth.uid() IN (SELECT user_id FROM admin_users WHERE role IN ('admin', 'super_admin'))
);

-- For investor-documents bucket
-- ========================================

-- Allow admins to upload documents
CREATE POLICY "Admins can upload documents"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'investor-documents' AND
  auth.uid() IN (SELECT user_id FROM admin_users)
);

-- Allow admins to view all documents
CREATE POLICY "Admins can view all documents"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'investor-documents' AND
  auth.uid() IN (SELECT user_id FROM admin_users)
);

-- Allow investors to view their own documents
CREATE POLICY "Investors can view their documents"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'investor-documents' AND
  name LIKE '%' || (
    SELECT id::text FROM investors WHERE user_id = auth.uid()
  ) || '%'
);

-- Allow admins to delete documents
CREATE POLICY "Admins can delete documents"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'investor-documents' AND
  auth.uid() IN (SELECT user_id FROM admin_users WHERE role IN ('admin', 'super_admin'))
);

-- ========================================
-- Step 3: Grant storage permissions
-- ========================================

-- These are handled automatically by Supabase
-- But make sure your anon key has storage permissions

-- ========================================
-- DONE!
-- ========================================

-- Test by uploading a file through the admin panel
-- Check Storage → transaction-receipts or investor-documents
-- to verify files are being uploaded correctly
