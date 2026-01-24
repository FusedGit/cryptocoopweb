'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface ROIBarProps {
  tier: string;
  amount: string;
  roi: number;
  returns: string;
  isRecommended?: boolean;
  delay: number;
  isInView: boolean;
}

function ROIBar({ tier, amount, roi, returns, isRecommended, delay, isInView }: ROIBarProps) {
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
      className={`relative ${isRecommended ? 'bg-primary/5 border-2 border-primary/30' : 'bg-accent/20 border border-border'} p-6 rounded-lg`}
    >
      {isRecommended && (
        <div className="absolute -top-2 left-4 bg-primary px-2 py-0.5 rounded-full">
          <span className="text-xs text-white professional-text font-medium">Recommended</span>
        </div>
      )}
      
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm text-muted-foreground professional-text mb-1">{tier}</p>
          <p className="text-2xl text-foreground heading-text">{amount}</p>
        </div>
        <div className="text-right">
          <p className="text-3xl text-foreground heading-text">{roi}%</p>
          <p className="text-xs text-muted-foreground professional-text">ROI</p>
        </div>
      </div>

      <div className="relative h-2 bg-accent/30 rounded-full overflow-hidden mb-3">
        <motion.div
          className={isRecommended ? 'bg-primary h-full' : 'bg-foreground/60 h-full'}
          initial={{ width: 0 }}
          animate={{ width: `${width}%` }}
          transition={{ duration: 1.5, delay: delay / 1000 + 0.3, ease: 'easeOut' }}
        />
      </div>

      <p className="text-sm text-muted-foreground professional-text">
        1-Year Returns: <span className="font-medium text-foreground">{returns}</span>
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
        tier="Tier 1"
        amount="$200K"
        roi={60}
        returns="$120K"
        delay={200}
        isInView={isInView}
      />
      <ROIBar
        tier="Tier 2"
        amount="$500K"
        roi={50}
        returns="$250K"
        isRecommended
        delay={400}
        isInView={isInView}
      />
      <ROIBar
        tier="Tier 3"
        amount="$1M"
        roi={45}
        returns="$450K"
        delay={600}
        isInView={isInView}
      />
    </div>
  );
}
