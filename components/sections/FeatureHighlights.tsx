'use client';

import { motion } from 'framer-motion';
import { ShoppingCart, Lock, Zap, Shield, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import AnimatedSection from '@/components/AnimatedSection';

const highlights = [
  {
    title: 'Buy instantly',
    description: 'Purchase crypto in seconds. No KYC verification, no waiting periods, no bureaucracy. Just fast, private transactions.',
    icon: ShoppingCart,
  },
  {
    title: 'Sell without limits',
    description: 'Convert your crypto to cash instantly. No withdrawal limits, no account freezes, no questions asked.',
    icon: Zap,
  },
  {
    title: 'Swap seamlessly',
    description: 'Exchange between BTC, ETH, XMR, TON, USDT and more. Lightning-fast swaps with zero surveillance.',
    image: '/assets/xmr.svg',
  },
  {
    title: 'Swiss-grade privacy',
    description: 'Absolute anonymity guaranteed. No ID verification, no data collection, no tracking. Your financial activity stays yours.',
    icon: Shield,
  },
  {
    title: 'All coins supported',
    description: 'Access the full spectrum of digital assets. From Bitcoin to privacy coins, we support what matters to you.',
    icon: Lock,
  },
  {
    title: 'Global payments',
    description: 'Bank transfers, cash deposits, international wires. Trade from anywhere with any payment method you prefer.',
    icon: ShoppingCart,
  },
];

export default function FeatureHighlights() {
  return (
    <section className="py-32 bg-white overflow-hidden relative">
      <div className="container mx-auto px-6 lg:px-8 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-foreground mb-6 heading-text">
            Everything you need. Nothing you don't.
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto professional-text">
            While other exchanges demand your identity, track your trades, and limit your freedom—we do the opposite.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((item, index) => (
            <AnimatedSection key={index}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="h-full p-8 bg-card border border-border rounded-lg hover:border-foreground/20 transition-colors refined-shadow"
              >
                <div className="w-12 h-12 bg-accent/50 rounded-lg flex items-center justify-center text-foreground mb-5">
                  {item.image ? (
                    <Image 
                      src={item.image} 
                      alt={item.title} 
                      width={24} 
                      height={24} 
                      unoptimized 
                      className="transparent-png" 
                    />
                  ) : (
                    item.icon && <item.icon className="w-5 h-5" strokeWidth={1.5} />
                  )}
                </div>
                <h3 className="text-xl text-foreground mb-3 leading-tight heading-text">
                  {item.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed professional-text text-[15px]">
                  {item.description}
                </p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="https://t.me/TheCryptoCoopBot"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-foreground text-background px-7 py-3.5 rounded-md text-base professional-text font-medium inline-flex items-center justify-center gap-2 transition-opacity hover:opacity-90 elevated-shadow"
            >
              Start Trading Now
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
              Explore P2P
              <ArrowRight className="w-4 h-4" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


