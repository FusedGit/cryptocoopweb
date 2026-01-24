'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import AnimatedSection from '@/components/AnimatedSection';

export default function HowToUse() {
  const steps = [
    {
      step: '01',
      title: 'Scan QR code',
      description: 'Use your phone camera or Telegram to scan the QR code and launch the bot instantly.',
    },
    {
      step: '02',
      title: 'Or search on Telegram',
      description: 'Find @TheCryptoCoopBot in Telegram search and start a conversation.',
    },
    {
      step: '03',
      title: 'Start trading',
      description: 'Complete your first secure transaction directly in the chat interface.',
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
                Getting started is simple
              </motion.h2>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-lg text-muted-foreground mb-12 professional-text max-w-lg"
              >
                Access a full-featured exchange directly within Telegram. 
                No downloads, no complexity.
              </motion.p>

              {/* Steps */}
              <div className="space-y-8">
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



