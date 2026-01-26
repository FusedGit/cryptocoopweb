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

export function CreateTransactionDialog({ investors }: { investors: Investor[] }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [formData, setFormData] = useState({
    investor_id: '',
    investment_id: '',
    type: 'deposit',
    amount: '',
    currency: 'USD',
    currency_type: 'fiat',
    payment_method: '',
    status: 'completed',
    description: '',
    hash_code: '',
    blockchain_link: '',
    conversion_rate: '1',
    amount_usd: '',
  })
  const [investments, setInvestments] = useState<any[]>([])
  const [fetchingPrice, setFetchingPrice] = useState(false)

  // Fetch investments when investor is selected
  const handleInvestorChange = async (investorId: string) => {
    setFormData({ ...formData, investor_id: investorId, investment_id: '' })
    
    // Fetch investments for this investor
    const response = await fetch(`/api/admin/investors/${investorId}/investments`)
    if (response.ok) {
      const data = await response.json()
      setInvestments(data.investments || [])
    }
  }

  // Fetch real-time crypto price
  const fetchCryptoPrice = async (symbol: string) => {
    if (!symbol || formData.currency_type !== 'crypto') return

    setFetchingPrice(true)
    try {
      const response = await fetch(`/api/crypto-price?symbol=${symbol}`)
      if (response.ok) {
        const data = await response.json()
        const rate = data.price.toString()
        const usdAmount = (parseFloat(formData.amount || '0') * parseFloat(rate)).toFixed(2)
        
        setFormData({
          ...formData,
          conversion_rate: rate,
          amount_usd: usdAmount,
        })
      }
    } catch (error) {
      console.error('Error fetching price:', error)
      alert('Could not fetch live price. Please enter manually.')
    } finally {
      setFetchingPrice(false)
    }
  }

  // Auto-fetch price when currency or amount changes
  const handleCurrencyChange = (newCurrency: string) => {
    const upper = newCurrency.toUpperCase()
    const isCrypto = !['USD', 'EUR', 'GBP', 'JPY', 'CHF'].includes(upper)
    
    setFormData({ 
      ...formData, 
      currency: upper,
      currency_type: isCrypto ? 'crypto' : 'fiat',
      conversion_rate: '1',
      amount_usd: '',
    })

    // Auto-fetch price for crypto
    if (isCrypto && formData.investment_id) {
      setTimeout(() => fetchCryptoPrice(upper), 300)
    }
  }

  const handleAmountChange = (newAmount: string) => {
    setFormData({ ...formData, amount: newAmount })
    
    // Recalculate USD amount if conversion rate exists
    if (formData.conversion_rate && parseFloat(formData.conversion_rate) > 1) {
      const usdAmount = (parseFloat(newAmount || '0') * parseFloat(formData.conversion_rate)).toFixed(2)
      setFormData(prev => ({ ...prev, amount: newAmount, amount_usd: usdAmount }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (!file) {
        alert('Receipt/proof is required for all transactions')
        return
      }

      const formDataToSend = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        if (value) { // Only append non-empty values
          formDataToSend.append(key, value)
        }
      })
      formDataToSend.append('receipt', file)

      const response = await fetch('/api/admin/transactions', {
        method: 'POST',
        body: formDataToSend,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create transaction')
      }

      setOpen(false)
      setFormData({
        investor_id: '',
        investment_id: '',
        type: 'deposit',
        amount: '',
        currency: 'USD',
        currency_type: 'fiat',
        payment_method: '',
        status: 'completed',
        description: '',
        hash_code: '',
        blockchain_link: '',
      })
      setFile(null)
      setInvestments([])
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
          Add Transaction
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Transaction</DialogTitle>
          <DialogDescription>
            Record a transaction with optional receipt upload
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="investor_id">Investor *</Label>
                <Select
                  value={formData.investor_id}
                  onValueChange={handleInvestorChange}
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
                <Label htmlFor="investment_id">Investment (Optional)</Label>
                <Select
                  value={formData.investment_id}
                  onValueChange={(value) => setFormData({ ...formData, investment_id: value })}
                  disabled={!formData.investor_id}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={formData.investor_id ? "Select investment" : "Select investor first"} />
                  </SelectTrigger>
                  <SelectContent>
                    {investments.map((investment) => (
                      <SelectItem key={investment.id} value={investment.id}>
                        ${Number(investment.amount).toLocaleString()} @ {investment.apy_rate}% APY
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Link this transaction to a specific investment
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Type *</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => setFormData({ ...formData, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="deposit">Deposit</SelectItem>
                    <SelectItem value="withdrawal">Withdrawal</SelectItem>
                    <SelectItem value="payout">Payout</SelectItem>
                    <SelectItem value="fee">Fee</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Amount *</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.00000001"
                  value={formData.amount}
                  onChange={(e) => handleAmountChange(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="currency">Currency *</Label>
                <Input
                  id="currency"
                  value={formData.currency}
                  onChange={(e) => handleCurrencyChange(e.target.value)}
                  onBlur={() => {
                    if (formData.currency_type === 'crypto' && formData.investment_id && formData.amount) {
                      fetchCryptoPrice(formData.currency)
                    }
                  }}
                  placeholder="e.g., USD, BTC, ETH"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Crypto: BTC, ETH, XMR, SOL, etc.
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="currency_type">Currency Type *</Label>
                <Select
                  value={formData.currency_type}
                  onValueChange={(value) => setFormData({ ...formData, currency_type: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fiat">Fiat</SelectItem>
                    <SelectItem value="crypto">Crypto</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Conversion Rate for Crypto */}
            {formData.currency_type === 'crypto' && formData.investment_id && (
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                      💱 Live Price Conversion (CoinGecko)
                    </p>
                    <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                      Real-time {formData.currency}/USD rate for accurate tracking
                    </p>
                  </div>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => fetchCryptoPrice(formData.currency)}
                    disabled={fetchingPrice || !formData.currency || !formData.amount}
                  >
                    {fetchingPrice ? 'Fetching...' : 'Get Live Price'}
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="conversion_rate">
                      1 {formData.currency} = USD *
                    </Label>
                    <Input
                      id="conversion_rate"
                      type="number"
                      step="0.01"
                      value={formData.conversion_rate}
                      onChange={(e) => {
                        const rate = e.target.value
                        const usdAmount = (parseFloat(formData.amount || '0') * parseFloat(rate || '1')).toFixed(2)
                        setFormData({ 
                          ...formData, 
                          conversion_rate: rate,
                          amount_usd: usdAmount
                        })
                      }}
                      placeholder="Click 'Get Live Price'"
                      required
                      className="font-mono"
                    />
                    <p className="text-xs text-muted-foreground">
                      Auto-filled from CoinGecko API
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label>= USD Value</Label>
                    <div className="h-9 px-3 py-2 rounded-md border bg-green-50 dark:bg-green-900/20 flex items-center justify-between">
                      <span className="text-sm font-mono font-semibold text-green-800 dark:text-green-200">
                        ${formData.amount_usd || '0.00'}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Counted toward investment
                    </p>
                  </div>
                </div>
                
                <div className="text-xs text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-950/30 p-2 rounded">
                  <p className="font-medium mb-1">Calculation:</p>
                  <p className="font-mono">
                    {formData.amount || '0'} {formData.currency} × ${formData.conversion_rate || '1'} = ${formData.amount_usd || '0.00'} USD
                  </p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="payment_method">Payment Method *</Label>
                <Input
                  id="payment_method"
                  value={formData.payment_method}
                  onChange={(e) => setFormData({ ...formData, payment_method: e.target.value })}
                  placeholder="e.g., VISA, Bank Transfer, Bitcoin"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status *</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData({ ...formData, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={2}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="hash_code">Hash Code / TX ID</Label>
                <Input
                  id="hash_code"
                  value={formData.hash_code}
                  onChange={(e) => setFormData({ ...formData, hash_code: e.target.value })}
                  placeholder="Transaction hash"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="blockchain_link">Blockchain Link</Label>
                <Input
                  id="blockchain_link"
                  value={formData.blockchain_link}
                  onChange={(e) => setFormData({ ...formData, blockchain_link: e.target.value })}
                  placeholder="https://..."
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="receipt">Receipt / Proof *</Label>
              <div className="space-y-2">
                <Input
                  id="receipt"
                  type="file"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  accept="image/*,application/pdf"
                  required
                />
                {file && (
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Upload className="h-3 w-3" />
                    {file.name} ({(file.size / 1024).toFixed(1)} KB)
                  </span>
                )}
                <p className="text-xs text-red-600 dark:text-red-400">
                  ⚠️ Receipt is required for all transactions (evidence mandatory)
                </p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'Create Transaction'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
