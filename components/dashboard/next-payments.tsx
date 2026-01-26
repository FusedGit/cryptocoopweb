'use client'

import { Calendar, Clock } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface ScheduledPayment {
  id: string
  amount: number
  payment_date: string
  status: 'scheduled' | 'paid' | 'missed'
  description?: string
}

interface NextPaymentsProps {
  payments: ScheduledPayment[]
}

export function NextPayments({ payments }: NextPaymentsProps) {
  const upcomingPayments = payments
    .filter((p) => p.status === 'scheduled')
    .sort((a, b) => new Date(a.payment_date).getTime() - new Date(b.payment_date).getTime())
    .slice(0, 5)

  const getDaysUntil = (date: string) => {
    const days = Math.floor(
      (new Date(date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    )
    if (days < 0) return 'Overdue'
    if (days === 0) return 'Today'
    if (days === 1) return 'Tomorrow'
    return `${days} days`
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Next Payments
        </CardTitle>
        <CardDescription>Upcoming scheduled payouts</CardDescription>
      </CardHeader>
      <CardContent>
        {upcomingPayments.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No upcoming payments scheduled</p>
          </div>
        ) : (
          <div className="space-y-4">
            {upcomingPayments.map((payment, index) => {
              const daysUntil = getDaysUntil(payment.payment_date)
              const isOverdue = daysUntil === 'Overdue'
              const isSoon = !isOverdue && (daysUntil === 'Today' || daysUntil === 'Tomorrow')

              return (
                <div
                  key={payment.id}
                  className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">
                        ${Number(payment.amount).toLocaleString('en-US', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>
                      {isSoon && (
                        <Badge variant="secondary" className="text-xs">
                          {daysUntil}
                        </Badge>
                      )}
                      {isOverdue && (
                        <Badge variant="destructive" className="text-xs">
                          Overdue
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {payment.description || `Payment #${index + 1}`}
                    </p>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="text-sm font-medium">
                      {new Date(payment.payment_date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                    <p className="text-xs text-muted-foreground">{daysUntil}</p>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
