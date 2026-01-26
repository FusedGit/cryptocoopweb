'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import { Upload } from 'lucide-react'

interface Investment {
  id: string
  amount: number
  currency: string
  apy_rate: number
  lock_period_months: number
  start_date: string
  payout_date: string
  monthly_payout: number
  total_earnings: number
  status: string
  payment_status?: string
  amount_paid?: number
  contract_url?: string
  notes?: string
}

interface EditInvestmentDialogProps {
  investment: Investment
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EditInvestmentDialog({ investment, open, onOpenChange }: EditInvestmentDialogProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [contractFile, setContractFile] = useState<File | null>(null)
  const [formData, setFormData] = useState({
    amount: investment.amount.toString(),
    currency: investment.currency,
    apy_rate: investment.apy_rate.toString(),
    lock_period_months: investment.lock_period_months.toString(),
    start_date: investment.start_date,
    payment_status: investment.payment_status || 'unpaid',
    amount_paid: (investment.amount_paid || 0).toString(),
    status: investment.status,
    notes: investment.notes || '',
  })

  useEffect(() => {
    setFormData({
      amount: investment.amount.toString(),
      currency: investment.currency,
      apy_rate: investment.apy_rate.toString(),
      lock_period_months: investment.lock_period_months.toString(),
      start_date: investment.start_date,
      payment_status: investment.payment_status || 'unpaid',
      amount_paid: (investment.amount_paid || 0).toString(),
      status: investment.status,
      notes: investment.notes || '',
    })
  }, [investment])

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
      
      // Remove amount_paid from form data - it's calculated from transactions
      formDataToSend.delete('amount_paid')
      formDataToSend.delete('payment_status')
      
      if (contractFile) {
        formDataToSend.append('contract', contractFile)
      }

      const response = await fetch(`/api/admin/investments/${investment.id}`, {
        method: 'PATCH',
        body: formDataToSend,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update investment')
      }

      onOpenChange(false)
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Investment</DialogTitle>
          <DialogDescription>
            Update investment details and payment status
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {/* Investment Details */}
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Investment Amount *</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.00000001"
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

            {/* Investment Status */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="status">Investment Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData({ ...formData, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="withdrawn">Withdrawn</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Payment Status (Auto-calculated)</Label>
                <div className="h-9 px-3 py-2 rounded-md border bg-muted flex items-center">
                  <span className="text-sm capitalize">{formData.payment_status}</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Updated automatically from deposit transactions
                </p>
              </div>
            </div>

            {/* Calculated Values Preview */}
            {formData.amount && formData.apy_rate && formData.lock_period_months && (
              <div className="p-4 bg-muted rounded-lg space-y-2">
                <p className="text-sm font-medium">Calculated Values:</p>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Monthly Payout:</span>
                    <p className="font-semibold font-mono">${calculateMonthlyPayout().toFixed(2)}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Total Earnings:</span>
                    <p className="font-semibold font-mono">${calculateTotalEarnings().toFixed(2)}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Payout Date:</span>
                    <p className="font-semibold">{new Date(calculatePayoutDate()).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="pt-2 border-t">
                  <span className="text-muted-foreground text-xs">Payment Progress:</span>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 h-2 bg-muted-foreground/20 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-600 dark:bg-green-400 transition-all"
                        style={{
                          width: `${Math.min(100, (parseFloat(formData.amount_paid) / parseFloat(formData.amount)) * 100)}%`
                        }}
                      />
                    </div>
                    <span className="text-xs font-medium">
                      {((parseFloat(formData.amount_paid) / parseFloat(formData.amount)) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Contract Upload */}
            <div className="space-y-2">
              <Label htmlFor="contract">
                {investment.contract_url ? 'Replace Contract (Optional)' : 'Upload Contract (Optional)'}
              </Label>
              <div className="space-y-2">
                {investment.contract_url && (
                  <div className="p-3 bg-muted rounded-lg flex items-center justify-between">
                    <span className="text-sm">Current contract uploaded</span>
                    <Button size="sm" variant="outline" asChild>
                      <a href={investment.contract_url} target="_blank" rel="noopener noreferrer">
                        View Current
                      </a>
                    </Button>
                  </div>
                )}
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
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Updating...' : 'Update Investment'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
