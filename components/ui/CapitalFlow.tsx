'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export function CapitalFlow() {
  const ref = useRef(null);
  const isVisible = useInView(ref, { once: true, margin: "-100px" });

  const steps = [
    { label: 'Capital Investment', color: 'bg-primary/20 text-primary border-primary/30' },
    { label: 'Trade Execution', color: 'bg-accent/40 text-foreground border-accent' },
    { label: 'Revenue Generation', color: 'bg-foreground/10 text-foreground border-foreground/20' },
  ];

  return (
    <div ref={ref} className="flex flex-col md:flex-row items-center justify-between gap-4">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center gap-4 flex-1 w-full md:w-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className={`${step.color} border rounded-lg p-6 text-center flex-1`}
          >
            <div className="professional-text font-medium text-sm">{step.label}</div>
            {index === 0 && (
              <div className="text-xs text-muted-foreground mt-2">Within days</div>
            )}
            {index === 1 && (
              <div className="text-xs text-muted-foreground mt-2">High velocity</div>
            )}
            {index === 2 && (
              <div className="text-xs text-muted-foreground mt-2">30-day cycle</div>
            )}
          </motion.div>
          
          {index < steps.length - 1 && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
              className="hidden md:block"
            >
              <ArrowRight className="w-5 h-5 text-muted-foreground" strokeWidth={1.5} />
            </motion.div>
          )}
        </div>
      ))}
    </div>
  );
}
