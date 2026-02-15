'use client';

import { motion } from 'framer-motion';
// Direct import to avoid barrel file (React Best Practice 2.1 - CRITICAL)
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right';
import Image from 'next/image';
import AnimatedSection from '@/components/AnimatedSection';

export default function HowToUse() {
  const steps = [
    {
      step: '01',
      title: 'Open Telegram',
      description: 'Search for @TheCryptoCoopBot or scan the QR code. No app downloads, no registration forms, no delays.',
    },
    {
      step: '02',
      title: 'Choose your trade',
      description: 'Buy, sell, or swap. Select your crypto and payment method. Simple commands, instant execution.',
    },
    {
      step: '03',
      title: 'Trade privately',
      description: 'Complete your transaction in seconds. No verification, no surveillance, no compromise. Your privacy guaranteed.',
    },
  ];

  return (
    <section className="py-32 overflow-hidden bg-gradient-to-b from-white to-background">
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left - Content */}
          <AnimatedSection>
            <div className="relative">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl lg:text-5xl text-foreground mb-6 leading-tight heading-text"
              >
                Start trading in 60 seconds
              </motion.h2>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-lg text-muted-foreground mb-12 professional-text max-w-lg"
              >
                While traditional exchanges make you wait days for verification, 
                we get you trading immediately. Zero friction, maximum privacy.
              </motion.p>

              {/* Steps */}
              <div className="space-y-8 mb-10">
                {steps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="flex gap-5 items-start"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-accent rounded-lg flex items-center justify-center text-foreground professional-text font-medium text-sm">
                      {step.step}
                    </div>
                    <div className="flex-1 pt-2">
                      <h4 className="text-lg text-foreground mb-2 heading-text">
                        {step.title}
                      </h4>
                      <p className="text-muted-foreground professional-text text-[15px] leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <motion.a
                  href="https://t.me/TheCryptoCoopBot"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-foreground text-background px-7 py-3.5 rounded-md text-base professional-text font-medium inline-flex items-center gap-2 transition-opacity hover:opacity-90 elevated-shadow"
                >
                  Start Trading Now
                  <ArrowRight className="w-4 h-4" />
                </motion.a>
              </motion.div>
            </div>
          </AnimatedSection>

          {/* Right - QR Code */}
          <AnimatedSection>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative flex flex-col items-center justify-center lg:items-end"
            >
              <div className="bg-white p-8 rounded-2xl border border-border refined-shadow">
                <Image
                  src="/qrapp.png"
                  alt="Scan to open Cryptocoop"
                  width={280}
                  height={280}
                  className="rounded-xl mb-4"
                />
                <div className="flex items-center justify-center gap-3">
                  <div className="w-10 h-10 bg-foreground rounded flex items-center justify-center">
                    <Image 
                      src="/Logo.svg" 
                      alt="Cryptocoop" 
                      width={24} 
                      height={24} 
                      className="invert"
                    />
                  </div>
                  <div>
                    <p className="text-sm text-foreground professional-text font-medium">Cryptocoop</p>
                    <p className="text-xs text-muted-foreground professional-text">Scan to start</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}



