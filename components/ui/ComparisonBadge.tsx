'use client';

import { motion } from 'framer-motion';
import { TrendingDown, Sparkles } from 'lucide-react';

interface ComparisonBadgeProps {
  text?: string;
  subtext?: string;
}

export default function ComparisonBadge({ 
  text = 'Lower fees than competitors',
  subtext = 'Save up to 40%'
}: ComparisonBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-2xl px-4 py-3"
    >
      <motion.div
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        className="bg-purple-100 p-2 rounded-xl"
      >
        <TrendingDown className="w-4 h-4 text-purple-600" />
      </motion.div>
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-bold text-purple-900 professional-text">{text}</span>
          <Sparkles className="w-3.5 h-3.5 text-purple-600" />
        </div>
        <span className="text-xs text-purple-700 professional-text">{subtext}</span>
      </div>
    </motion.div>
  );
}
