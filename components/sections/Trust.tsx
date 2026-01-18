'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import AnimatedSection from '@/components/AnimatedSection';

const LaserFlow = dynamic(() => import('@/components/ui/LaserFlow'), { ssr: false });

export default function Trust() {
  return (
    <section className="relative w-full overflow-hidden bg-black py-20 md:py-32">
      {/* Subtle LaserFlow Background */}
      <div className="absolute inset-0 z-0 opacity-20">
        <LaserFlow
          color="#00D9FF"
          horizontalBeamOffset={0.0}
          verticalBeamOffset={0.1}
          fogIntensity={0.3}
          wispDensity={0.5}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <AnimatedSection>
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <div className="mb-2 inline-block rounded-full border border-primary/50 bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
                #1 Trader
              </div>
            </motion.div>

            <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
              Proven Track Record
            </h2>

            <div className="mb-8 space-y-4">
              <p className="text-xl text-white">
                #1 on LocalCoinSwap
              </p>
              <p className="text-lg text-muted-foreground">
                Previously top-rated on AgoraDesk & LocalMonero
              </p>
            </div>

            <p className="mx-auto max-w-2xl text-base text-muted-foreground md:text-lg">
              Built by traders who understand the market since 2020. We've processed over 28,000 trades worth $40M+ because we know what matters: speed, privacy, and reliability.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-4"
            >
              {[
                { label: 'Trust Score', value: '100%' },
                { label: 'Response Time', value: '< 5min' },
                { label: 'Success Rate', value: '99.9%' },
                { label: 'Availability', value: '24/7' }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="mb-1 font-mono text-2xl font-bold text-primary md:text-3xl">
                    {stat.value}
                  </div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}






