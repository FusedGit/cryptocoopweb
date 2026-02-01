'use client'

import { Button } from '@/components/ui/button'
import { RefreshCw } from 'lucide-react'
import { toast } from 'sonner'
import { useState } from 'react'

export function SyncAllButton() {
  const [syncing, setSyncing] = useState(false)

  const handleSyncAll = async () => {
    setSyncing(true)
    toast.loading('Syncing all wallets from blockchain...')

    try {
      const response = await fetch('/api/admin/wallets/sync-all', {
        method: 'POST',
      })

      const data = await response.json()

      if (response.ok) {
        toast.success(
          `✅ Synced ${data.summary.success} wallets!\nSkipped: ${data.summary.skipped}, Errors: ${data.summary.errors}`,
          { duration: 5000 }
        )
        setTimeout(() => window.location.reload(), 1500)
      } else {
        toast.error(`Failed: ${data.error}`)
        setSyncing(false)
      }
    } catch (error) {
      toast.error('Failed to sync wallets')
      setSyncing(false)
    }
  }

  return (
    <Button 
      variant="outline" 
      size="sm"
      onClick={handleSyncAll}
      disabled={syncing}
    >
      <RefreshCw className={`h-4 w-4 mr-2 ${syncing ? 'animate-spin' : ''}`} />
      {syncing ? 'Syncing...' : 'Sync All Wallets'}
    </Button>
  )
}
