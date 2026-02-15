'use client';

import { motion } from 'framer-motion';
// Direct imports to avoid barrel file (React Best Practice 2.1 - CRITICAL)
import Check from 'lucide-react/dist/esm/icons/check';
import X from 'lucide-react/dist/esm/icons/x';
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right';
import AnimatedSection from '@/components/AnimatedSection';

const comparisons = [
  {
    feature: 'KYC / Identity Verification',
    them: 'Required - passport, selfies, address proof',
    us: 'Never - zero personal data collected',
  },
  {
    feature: 'Transaction Surveillance',
    them: 'Full monitoring and reporting to authorities',
    us: 'Absolutely none - your business is yours',
  },
  {
    feature: 'Account Freezes',
    them: 'Common - funds locked without warning',
    us: 'Impossible - non-custodial design',
  },
  {
    feature: 'Withdrawal Limits',
    them: 'Daily/monthly caps based on verification level',
    us: 'No limits - move your wealth freely',
  },
  {
    feature: 'Trading Speed',
    them: 'Fast (after 3-7 day verification)',
    us: 'Instant - trade in 60 seconds',
  },
  {
    feature: 'Data Breaches Risk',
    them: 'High - centralized database of personal info',
    us: 'Zero - we have no data to breach',
  },
];

export default function WhyDifferent() {
  return (
    <section className="py-32 bg-foreground text-background overflow-hidden relative">
      <div className="container mx-auto px-6 lg:px-8 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-background mb-6 heading-text">
            Why we're nothing like Binance, OKX, or Moonpay
          </h2>
          <p className="text-lg text-background/70 max-w-3xl mx-auto professional-text">
            Traditional exchanges were built for compliance. We were built for you.
          </p>
        </motion.div>

        <AnimatedSection>
          <div className="bg-background/5 backdrop-blur-sm border border-background/10 rounded-2xl overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-3 gap-4 p-6 border-b border-background/10">
              <div className="text-sm text-background/50 professional-text font-medium">
                Feature
              </div>
              <div className="text-sm text-background/50 professional-text font-medium text-center">
                Traditional Exchanges
              </div>
              <div className="text-sm text-background professional-text font-medium text-center">
                Cryptocoop
              </div>
            </div>

            {/* Rows */}
            {comparisons.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`grid grid-cols-3 gap-4 p-6 border-b border-background/10 last:border-0 ${
                  index % 2 === 1 ? 'bg-background/5' : ''
                }`}
              >
                <div className="text-background professional-text font-medium flex items-center">
                  {item.feature}
                </div>
                <div className="flex items-center justify-center gap-2">
                  <X className="w-4 h-4 text-red-400 flex-shrink-0" />
                  <span className="text-background/60 professional-text text-sm text-center">
                    {item.them}
                  </span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span className="text-background professional-text text-sm text-center font-medium">
                    {item.us}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-xl text-background/80 mb-8 professional-text">
            Experience what crypto was meant to be: private, fast, and free.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="https://t.me/TheCryptoCoopBot"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-background text-foreground px-7 py-3.5 rounded-md text-base professional-text font-medium inline-flex items-center justify-center gap-2 transition-opacity hover:opacity-90"
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
              className="bg-transparent border border-background/30 text-background px-7 py-3.5 rounded-md text-base professional-text font-medium inline-flex items-center justify-center gap-2 transition-colors hover:bg-background/10"
            >
              P2P Trading
              <ArrowRight className="w-4 h-4" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
