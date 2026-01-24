'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

interface MetricProps {
  value: string;
  label: string;
  delay?: number;
  isInView: boolean;
}

function AnimatedMetric({ value, label, delay = 0, isInView }: MetricProps) {
  const [count, setCount] = useState(0);
  const controls = useAnimation();
  
  // Extract number from value string
  const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));
  const suffix = value.replace(/[0-9.]/g, '');

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        let start = 0;
        const end = numericValue;
        const duration = 2000;
        const increment = end / (duration / 16);
        
        const counter = setInterval(() => {
          start += increment;
          if (start >= end) {
            setCount(end);
            clearInterval(counter);
          } else {
            setCount(start);
          }
        }, 16);

        return () => clearInterval(counter);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [numericValue, delay, isInView]);

  useEffect(() => {
    if (isInView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay: delay / 1000 }
      });
    }
  }, [controls, delay, isInView]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      className="text-center"
    >
      <div className="text-3xl md:text-4xl text-foreground heading-text mb-2">
        {Math.round(count)}{suffix}
      </div>
      <div className="text-sm text-muted-foreground professional-text">
        {label}
      </div>
    </motion.div>
  );
}

export function PerformanceMetrics() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="grid grid-cols-3 gap-6 md:gap-8">
      <AnimatedMetric value="895" label="Monthly Trades" delay={200} isInView={isInView} />
      <AnimatedMetric value="617K" label="Monthly Volume" delay={400} isInView={isInView} />
      <AnimatedMetric value="20K" label="Daily Average" delay={600} isInView={isInView} />
    </div>
  );
}
