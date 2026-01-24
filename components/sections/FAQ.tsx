'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';

const faqs = [
  {
    question: 'What makes Cryptocoop different from other exchanges?',
    answer: 'Cryptocoop is built directly into Telegram with privacy as a foundational principle. We operate without identity verification requirements and maintain a non-custodial architecture that gives you complete control over your assets.',
  },
  {
    question: 'Is identity verification required?',
    answer: 'No identity verification is needed. We prioritize financial privacy and believe users should maintain control over their personal information while accessing digital asset markets.',
  },
  {
    question: 'Which digital assets are supported?',
    answer: 'We support a curated selection of major cryptocurrencies including BTC, ETH, TON, and USDT. Our platform specializes in privacy-focused assets like Monero (XMR) with competitive rates and reliable liquidity.',
  },
  {
    question: 'Are there trading limits or restrictions?',
    answer: 'There are no imposed trading caps or volume restrictions. Our platform is designed to serve both individual traders and institutional users without artificial limitations.',
  },
  {
    question: 'How is security maintained?',
    answer: "Security is ensured through Telegram's native encryption infrastructure, combined with multi-factor authentication and our proprietary security protocols. Your assets remain secure without requiring personal data collection.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-8 max-w-3xl">
        <AnimatedSection>
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-foreground mb-6 text-center heading-text">
            Frequently asked questions
          </h2>
          <p className="text-lg text-muted-foreground text-center mb-16 professional-text">
            Everything you need to know about our platform
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


