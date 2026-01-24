'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full pt-32 pb-24 overflow-hidden bg-gradient-to-b from-background via-background to-white">
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-accent/50 text-foreground/80 rounded-full mb-10 border border-border/50"
          >
            <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
            <span className="text-sm professional-text">
              Available globally
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-5xl md:text-6xl lg:text-7xl text-foreground max-w-4xl mb-8 heading-text"
          >
            Secure crypto exchange{' '}
            <br className="hidden md:block" />
            built for{' '}
            <span className="text-gradient">privacy</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-12 leading-relaxed professional-text"
          >
            Trade digital assets with confidence. Built on Telegram, designed for simplicity, 
            engineered for security.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 mb-20"
          >
            <motion.a
              href="https://t.me/TheCryptoCoopBot"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-foreground text-background px-7 py-3.5 rounded-md text-base professional-text font-medium inline-flex items-center justify-center gap-2 transition-opacity hover:opacity-90 elevated-shadow"
            >
              Open Exchange
              <ArrowRight className="w-4 h-4" />
            </motion.a>
            <motion.a
              href="https://localcoinswap.com/profile/cryptocoop"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white border border-border text-foreground px-7 py-3.5 rounded-md text-base professional-text font-medium inline-flex items-center justify-center gap-2 transition-colors hover:bg-accent/30"
            >
              LocalCoinSwap
              <ArrowRight className="w-4 h-4" />
            </motion.a>
          </motion.div>

          {/* Device Mockups */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="relative w-full max-w-5xl mt-8"
          >
            <div className="relative flex items-end justify-center gap-4 md:gap-8">
              {/* Phone 1 (Left) */}
              <motion.div 
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-1/3 max-w-[240px] aspect-[9/19.5] hidden sm:block"
                style={{ filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.1))' }}
              >
                <Image
                  src="/assets/Left.png"
                  alt="Cryptocoop interface"
                  fill
                  className="object-contain transparent-png"
                  priority
                  unoptimized
                />
              </motion.div>

              {/* Phone 2 (Main) */}
              <motion.div 
                animate={{ y: [0, -16, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-2/5 max-w-[280px] aspect-[9/19.5] z-10"
                style={{ filter: 'drop-shadow(0 24px 48px rgba(0, 0, 0, 0.12))' }}
              >
                <Image
                  src="/assets/Main.png"
                  alt="Cryptocoop main interface"
                  fill
                  className="object-contain transparent-png"
                  priority
                  unoptimized
                />
              </motion.div>

              {/* Phone 3 (Right) */}
              <motion.div 
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-1/3 max-w-[240px] aspect-[9/19.5] hidden sm:block"
                style={{ filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.1))' }}
              >
                <Image
                  src="/assets/Right.png"
                  alt="Cryptocoop features"
                  fill
                  className="object-contain transparent-png"
                  priority
                  unoptimized
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Subtle background decoration */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-30" />
    </section>
  );
}



