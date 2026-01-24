'use client';

import { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const projectionData = [
  { tier: 'Tier 1\n$200K', investment: 200, roi: 120, turnover: 24000 },
  { tier: 'Tier 2\n$500K', investment: 500, roi: 250, turnover: 45000 },
  { tier: 'Tier 3\n$1M', investment: 1000, roi: 450, turnover: 72000 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-card border border-border rounded-lg p-4 shadow-lg">
        <p className="text-sm text-foreground professional-text font-medium mb-2">{label.replace('\n', ' ')}</p>
        <p className="text-sm text-muted-foreground professional-text">
          Investment: <span className="font-medium text-foreground">${data.investment}K</span>
        </p>
        <p className="text-sm text-muted-foreground professional-text">
          1-Year Return: <span className="font-medium" style={{ color: 'oklch(0.45 0.12 260)' }}>${data.roi}K</span>
        </p>
        <p className="text-sm text-muted-foreground professional-text">
          2026 Turnover: <span className="font-medium" style={{ color: 'oklch(0.92 0.01 160)' }}>${data.turnover >= 1000 ? `${(data.turnover / 1000).toFixed(0)}M` : `${data.turnover}K`}</span>
        </p>
      </div>
    );
  }
  return null;
};

export function ProjectionChart() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [animatedData, setAnimatedData] = useState(projectionData.map(d => ({ ...d, roi: 0, turnover: 0 })));

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setAnimatedData(projectionData);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  return (
    <div ref={ref} className="w-full h-[350px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={animatedData} margin={{ top: 20, right: 10, left: 10, bottom: 40 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.88 0.005 85)" strokeOpacity={0.5} />
          <XAxis 
            dataKey="tier" 
            tick={{ fill: 'oklch(0.55 0.01 260)', fontSize: 12, fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI"' }}
            tickLine={false}
            axisLine={{ stroke: 'oklch(0.88 0.005 85)' }}
            interval={0}
          />
          <YAxis 
            tick={{ fill: 'oklch(0.55 0.01 260)', fontSize: 12, fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI"' }}
            tickLine={false}
            axisLine={{ stroke: 'oklch(0.88 0.005 85)' }}
            tickFormatter={(value) => `$${value}K`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey="roi" 
            fill="oklch(0.45 0.12 260)" 
            radius={[8, 8, 0, 0]}
            animationDuration={1500}
            animationEasing="ease-out"
          >
            {animatedData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={index === 1 ? 'oklch(0.45 0.12 260)' : 'oklch(0.55 0.1 260)'}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
