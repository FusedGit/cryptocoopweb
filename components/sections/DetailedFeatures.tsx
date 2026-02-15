'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import AnimatedSection from '@/components/AnimatedSection';

const features = [
  {
    title: 'Zero surveillance',
    subtitle: 'True financial privacy',
    description: 'No KYC. No identity checks. No data harvesting. While traditional exchanges build dossiers on you, we build nothing. Your transactions are invisible, untraceable, and yours alone.',
    image: '/assets/camera.png',
    bg: 'bg-gradient-to-br from-accent/30 to-accent/10',
  },
  {
    title: 'Unrestricted access',
    subtitle: 'Trade without barriers',
    description: 'No daily limits. No withdrawal caps. No arbitrary restrictions. The freedom to move your wealth when and how you choose—without permission from anyone.',
    image: '/assets/nolimits.png',
    bg: 'bg-gradient-to-br from-primary/10 to-primary/5',
  },
  {
    title: 'Global liquidity',
    subtitle: 'Trade anywhere, anytime',
    description: 'Bank transfers across 180+ countries. Cash deposits worldwide. Every major payment method supported. Access the crypto market from wherever you are, however you want.',
    image: '/assets/globalpayments.png',
    bg: 'bg-gradient-to-br from-muted to-background',
  },
  {
    title: 'Human support',
    subtitle: '24/7 expert assistance',
    description: 'Real people, not bots. Expert traders who understand your needs. Available around the clock to ensure your trades execute flawlessly.',
    image: '/assets/human.png',
    bg: 'bg-gradient-to-br from-accent/20 to-accent/5',
  },
];

export default function DetailedFeatures() {
  return (
    <section className="py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {features.map((feature, idx) => (
            <AnimatedSection key={idx}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className={`relative h-full ${feature.bg} border border-border rounded-2xl p-10 md:p-12 flex flex-col min-h-[480px] refined-shadow`}
              >
                <div className="relative z-10 flex-1 flex flex-col">
                  <h3 className="text-2xl md:text-3xl lg:text-4xl text-foreground mb-3 heading-text">
                    {feature.title}
                  </h3>
                  <p className="text-base md:text-lg text-muted-foreground mb-2 professional-text">
                    {feature.subtitle}
                  </p>
                  <p className="text-sm md:text-base text-muted-foreground/80 professional-text leading-relaxed">
                    {feature.description}
                  </p>
                  
                  {/* Image positioned at bottom */}
                  <div className="mt-auto pt-8 flex justify-center items-end">
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="relative"
                      style={{ 
                        filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.08))',
                      }}
                    >
                      <Image
                        src={feature.image}
                        alt={feature.title}
                        width={280}
                        height={280}
                        unoptimized
                        className="w-full max-w-[200px] md:max-w-[260px] h-auto transparent-png"
                      />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <h3 className="text-2xl md:text-3xl text-foreground mb-4 heading-text">
            Ready to trade with real privacy?
          </h3>
          <p className="text-lg text-muted-foreground mb-8 professional-text max-w-2xl mx-auto">
            Join thousands who've chosen freedom over surveillance. Start trading in under 60 seconds.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
          </div>
        </motion.div>
      </div>
    </section>
  );
}



