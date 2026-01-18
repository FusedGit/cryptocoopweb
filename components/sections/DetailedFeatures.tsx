'use client';

import { motion } from 'framer-motion';
import { Send, RefreshCw, Globe, Coins, ShieldCheck, Heart, Headphones, TrendingUp, Shield, Zap } from 'lucide-react';
import Image from 'next/image';
import AnimatedSection from '@/components/AnimatedSection';

const doodleFeatures = [
  {
    title: 'Privacy First',
    subtitle: 'Trade anonymously.',
    description: 'No KYC, no ID verification, no personal data collection. Your privacy is our absolute priority.',
    image: '/assets/camera.png',
    color: 'bg-orange-100',
    borderColor: 'border-orange-400',
    textColor: 'text-orange-900'
  },
  {
    title: 'Zero Limits',
    subtitle: 'No caps. No restrictions.',
    description: 'Trade any amount, anytime.',
    image: '/assets/nolimits.png',
    color: 'bg-green-100',
    borderColor: 'border-green-400',
    textColor: 'text-green-900'
  },
  {
    title: 'Global Payments',
    subtitle: 'Buy and sell using bank transfers,',
    description: 'cash, and digital payments worldwide.',
    image: '/assets/globalpayments.png',
    color: 'bg-blue-100',
    borderColor: 'border-blue-400',
    textColor: 'text-blue-900'
  },
  {
    title: '24/7 Human Support',
    subtitle: 'Real people, real help.',
    description: 'Available around the clock for your private trades.',
    image: '/assets/human.png',
    color: 'bg-purple-100',
    borderColor: 'border-purple-400',
    textColor: 'text-purple-900'
  },
];


export default function DetailedFeatures() {
  return (
    <section className="py-20 md:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-4 max-w-[1400px]">
        {/* Doodle Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10 max-w-6xl mx-auto">
          {doodleFeatures.map((feature, idx) => (
            <AnimatedSection key={idx}>
              <motion.div
                whileHover={{ y: -5, rotate: idx % 2 === 0 ? 1 : -1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`relative h-full ${feature.color} ${feature.borderColor} border-4 rounded-3xl p-10 md:p-12 flex flex-col min-h-[450px] md:min-h-[500px] sketchy-shadow`}
                style={{ 
                  transform: `rotate(${idx % 2 === 0 ? -0.5 : 0.5}deg)`,
                }}
              >
                {/* Content */}
                <div className="relative z-10 flex-1 flex flex-col">
                  <h3 className={`text-3xl md:text-4xl lg:text-5xl font-black ${feature.textColor} mb-3 md:mb-4 doodle-text leading-tight`}>
                    {feature.title}
                  </h3>
                  <p className={`text-base md:text-lg ${feature.textColor} opacity-80 mb-2 doodle-text font-semibold`}>
                    {feature.subtitle}
                  </p>
                  <p className={`text-sm md:text-base ${feature.textColor} opacity-70 doodle-text`}>
                    {feature.description}
                  </p>
                  
                  {/* Image positioned at bottom */}
                  <div className="mt-auto pt-6 md:pt-8 flex justify-center items-end">
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      className="relative"
                    >
                      <Image
                        src={feature.image}
                        alt={feature.title}
                        width={300}
                        height={300}
                        unoptimized
                        className="w-full max-w-[200px] md:max-w-[280px] lg:max-w-[320px] h-auto transparent-png"
                        style={{ 
                          filter: 'drop-shadow(4px 4px 0px rgba(0, 0, 0, 0.1))',
                        }}
                      />
                    </motion.div>
                  </div>
                </div>

                {/* Doodle star decorations */}
                <motion.div 
                  className="absolute top-6 right-6 text-2xl"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  ⭐
                </motion.div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        {/* Bottom CTA Doodle - Unique shape 1 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 md:mt-20 text-center"
        >
          <div className="inline-block relative">
            <motion.a
              href="https://t.me/TheCryptoCoopBot"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="relative bg-primary text-white px-8 py-4 md:px-10 md:py-5 font-black text-lg md:text-xl doodle-text sketchy-shadow cursor-pointer inline-block"
              style={{
                borderRadius: '45% 55% 60% 40% / 35% 45% 55% 65%',
                border: '3px solid black',
              }}
            >
              Open Exchange in Telegram →
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}



