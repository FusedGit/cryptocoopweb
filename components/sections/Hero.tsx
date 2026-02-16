'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import OptimizedVideo from '@/components/ui/OptimizedVideo';
import { AnimatedShinyText } from '@/components/ui/animated-shiny-text';
import { EncryptedText } from '@/components/ui/encrypted-text';
import { PointerHighlight } from '@/components/ui/pointer-highlight';
import { cn } from '@/lib/utils';

// Hoist static badge element (React Best Practice 6.3)
const availableBadge = (
  <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse mr-2" />
);

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full pt-24 md:pt-32 pb-24 overflow-hidden">
      {/* Full-screen Video Background */}
      <div className="absolute inset-x-0 top-[40vh] h-[70vh] md:top-0 md:h-full md:inset-0">
        <OptimizedVideo
          src="/assets/02.mp4"
          className="w-full h-full object-cover"
          priority={true}
          preload="auto"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background md:hidden" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.05 }}
            className="mb-5"
          >
            <div
              className={cn(
                "group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
              )}
            >
              <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1.5 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
                {availableBadge}
                <span className="text-sm professional-text">Available globally</span>
              </AnimatedShinyText>
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-5xl md:text-6xl lg:text-7xl text-foreground max-w-4xl mb-8 heading-text"
          >
            <PointerHighlight
              containerClassName="inline-block"
              rectangleClassName="bg-neutral-200 dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600"
              pointerClassName="text-blue-500"
            >
              <span className="relative z-10">Trade</span>
            </PointerHighlight>{' '}
            crypto{' '}
            <PointerHighlight
              containerClassName="inline-block"
              rectangleClassName="bg-neutral-200 dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600"
              pointerClassName="text-green-500"
            >
              <span className="relative z-10">with</span>
            </PointerHighlight>
            out{' '}
            <br className="hidden md:block" />
            compromising your{' '}
            <PointerHighlight
              containerClassName="inline-block"
              rectangleClassName="bg-neutral-200 dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600"
              pointerClassName="text-purple-500"
            >
              <span className="relative z-10">
                <EncryptedText
                  text="privacy"
                  encryptedClassName="text-neutral-500"
                  revealedClassName="dark:text-white text-black"
                  revealDelayMs={100}
                />
              </span>
            </PointerHighlight>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-12 leading-relaxed professional-text"
          >
            Other exchanges track every move you make. We do the opposite. Swiss-grade privacy
            meets instant execution so you can buy, sell, and swap with complete anonymity.
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
              P2P Trading
              <ArrowRight className="w-4 h-4" />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}



