'use client';

import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AnimatedSection from '@/components/AnimatedSection';

export default function CTA() {
  return (
    <section className="relative w-full border-t border-border bg-black py-20 md:py-32">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="mx-auto max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
                Start Trading on Telegram
              </h2>
              <p className="mb-10 text-lg text-muted-foreground md:text-xl">
                Join thousands of traders worldwide who trust Cryptocoop for their crypto exchange needs.
              </p>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block"
              >
                <Button
                  size="lg"
                  className="group gap-2 bg-primary px-8 py-6 text-lg font-semibold text-black transition-all hover:bg-primary/90"
                  asChild
                >
                  <a href="https://t.me/cryptocoop" target="_blank" rel="noopener noreferrer">
                    <Send className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    Open Telegram App
                  </a>
                </Button>
              </motion.div>

              <p className="mt-6 text-sm text-muted-foreground">
                No registration required • Start trading instantly
              </p>
            </motion.div>
          </div>
        </AnimatedSection>
      </div>

      {/* Footer */}
      <div className="container mx-auto mt-20 border-t border-border px-4 pt-8">
        <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row">
          <div>© 2024 Cryptocoop. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-white">Privacy</a>
            <a href="#" className="transition-colors hover:text-white">Terms</a>
            <a href="#" className="transition-colors hover:text-white">Contact</a>
          </div>
        </div>
      </div>
    </section>
  );
}






