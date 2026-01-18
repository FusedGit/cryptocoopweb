'use client';

import { motion } from 'framer-motion';
import { ShoppingCart, Send, TrendingUp, Lock, Zap, Shield, Coins } from 'lucide-react';
import Image from 'next/image';
import AnimatedSection from '@/components/AnimatedSection';

const highlights = [
  {
    title: 'No KYC, No AML, No Limits',
    description: 'We believe in financial privacy. Trade any amount instantly without ever sharing your identity or source of funds.',
    icon: Shield,
  },
  {
    title: 'Trade XMR, BTC, TON and more',
    description: 'The premier destination for Monero enthusiasts. Swap popular tokens with the highest level of privacy.',
    image: '/assets/xmr.svg',
  },
  {
    title: 'Multiple Payment Methods',
    description: 'Buy and sell crypto using Bank Transfers, Cash, and dozens of global payment systems with zero friction.',
    icon: ShoppingCart,
  },
  {
    title: 'No Funds Checks or Discrimination',
    description: 'Your money is yours. We never freeze accounts or perform intrusive checks like other centralized exchanges.',
    icon: Lock,
  },
  {
    title: 'Native Telegram Experience',
    description: 'No apps to download, no seed phrases to lose. Access the full exchange power directly from your chat.',
    icon: Zap,
  },
];

export default function FeatureHighlights() {
  return (
    <section className="py-24 bg-gradient-to-b from-white via-purple-50/30 to-white overflow-hidden relative">
      {/* Doodle decorations */}
      <motion.div 
        className="absolute top-10 right-10 text-3xl"
        animate={{ rotate: 360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      >
        🔒
      </motion.div>
      <motion.div 
        className="absolute bottom-10 left-10 text-3xl"
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        ⚡
      </motion.div>

      <div className="container mx-auto px-4 max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl lg:text-6xl font-black text-center mb-16 doodle-text text-foreground"
          style={{ transform: 'rotate(-1deg)' }}
        >
          Why choose us?
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {highlights.map((item, index) => (
            <AnimatedSection key={index}>
              <motion.div
                whileHover={{ y: -8, rotate: index % 2 === 0 ? 1 : -1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="h-full p-8 bg-white rounded-3xl border-4 border-purple-200 hover:border-purple-400 sketchy-shadow"
                style={{ transform: `rotate(${index % 2 === 0 ? -0.5 : 0.5}deg)` }}
              >
                <div className="w-14 h-14 bg-purple-100 flex items-center justify-center text-purple-600 mb-6"
                     style={{ borderRadius: '40% 60% 50% 50% / 60% 40% 60% 40%', border: '3px solid #a855f7' }}>
                  {item.image ? (
                    <Image src={item.image} alt={item.title} width={28} height={28} unoptimized className="transparent-png" />
                  ) : (
                    item.icon && <item.icon className="w-7 h-7" />
                  )}
                </div>
                <h3 className="text-xl md:text-2xl font-black text-foreground mb-3 leading-tight doodle-text">
                  {item.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed doodle-text font-semibold">
                  {item.description}
                </p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}


