'use client';

import { motion } from 'framer-motion';
import { ShoppingCart, Lock, Zap, Shield } from 'lucide-react';
import Image from 'next/image';
import AnimatedSection from '@/components/AnimatedSection';

const highlights = [
  {
    title: 'Privacy-first design',
    description: 'Built with financial privacy at the core. Trade with confidence knowing your data remains yours.',
    icon: Shield,
  },
  {
    title: 'Multiple assets supported',
    description: 'Access a curated selection of digital currencies including XMR, BTC, TON and more.',
    image: '/assets/xmr.svg',
  },
  {
    title: 'Flexible payment options',
    description: 'Connect your preferred payment method. Bank transfers, cash, and global payment systems supported.',
    icon: ShoppingCart,
  },
  {
    title: 'Your funds, your control',
    description: 'Non-custodial architecture means you maintain full control. No account freezes or intrusive checks.',
    icon: Lock,
  },
  {
    title: 'Seamless integration',
    description: 'Native Telegram experience. No additional apps or complicated setup required.',
    icon: Zap,
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
            Built for modern traders
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto professional-text">
            A platform designed around security, simplicity, and user sovereignty.
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
      </div>
    </section>
  );
}


