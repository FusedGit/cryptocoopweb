'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, ChevronRight } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';

const faqs = [
  {
    question: 'What is Cryptocoop and how is it different?',
    answer: 'Cryptocoop is a privacy-first crypto exchange natively embedded into Telegram. Unlike other exchanges, we require zero KYC, have no limits, and never perform intrusive funds checks or account freezes.',
  },
  {
    question: 'Do I need to verify my identity (KYC)?',
    answer: 'No. We believe in financial sovereignty and privacy. You can trade any amount without ever sharing personal documents or identity verification.',
  },
  {
    question: 'What tokens can I trade?',
    answer: 'We support all popular cryptocurrencies including BTC, ETH, TON, and USDT. We are a premier destination for Monero (XMR) trading, offering the best rates and instant liquidity.',
  },
  {
    question: 'Are there any limits on trading or transfers?',
    answer: 'None. Whether you are a small trader or a high-volume institution, we provide an unrestricted environment with zero daily or monthly caps.',
  },
  {
    question: 'How do you ensure security without KYC?',
    answer: "Security is handled through Telegram's native encryption, multi-factor authentication, and our own proprietary stealth trading technology. We don't need your data to keep your funds safe.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-gradient-to-b from-yellow-50 via-white to-white relative overflow-hidden">
      {/* Doodle decorations */}
      <div className="absolute top-20 left-10 w-24 h-24 border-4 border-yellow-300 opacity-30" 
           style={{ borderRadius: '40% 60% 50% 50% / 60% 40% 60% 40%' }} />
      <motion.div 
        className="absolute bottom-20 right-20 text-4xl"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        ❓
      </motion.div>

      <div className="container mx-auto px-4 max-w-4xl">
        <AnimatedSection>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-8 text-center doodle-text"
              style={{ transform: 'rotate(-1deg)' }}>
            Got Questions?
          </h2>
          <p className="text-xl text-muted-foreground text-center mb-16 doodle-text font-semibold">
            We've got answers! 💡
          </p>
        </AnimatedSection>

        <div className="space-y-5">
          {faqs.map((faq, index) => (
            <AnimatedSection key={index}>
              <motion.div 
                className="border-4 border-yellow-200 rounded-3xl overflow-hidden bg-white hover:border-yellow-400 transition-colors sketchy-shadow"
                style={{ transform: `rotate(${index % 2 === 0 ? -0.3 : 0.3}deg)` }}
                whileHover={{ rotate: index % 2 === 0 ? 0.5 : -0.5 }}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left"
                >
                  <span className="text-lg md:text-xl font-black text-foreground pr-8 doodle-text">
                    {faq.question}
                  </span>
                  <motion.div 
                    className={`flex-shrink-0 w-10 h-10 flex items-center justify-center font-black text-lg transition-all ${openIndex === index ? 'bg-primary text-white' : 'bg-yellow-100 text-yellow-900'}`}
                    style={{ 
                      borderRadius: '40% 60% 50% 50% / 60% 40% 60% 40%', 
                      border: openIndex === index ? '3px solid black' : '3px solid #facc15' 
                    }}
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                  >
                    {openIndex === index ? '−' : '+'}
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 md:px-8 pb-8 text-base md:text-lg text-muted-foreground leading-relaxed doodle-text font-semibold">
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
            <motion.a 
              href="https://t.me/TheCryptoCoopBot"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-900 px-8 py-4 font-black text-lg doodle-text sketchy-shadow"
              style={{ borderRadius: '60% 40% 55% 45% / 45% 55% 45% 55%', border: '3px solid #facc15' }}
            >
              Still have questions? Ask us! →
            </motion.a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}


