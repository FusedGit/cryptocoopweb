'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { useEffect, useState } from 'react';

interface LiveRateIndicatorProps {
  positive?: boolean;
}

export default function LiveRateIndicator({ positive = true }: LiveRateIndicatorProps) {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(true);
      setTimeout(() => setPulse(false), 500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="inline-flex items-center gap-1.5 bg-accent px-3 py-1.5 rounded-full"
      animate={pulse ? { scale: [1, 1.05, 1] } : {}}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className={`w-2 h-2 rounded-full ${positive ? 'bg-green-500' : 'bg-red-500'}`}
        animate={{
          opacity: [1, 0.5, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      />
      <span className="text-xs font-medium text-foreground professional-text">
        Live rate
      </span>
      {positive ? (
        <TrendingUp className="w-3 h-3 text-green-600" />
      ) : (
        <TrendingDown className="w-3 h-3 text-red-600" />
      )}
    </motion.div>
  );
}
