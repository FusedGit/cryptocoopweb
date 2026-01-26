'use client'

import { useEffect, useState } from 'react'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

interface MonthlyEarningsChartProps {
  monthlyPayout: number
  months: number
}

export function MonthlyEarningsChart({ monthlyPayout, months }: MonthlyEarningsChartProps) {
  const [data, setData] = useState<any[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const chartData = []
    
    for (let i = 1; i <= Math.min(months, 12); i++) {
      chartData.push({
        month: `M${i}`,
        earnings: monthlyPayout,
        cumulative: monthlyPayout * i,
      })
    }
    
    // Animate the data appearing
    let index = 0
    const interval = setInterval(() => {
      if (index < chartData.length) {
        setData(chartData.slice(0, index + 1))
        index++
      } else {
        clearInterval(interval)
      }
    }, 100)

    return () => clearInterval(interval)
  }, [monthlyPayout, months])

  if (!mounted) return null

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-800" />
          <XAxis
            dataKey="month"
            className="text-xs text-gray-600 dark:text-gray-400"
          />
          <YAxis
            className="text-xs text-gray-600 dark:text-gray-400"
            tickFormatter={(value) => `$${(value / 1000).toFixed(1)}k`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              padding: '8px 12px',
            }}
            formatter={(value: number) => [`$${value.toFixed(2)}`, 'Monthly Earnings']}
          />
          <Bar
            dataKey="earnings"
            fill="#10b981"
            radius={[8, 8, 0, 0]}
            animationDuration={300}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
