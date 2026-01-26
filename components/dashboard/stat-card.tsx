'use client'

import { motion } from 'framer-motion'
import { Calendar, DollarSign, TrendingUp, Wallet } from 'lucide-react'

const iconMap = {
  DollarSign,
  TrendingUp,
  Wallet,
  Calendar,
}

type IconName = keyof typeof iconMap

interface StatCardProps {
  title: string
  value: string
  subtitle?: string
  icon: IconName
  trend?: {
    value: string
    positive: boolean
  }
  delay?: number
}

export function StatCard({ title, value, subtitle, icon, trend, delay = 0 }: StatCardProps) {
  const Icon = iconMap[icon]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-card rounded-xl p-6 border hover:border-foreground/20 transition-all duration-300"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold mt-2">
            {value}
          </p>
          {subtitle && (
            <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
          )}
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              <span
                className={`text-sm font-medium ${
                  trend.positive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                }`}
              >
                {trend.positive ? '↑' : '↓'} {trend.value}
              </span>
              <span className="text-xs text-muted-foreground">vs last month</span>
            </div>
          )}
        </div>
        <div className="p-3 bg-muted rounded-lg">
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </motion.div>
  )
}
