'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import AnimatedSection from '@/components/AnimatedSection';

export default function HowToUse() {
  const steps = [
    {
      step: '1',
      title: 'Find @TheCryptoCoopBot',
      description: 'Search for @TheCryptoCoopBot in Telegram Search.',
    },
    {
      step: '2',
      title: 'Open Settings',
      description: 'Go to your Telegram Settings and tap on "Wallet".',
    },
    {
      step: '3',
      title: 'Direct Link',
      description: 'Click t.me/thecryptocoopbot to launch it directly.',
    },
  ];

  return (
    <section className="py-20 md:py-32 overflow-hidden bg-gradient-to-b from-white via-blue-50/30 to-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Content */}
          <AnimatedSection>
            <div className="relative">
              <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-6 leading-tight doodle-text"
                style={{ transform: 'rotate(-1deg)' }}
              >
                Say hello to your<br />
                <span className="relative inline-block">
                  <span className="relative z-10">private crypto</span>
                  <motion.div
                    className="absolute -inset-2 bg-cyan-200 -z-10"
                    style={{ borderRadius: '50% 40% 60% 50% / 40% 50% 50% 60%' }}
                    animate={{ rotate: [0, 2, -2, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  />
                </span>
                <br />exchange in Telegram
              </motion.h2>

              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-lg md:text-xl text-muted-foreground mb-10 doodle-text"
              >
                Find <span className="font-bold text-primary">@TheCryptoCoopBot</span> in Telegram Search.
              </motion.p>

              {/* Steps */}
              <div className="space-y-6">
                {steps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="flex gap-4 items-start"
                  >
                    <div 
                      className="flex-shrink-0 w-12 h-12 bg-primary text-white font-black text-xl flex items-center justify-center doodle-text sketchy-shadow"
                      style={{
                        borderRadius: '40% 60% 50% 50% / 60% 40% 60% 40%',
                        border: '3px solid black',
                        transform: `rotate(${index % 2 === 0 ? -5 : 5}deg)`
                      }}
                    >
                      {step.step}
                    </div>
                    <div className="flex-1 pt-1">
                      <h4 className="text-xl font-bold text-foreground mb-1 doodle-text">
                        {step.title}
                      </h4>
                      <p className="text-muted-foreground doodle-text text-sm md:text-base">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Right - Phone Image */}
          <AnimatedSection>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative flex items-center justify-center"
            >
              <motion.div
                animate={{ 
                  y: [0, -15, 0],
                  rotate: [-1, 1, -1]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative"
              >
                <Image
                  src="/assets/phone.png"
                  alt="Telegram Exchange"
                  width={600}
                  height={600}
                  unoptimized
                  className="w-full max-w-[400px] lg:max-w-[500px] h-auto transparent-png"
                  style={{
                    filter: 'drop-shadow(6px 6px 0px rgba(0, 0, 0, 0.15))',
                  }}
                />
              </motion.div>

              {/* Doodle decorations */}
              <motion.div
                className="absolute -top-8 -right-8 w-24 h-24 border-4 border-yellow-400 opacity-60"
                style={{ 
                  borderRadius: '40% 60% 50% 50% / 60% 40% 60% 40%',
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute -bottom-8 -left-8 w-32 h-32 border-4 border-cyan-400 opacity-60"
                style={{ 
                  borderRadius: '50% 40% 60% 50% / 40% 50% 50% 60%',
                }}
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}



