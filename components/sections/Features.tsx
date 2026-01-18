'use client';

import { motion } from 'framer-motion';
import { Shield, Globe, Infinity, Zap, MessageSquare, Users } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';

const features = [
  {
    icon: Shield,
    title: 'No KYC Required',
    description: 'Privacy first. Your identity, your choice.'
  },
  {
    icon: Globe,
    title: 'Worldwide Access',
    description: 'No country restrictions. Available everywhere.'
  },
  {
    icon: Infinity,
    title: 'No Limits',
    description: 'Trade any amount, anytime.'
  },
  {
    icon: Zap,
    title: 'Instant Settlement',
    description: 'No frozen funds or waiting periods.'
  },
  {
    icon: MessageSquare,
    title: 'Telegram Native',
    description: 'Trade where you chat. Seamless experience.'
  },
  {
    icon: Users,
    title: 'Non-Discriminatory',
    description: 'Crypto for everyone, as it should be.'
  }
];

export default function Features() {
  return (
    <section className="relative w-full bg-black py-20 md:py-32">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">
              Built for Freedom
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              We believe crypto should be accessible to everyone, without barriers or discrimination.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              className="group relative overflow-hidden rounded-lg border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10"
            >
              <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-white">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
              
              {/* Hover gradient effect */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}






