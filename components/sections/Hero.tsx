'use client';

import { motion } from 'framer-motion';
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right';
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
    <section className="relative min-h-screen w-full pt-32 pb-24 overflow-hidden">
      {/* Full-screen Video Background */}
      <div className="absolute inset-0 w-full h-full">
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
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
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
            While Binance, OKX, and others track every move—we don't. Swiss-grade privacy meets 
            instant execution. Buy, sell, and swap with absolute anonymity.
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



