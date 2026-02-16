'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';

const faqs = [
  {
    question: 'Do you really not collect any personal data?',
    answer: 'Absolutely none. No KYC, no passport scans, no selfies, no address verification. We collect zero personal information about our users and that is by design. Your privacy is not a feature, it is our foundation.',
  },
  {
    question: 'How can I trust you without KYC?',
    answer: 'The question is backwards. KYC doesn\'t protect you, it exposes you. Every exchange with your data is a data breach waiting to happen. We can\'t lose what we never collect. Our non-custodial design means we never hold your funds, so there\'s nothing to "trust" us with.',
  },
  {
    question: 'What cryptocurrencies can I trade?',
    answer: 'All major assets: BTC, ETH, XMR, TON, USDT, LTC, and more. We specialize in privacy coins like Monero with deep liquidity. If you need a specific coin, ask our support team. We\'re constantly expanding.',
  },
  {
    question: 'Are there withdrawal limits or trading caps?',
    answer: 'Zero. No daily limits, no monthly caps, no "verification levels" that unlock higher amounts. Move your wealth when you want, how you want. Your money, your rules.',
  },
  {
    question: 'How fast are transactions?',
    answer: 'Instant. While traditional exchanges make you wait days for verification, you can start trading in under 60 seconds. Most transactions complete within minutes, not days.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'Bank transfers in 180+ countries, cash deposits, international wires, and most major payment systems. We work with what works for you. No restrictions based on your location or payment preference.',
  },
];

// Extract check items to module scope to avoid recreating on every render (React Best Practice 6.3)
const checkItemsMap = {
  buy: ['No maximum limits', 'Easy and uncomplicated', 'Support for larger amounts'],
  sell: ['Flexible withdrawal options', 'Smooth off-ramp process', 'Handle any amount'],
  swap: ['All cryptocurrencies supported', 'Privacy coins included', 'Transparent pricing'],
  coins: ['150+ digital assets', 'Regular new listings', 'No trading restrictions'],
  nocustody: ['Never hold your funds', 'No fund locks', 'Complete transparency']
} as const;

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-8 max-w-3xl">
        <AnimatedSection>
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-foreground mb-6 text-center heading-text">
            Questions about privacy
          </h2>
          <p className="text-lg text-muted-foreground text-center mb-16 professional-text">
            We answer what other exchanges won't
          </p>
        </AnimatedSection>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <AnimatedSection key={index}>
              <motion.div 
                className="border border-border rounded-lg overflow-hidden bg-card hover:border-foreground/20 transition-colors"
                whileHover={{ y: -2 }}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 md:p-7 text-left gap-4"
                >
                  <span className="text-base md:text-lg text-foreground professional-text font-medium flex-1">
                    {faq.question}
                  </span>
                  <motion.div 
                    className="flex-shrink-0 w-8 h-8 rounded-full bg-accent flex items-center justify-center text-foreground"
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {openIndex === index ? (
                      <Minus className="w-4 h-4" strokeWidth={2} />
                    ) : (
                      <Plus className="w-4 h-4" strokeWidth={2} />
                    )}
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-6 md:px-7 pb-7 text-[15px] md:text-base text-muted-foreground leading-relaxed professional-text">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection>
          <div className="mt-16 text-center">
            <p className="text-muted-foreground professional-text mb-4">
              Have more questions?
            </p>
            <motion.a 
              href="https://t.me/TheCryptoCoopBot"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors professional-text font-medium"
            >
              Contact our support team
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}


