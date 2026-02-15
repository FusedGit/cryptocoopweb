'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface ROIBarProps {
  lockDuration: string;
  roi: number;
  detail: string;
  delay: number;
  isInView: boolean;
}

function ROIBar({ lockDuration, roi, detail, delay, isInView }: ROIBarProps) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setWidth(roi);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [roi, delay, isInView]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: delay / 1000 }}
      className="relative bg-accent/20 border border-border p-6 rounded-lg"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm text-muted-foreground professional-text mb-1">Lock Duration</p>
          <p className="text-2xl text-foreground heading-text">{lockDuration}</p>
        </div>
        <div className="text-right">
          <p className="text-3xl text-foreground heading-text">{roi}%</p>
          <p className="text-xs text-muted-foreground professional-text">Target APY</p>
        </div>
      </div>

      <div className="relative h-2 bg-accent/30 rounded-full overflow-hidden mb-3">
        <motion.div
          className="bg-foreground/60 h-full"
          initial={{ width: 0 }}
          animate={{ width: `${width}%` }}
          transition={{ duration: 1.5, delay: delay / 1000 + 0.3, ease: 'easeOut' }}
        />
      </div>

      <p className="text-sm text-muted-foreground professional-text">
        {detail}
      </p>
    </motion.div>
  );
}

export function ROIComparison() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="space-y-4">
      <ROIBar
        lockDuration="12 Months"
        roi={60}
        detail="Long-term lock period for highest target yield."
        delay={200}
        isInView={isInView}
      />
      <ROIBar
        lockDuration="6 Months"
        roi={30}
        detail="Mid-term lock period with balanced liquidity and yield."
        delay={400}
        isInView={isInView}
      />
      <ROIBar
        lockDuration="3 Months"
        roi={10}
        detail="Short-term lock period with faster capital availability."
        delay={600}
        isInView={isInView}
      />
    </div>
  );
}
