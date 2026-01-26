'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { TrendingUp, CheckCircle2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function WelcomePage() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSeedData = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/seed-investment', {
        method: 'POST',
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to seed data')
      }

      setSuccess(true)
      setTimeout(() => {
        router.push('/dashboard')
      }, 2000)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-green-50 dark:bg-green-900/20 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-2xl font-bold">Success!</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Sample investments created. Redirecting to dashboard...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="max-w-lg w-full space-y-8">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
            <TrendingUp className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-3xl font-bold">Welcome to Your Dashboard!</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Get started by adding sample investment data to see how your dashboard works.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 space-y-4">
          <h3 className="font-semibold">Sample Data Includes:</h3>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
              $50,000 investment at 12.5% APY for 24 months
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
              $25,000 investment at 15% APY for 18 months
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
              Interactive charts showing growth and earnings
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
              Monthly payout calculations
            </li>
          </ul>

          {error && (
            <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 text-sm border border-red-200 dark:border-red-800">
              {error}
            </div>
          )}

          <Button
            onClick={handleSeedData}
            disabled={loading}
            className="w-full"
            size="lg"
          >
            {loading ? 'Creating Sample Data...' : 'Create Sample Investments'}
          </Button>

          <p className="text-xs text-center text-gray-500">
            This will create sample investment data for testing purposes only
          </p>
        </div>
      </div>
    </div>
  )
}
