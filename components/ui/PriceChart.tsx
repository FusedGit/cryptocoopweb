'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';

interface PriceChartProps {
  positive?: boolean;
  className?: string;
}

export default function PriceChart({ positive = true, className = '' }: PriceChartProps) {
  // Generate a simple price chart path
  const pathData = useMemo(() => {
    const points = 20;
    const width = 60;
    const height = 24;
    const baseY = height / 2;
    const amplitude = height * 0.4;
    
    let path = `M 0,${baseY}`;
    
    for (let i = 1; i <= points; i++) {
      const x = (width / points) * i;
      const randomVariation = (Math.random() - 0.5) * amplitude;
      const trend = positive ? -(i / points) * amplitude : (i / points) * amplitude;
      const y = baseY + randomVariation + trend;
      path += ` L ${x},${y}`;
    }
    
    return path;
  }, [positive]);

  return (
    <svg 
      width="60" 
      height="24" 
      viewBox="0 0 60 24" 
      className={className}
      preserveAspectRatio="none"
    >
      <motion.path
        d={pathData}
        fill="none"
        stroke={positive ? '#10b981' : '#ef4444'}
        strokeWidth="2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
      />
    </svg>
  );
}
