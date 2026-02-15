'use client';

import { motion } from 'framer-motion';
// Direct imports to avoid barrel file (React Best Practice 2.1 - CRITICAL)
import Shield from 'lucide-react/dist/esm/icons/shield';
import Zap from 'lucide-react/dist/esm/icons/zap';
import Globe from 'lucide-react/dist/esm/icons/globe';
import Lock from 'lucide-react/dist/esm/icons/lock';
import AnimatedSection from '@/components/AnimatedSection';

const stats = [
  {
    value: '0',
    label: 'Data breaches',
    sublabel: 'Because we have zero data',
    icon: Shield,
  },
  {
    value: '60s',
    label: 'Time to first trade',
    sublabel: 'No verification delays',
    icon: Zap,
  },
  {
    value: '180+',
    label: 'Countries supported',
    sublabel: 'True global access',
    icon: Globe,
  },
  {
    value: '100%',
    label: 'Privacy guaranteed',
    sublabel: 'Swiss-grade anonymity',
    icon: Lock,
  },
];

export default function TrustSection() {
  return (
    <section className="py-32 bg-gradient-to-b from-white to-background overflow-hidden">
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-foreground mb-6 heading-text">
            Trusted by those who value freedom
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto professional-text">
            While traditional exchanges compete on features, we compete on principles.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <AnimatedSection key={index}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="relative text-center p-8 bg-card border border-border rounded-xl hover:border-foreground/20 transition-colors"
              >
                <div className="w-14 h-14 mx-auto mb-6 bg-accent/50 rounded-full flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-foreground" strokeWidth={1.5} />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-foreground mb-2 heading-text">
                  {stat.value}
                </div>
                <div className="text-base text-foreground mb-1 professional-text font-medium">
                  {stat.label}
                </div>
                <div className="text-sm text-muted-foreground professional-text">
                  {stat.sublabel}
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        {/* Privacy Guarantee Box */}
        <AnimatedSection>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 max-w-4xl mx-auto"
          >
            <div className="bg-foreground text-background rounded-2xl p-10 md:p-14 text-center border border-foreground">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 heading-text">
                Our Privacy Guarantee
              </h3>
              <p className="text-lg text-background/80 professional-text leading-relaxed max-w-2xl mx-auto">
                We will never ask for your identity. We will never track your transactions. 
                We will never share your data—because we don't have it. If any other exchange 
                made this promise, they'd be lying. We built our entire architecture around this truth.
              </p>
            </div>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
}
