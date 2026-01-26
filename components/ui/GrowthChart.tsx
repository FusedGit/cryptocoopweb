'use client';

import { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { year: '2020', turnover: 300, profit: 5.2, capital: 20 },
  { year: '2021', turnover: 1000, profit: 23, capital: 28 },
  { year: '2022', turnover: 3000, profit: 111, capital: 49 },
  { year: '2023', turnover: 8000, profit: 303, capital: 90 },
  { year: '2024', turnover: 13000, profit: 498, capital: 120 },
  { year: '2025', turnover: 15000, profit: 575, capital: 100 },
  { year: '2026', turnover: 24000, profit: 924, capital: 454, projected: true },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg p-4">
        <p className="text-sm text-foreground professional-text font-medium mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm text-muted-foreground professional-text">
            {entry.name === 'turnover' && 'Turnover: '}
            {entry.name === 'profit' && 'Net Profit: '}
            {entry.name === 'capital' && 'Capital: '}
            <span className="font-medium" style={{ color: entry.color }}>
              ${entry.value >= 1000 ? `${(entry.value / 1000).toFixed(1)}M` : `${entry.value}K`}
            </span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function GrowthChart() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [animatedData, setAnimatedData] = useState(data.map(d => ({ ...d, turnover: 0, profit: 0, capital: 0 })));

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setAnimatedData(data);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  return (
    <div ref={ref} className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={animatedData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorTurnover" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="oklch(0.45 0.12 260)" stopOpacity={0.15}/>
              <stop offset="95%" stopColor="oklch(0.45 0.12 260)" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="oklch(0.92 0.01 160)" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="oklch(0.92 0.01 160)" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.88 0.005 85)" strokeOpacity={0.5} />
          <XAxis 
            dataKey="year" 
            tick={{ fill: 'oklch(0.55 0.01 260)', fontSize: 12, fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI"' }}
            tickLine={false}
            axisLine={{ stroke: 'oklch(0.88 0.005 85)' }}
          />
          <YAxis 
            tick={{ fill: 'oklch(0.55 0.01 260)', fontSize: 12, fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI"' }}
            tickLine={false}
            axisLine={{ stroke: 'oklch(0.88 0.005 85)' }}
            tickFormatter={(value) => `$${value >= 1000 ? `${value/1000}M` : `${value}K`}`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ 
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI"',
              fontSize: '13px',
              paddingTop: '20px'
            }}
          />
          <Area 
            type="monotone" 
            dataKey="turnover" 
            stroke="oklch(0.45 0.12 260)" 
            strokeWidth={2}
            fill="url(#colorTurnover)" 
            animationDuration={2000}
            animationEasing="ease-out"
            name="Turnover"
          />
          <Area 
            type="monotone" 
            dataKey="profit" 
            stroke="oklch(0.92 0.01 160)" 
            strokeWidth={2}
            fill="url(#colorProfit)" 
            animationDuration={2000}
            animationEasing="ease-out"
            name="Net Profit"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
