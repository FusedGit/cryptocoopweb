'use client';

import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useRef } from 'react';
import AnimatedSection from '@/components/AnimatedSection';

function AnimatedNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 60, stiffness: 100 });
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, motionValue, value]);

  useEffect(() => {
    springValue.on('change', (latest) => {
      if (ref.current) {
        const displayValue = latest.toFixed(0);
        ref.current.textContent = displayValue + suffix;
      }
    });
  }, [springValue, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

export default function Stats() {
  return (
    <section className="relative w-full border-b border-border bg-black py-20 md:py-32">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12">
            {/* Stat 1 */}
            <div className="group border-b border-border pb-6 text-center md:border-b-0 md:border-r md:pb-0 md:pr-12">
              <div className="mb-2 font-mono text-5xl font-bold text-white transition-colors group-hover:text-primary md:text-6xl">
                <AnimatedNumber value={28000} suffix="+" />
              </div>
              <div className="text-sm uppercase tracking-widest text-muted-foreground md:text-base">
                Trades Completed
              </div>
            </div>

            {/* Stat 2 */}
            <div className="group border-b border-border pb-6 text-center md:border-b-0 md:border-r md:pb-0 md:pr-12">
              <div className="mb-2 font-mono text-5xl font-bold text-white transition-colors group-hover:text-primary md:text-6xl">
                $<AnimatedNumber value={40} />M+
              </div>
              <div className="text-sm uppercase tracking-widest text-muted-foreground md:text-base">
                Trade Volume
              </div>
            </div>

            {/* Stat 3 */}
            <div className="group text-center">
              <div className="mb-2 font-mono text-5xl font-bold text-white transition-colors group-hover:text-primary md:text-6xl">
                <AnimatedNumber value={2020} />
              </div>
              <div className="text-sm uppercase tracking-widest text-muted-foreground md:text-base">
                Since
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}






