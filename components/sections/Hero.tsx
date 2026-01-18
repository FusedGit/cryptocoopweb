'use client';

import { motion } from 'framer-motion';
import { Send, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full pt-32 pb-20 overflow-hidden bg-gradient-to-b from-yellow-50 via-white to-cyan-50">
      {/* Doodle Background decorations */}
      <div className="absolute top-20 left-10 w-32 h-32 border-4 border-yellow-300 rounded-full opacity-30" 
           style={{ borderRadius: '40% 60% 50% 50% / 60% 40% 60% 40%' }} />
      <div className="absolute bottom-20 right-10 w-40 h-40 border-4 border-cyan-300 rounded-full opacity-30" 
           style={{ borderRadius: '50% 40% 60% 50% / 40% 50% 50% 60%' }} />
      <motion.div 
        className="absolute top-40 right-20 text-4xl"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        ⭐
      </motion.div>
      <motion.div 
        className="absolute bottom-40 left-20 text-3xl"
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        💰
      </motion.div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          {/* Badge - Unique shape 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-100 text-green-900 font-bold mb-8 doodle-text sketchy-shadow"
            style={{ borderRadius: '50% 50% 40% 60% / 50% 50% 60% 40%', border: '3px solid #4ade80', transform: 'rotate(-1deg)' }}
          >
            We accept global transfers 🌍
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-foreground max-w-5xl mb-6 doodle-text"
            style={{ transform: 'rotate(-1deg)' }}
          >
            Your crypto exchange <br className="hidden md:block" />
            is already in{' '}
            <span className="relative inline-block">
              <span className="relative z-10 inline-flex items-baseline gap-2 text-primary">
                <Send className="w-8 h-8 md:w-12 md:h-12 -rotate-12 translate-y-1 md:translate-y-2" />
                Telegram
              </span>
              <motion.div
                className="absolute -inset-3 bg-cyan-200 -z-10"
                style={{ borderRadius: '50% 40% 60% 50% / 40% 50% 50% 60%' }}
                animate={{ rotate: [0, 3, -3, 0] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-12 leading-relaxed doodle-text font-semibold"
          >
            Buy, trade, and cash out with <span className="text-orange-600 font-black">zero KYC</span>, no limits, and absolute privacy. The exchange built for freedom.
          </motion.p>

          {/* CTA Button - Unique shape 3 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-4"
          >
            <motion.a
              href="https://t.me/TheCryptoCoopBot"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="relative bg-primary text-white px-10 py-5 font-black text-xl doodle-text sketchy-shadow cursor-pointer inline-block"
              style={{
                borderRadius: '55% 45% 70% 30% / 40% 60% 40% 60%',
                border: '4px solid black',
              }}
            >
              Open Exchange Now! →
            </motion.a>
          </motion.div>

          {/* LocalCoinSwap Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-16"
          >
            <motion.a
              href="https://localcoinswap.com/profile/cryptocoop"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, rotate: -1 }}
              className="relative bg-green-500 text-white px-6 py-3 font-bold text-sm doodle-text sketchy-shadow cursor-pointer inline-block"
              style={{
                borderRadius: '50% 50% 45% 55% / 55% 45% 55% 45%',
                border: '3px solid black',
              }}
            >
              Also available on LocalCoinSwap →
            </motion.a>
          </motion.div>

          {/* Device Mockups */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative w-full max-w-5xl aspect-[16/9] mt-8"
          >
            <div className="absolute inset-0 flex items-center justify-center gap-4 md:gap-12">
              {/* Phone 1 (Left) */}
              <motion.div 
                whileHover={{ y: -10, rotate: -8 }}
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-1/3 max-w-[280px] aspect-[9/19.5] z-10 hidden sm:block rotate-[-5deg] translate-y-8"
              >
                <Image
                  src="/assets/Left.png"
                  alt="Cryptocoop Left Mockup"
                  fill
                  className="object-contain transparent-png"
                  priority
                  unoptimized
                  style={{ 
                    filter: 'drop-shadow(6px 6px 0px rgba(0, 0, 0, 0.15))',
                  }}
                />
              </motion.div>

              {/* Phone 2 (Main) */}
              <motion.div 
                whileHover={{ scale: 1.05, y: -5 }}
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-1/2 max-w-[320px] aspect-[9/19.5] z-20"
              >
                <Image
                  src="/assets/Main.png"
                  alt="Cryptocoop Main Mockup"
                  fill
                  className="object-contain transparent-png"
                  priority
                  unoptimized
                  style={{ 
                    filter: 'drop-shadow(8px 8px 0px rgba(0, 0, 0, 0.2))',
                  }}
                />
              </motion.div>

              {/* Phone 3 (Right) */}
              <motion.div 
                whileHover={{ y: -10, rotate: 8 }}
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-1/3 max-w-[280px] aspect-[9/19.5] z-10 hidden sm:block rotate-[5deg] translate-y-8"
              >
                <Image
                  src="/assets/Right.png"
                  alt="Cryptocoop Right Mockup"
                  fill
                  className="object-contain transparent-png"
                  priority
                  unoptimized
                  style={{ 
                    filter: 'drop-shadow(6px 6px 0px rgba(0, 0, 0, 0.15))',
                  }}
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}



