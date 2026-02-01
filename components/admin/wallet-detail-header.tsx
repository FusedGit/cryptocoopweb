'use client'

import { Button } from '@/components/ui/button'
import { RefreshCw, Copy } from 'lucide-react'
import Link from 'next/link'
import { CryptoIcon } from '@/components/crypto-icon'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

interface WalletDetailHeaderProps {
  wallet: any
}

export function WalletDetailHeader({ wallet }: WalletDetailHeaderProps) {
  const router = useRouter()

  const handleSync = async () => {
    toast.loading('Syncing wallet...')
    
    try {
      const response = await fetch(`/api/admin/wallets/${wallet.id}/sync`, {
        method: 'POST',
      })
      
      const data = await response.json()
      
      if (response.ok) {
        toast.success(`✅ Synced! Balance: ${data.balance} ${data.wallet?.currency}`)
        router.refresh()
      } else {
        toast.error(`Failed: ${data.error}`)
      }
    } catch (error) {
      toast.error('Sync failed')
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(wallet.address)
    toast.success('Address copied to clipboard!')
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <CryptoIcon symbol={wallet.currency} size={32} />
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{wallet.label || wallet.currency}</h1>
              <p className="text-muted-foreground capitalize">{wallet.blockchain} • {wallet.address_type}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href="/admin/wallets">← Back</Link>
          </Button>
          <Button onClick={handleSync}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Sync Now
          </Button>
        </div>
      </div>

      {/* Wallet Address Card */}
      <div className="p-4 bg-muted rounded-lg">
        <p className="text-sm text-muted-foreground mb-2">Wallet Address</p>
        <div className="flex items-center justify-between">
          <code className="text-sm font-mono">{wallet.address}</code>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleCopy}
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </>
  )
}
