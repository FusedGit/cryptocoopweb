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
import { Plus, Upload } from 'lucide-react'

interface Investor {
  id: string
  full_name?: string
  email: string
}

export function CreateInvestmentDialog({ investors }: { investors: Investor[] }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [contractFile, setContractFile] = useState<File | null>(null)
  const [formData, setFormData] = useState({
    investor_id: '',
    amount: '',
    currency: 'USD',
    apy_rate: '',
    lock_period_months: '',
    start_date: new Date().toISOString().split('T')[0],
    notes: '',
  })

  const calculatePayoutDate = () => {
    const start = new Date(formData.start_date)
    start.setMonth(start.getMonth() + parseInt(formData.lock_period_months || '0'))
    return start.toISOString().split('T')[0]
  }

  const calculateMonthlyPayout = () => {
    const amount = parseFloat(formData.amount || '0')
    const apy = parseFloat(formData.apy_rate || '0')
    return (amount * (apy / 100)) / 12
  }

  const calculateTotalEarnings = () => {
    const amount = parseFloat(formData.amount || '0')
    const apy = parseFloat(formData.apy_rate || '0')
    const years = parseInt(formData.lock_period_months || '0') / 12
    return amount * (apy / 100) * years
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formDataToSend = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value)
      })
      
      // Add calculated values
      formDataToSend.append('payout_date', calculatePayoutDate())
      formDataToSend.append('monthly_payout', calculateMonthlyPayout().toString())
      formDataToSend.append('total_earnings', calculateTotalEarnings().toString())
      
      if (contractFile) {
        formDataToSend.append('contract', contractFile)
      }

      const response = await fetch('/api/admin/investments', {
        method: 'POST',
        body: formDataToSend,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create investment')
      }

      setOpen(false)
      setFormData({
        investor_id: '',
        amount: '',
        currency: 'USD',
        apy_rate: '',
        lock_period_months: '',
        start_date: new Date().toISOString().split('T')[0],
        payment_status: 'unpaid',
        amount_paid: '0',
        notes: '',
      })
      setContractFile(null)
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
          <Plus className="h-4 w-4 mr-2" />
          Create Investment
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Investment</DialogTitle>
          <DialogDescription>
            Set up a new investment contract with payment tracking
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {/* Investor Selection */}
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

            {/* Investment Details */}
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Investment Amount *</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Input
                  id="currency"
                  value={formData.currency}
                  onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="apy_rate">APY Rate (%) *</Label>
                <Input
                  id="apy_rate"
                  type="number"
                  step="0.01"
                  value={formData.apy_rate}
                  onChange={(e) => setFormData({ ...formData, apy_rate: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* Time Period */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="lock_period_months">Lock Period (months) *</Label>
                <Input
                  id="lock_period_months"
                  type="number"
                  value={formData.lock_period_months}
                  onChange={(e) => setFormData({ ...formData, lock_period_months: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="start_date">Start Date *</Label>
                <Input
                  id="start_date"
                  type="date"
                  value={formData.start_date}
                  onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* Payment Status - Info only */}
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
                💡 Payment Tracking
              </p>
              <p className="text-xs text-blue-700 dark:text-blue-300">
                Payment status will be automatically calculated from deposit transactions. 
                Create deposit transactions linked to this investment to track payments.
              </p>
            </div>

            {/* Calculated Values Preview */}
            {formData.amount && formData.apy_rate && formData.lock_period_months && (
              <div className="p-4 bg-muted rounded-lg space-y-2">
                <p className="text-sm font-medium">Calculated Values:</p>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Monthly Payout:</span>
                    <p className="font-semibold">${calculateMonthlyPayout().toFixed(2)}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Total Earnings:</span>
                    <p className="font-semibold">${calculateTotalEarnings().toFixed(2)}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Payout Date:</span>
                    <p className="font-semibold">{new Date(calculatePayoutDate()).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Contract Upload */}
            <div className="space-y-2">
              <Label htmlFor="contract">Contract Document (Optional)</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="contract"
                  type="file"
                  onChange={(e) => setContractFile(e.target.files?.[0] || null)}
                  accept="application/pdf,.doc,.docx"
                />
                {contractFile && (
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Upload className="h-3 w-3" />
                    {contractFile.name}
                  </span>
                )}
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
                placeholder="Internal notes about this investment..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'Create Investment'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
