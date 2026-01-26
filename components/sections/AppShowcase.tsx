'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Check } from 'lucide-react';
import { useRef } from 'react';
import AnimatedSection from '@/components/AnimatedSection';

export default function AppShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const features = [
    'On-ramp & Off-ramp crypto instantly',
    'Trade directly on Telegram',
    'Zero KYC. Zero AML. Zero limits.',
    'No frozen funds. Ever.'
  ];

  return (
    <section ref={sectionRef} className="relative w-full bg-black py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
          {/* iPhone Mockup with Parallax */}
          <AnimatedSection className="order-2 md:order-1">
            <motion.div
              style={{ y }}
              className="relative mx-auto flex aspect-[9/19.5] w-full max-w-[300px] items-center justify-center rounded-[3rem] border-8 border-zinc-800 bg-zinc-900 p-2 md:max-w-[350px]"
            >
              {/* Screen Content */}
              <div className="relative h-full w-full overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-zinc-900 to-black">
                {/* Placeholder for app screenshot */}
                <div className="flex h-full w-full flex-col items-center justify-center p-8 text-center">
                  <div className="mb-4 text-6xl">💱</div>
                  <div className="mb-2 text-xl font-semibold text-white">Cryptocoop</div>
                  <div className="text-sm text-muted-foreground">Telegram Mini App</div>
                  <div className="mt-8 w-full space-y-3">
                    <div className="h-12 w-full rounded-lg bg-primary/20 backdrop-blur-sm"></div>
                    <div className="h-12 w-full rounded-lg bg-white/10 backdrop-blur-sm"></div>
                    <div className="h-12 w-full rounded-lg bg-white/10 backdrop-blur-sm"></div>
                  </div>
                </div>
                {/* Notch */}
                <div className="absolute left-1/2 top-0 h-6 w-1/3 -translate-x-1/2 rounded-b-2xl bg-black"></div>
              </div>
            </motion.div>
          </AnimatedSection>

          {/* Features */}
          <AnimatedSection className="order-1 md:order-2">
            <div className="space-y-8">
              <div>
                <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">
                  Trade on Telegram
                </h2>
                <p className="text-lg text-muted-foreground">
                  Experience the freedom of truly decentralized trading. No gatekeepers, no restrictions, no compromises.
                </p>
              </div>

              <div className="space-y-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-base text-white md:text-lg">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}






