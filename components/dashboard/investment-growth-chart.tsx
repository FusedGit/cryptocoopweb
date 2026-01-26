'use client'

import { useEffect, useState } from 'react'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

interface InvestmentGrowthChartProps {
  principal: number
  monthlyRate: number
  months: number
}

export function InvestmentGrowthChart({ principal, monthlyRate, months }: InvestmentGrowthChartProps) {
  const [data, setData] = useState<any[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const chartData = []
    let currentValue = principal
    
    for (let i = 0; i <= months; i++) {
      chartData.push({
        month: i,
        value: currentValue,
        principal: principal,
      })
      currentValue += currentValue * (monthlyRate / 100)
    }
    
    // Animate the data appearing
    let index = 0
    const interval = setInterval(() => {
      if (index <= months) {
        setData(chartData.slice(0, index + 1))
        index++
      } else {
        clearInterval(interval)
      }
    }, 50)

    return () => clearInterval(interval)
  }, [principal, monthlyRate, months])

  if (!mounted) return null

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-800" />
          <XAxis
            dataKey="month"
            label={{ value: 'Months', position: 'insideBottom', offset: -5 }}
            className="text-xs text-gray-600 dark:text-gray-400"
          />
          <YAxis
            label={{ value: 'Value ($)', angle: -90, position: 'insideLeft' }}
            className="text-xs text-gray-600 dark:text-gray-400"
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              padding: '8px 12px',
            }}
            formatter={(value: number) => [`$${value.toFixed(2)}`, 'Value']}
            labelFormatter={(label) => `Month ${label}`}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#3b82f6"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorValue)"
            animationDuration={300}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
