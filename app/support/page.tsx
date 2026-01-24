'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Mail, MessageCircle, ArrowRight } from 'lucide-react';
import Navbar from '@/components/sections/Navbar';
import Footer from '@/components/sections/Footer';

export default function SupportPage() {
  return (
    <main className="min-h-screen w-full bg-background">
      <Navbar />

      <section className="container mx-auto px-6 lg:px-8 pt-32 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-4xl lg:text-5xl text-foreground mb-5 heading-text">
              Support
            </h1>
            <p className="text-lg text-muted-foreground professional-text max-w-2xl mx-auto">
              Our team is here to help. Choose your preferred contact method below.
            </p>
          </div>

          {/* Contact Options */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {/* Email Option */}
            <motion.a
              href="mailto:hello@cryptocoop.info"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="group bg-card border border-border rounded-lg p-8 hover:border-foreground/20 transition-all refined-shadow hover:shadow-lg"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center text-foreground">
                  <Mail className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" strokeWidth={1.5} />
              </div>
              
              <h2 className="text-2xl text-foreground mb-3 heading-text">
                Email Support
              </h2>
              
              <p className="text-[15px] text-muted-foreground professional-text leading-relaxed mb-4">
                Send us a detailed message and we'll respond within 24 hours.
              </p>
              
              <div className="inline-flex items-center gap-2 text-foreground professional-text font-medium group-hover:gap-3 transition-all">
                hello@cryptocoop.info
              </div>
            </motion.a>

            {/* Telegram Option */}
            <motion.a
              href="https://t.me/RealCryptoCoop"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="group bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/30 rounded-lg p-8 hover:border-primary/50 transition-all elevated-shadow hover:shadow-lg"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-white">
                  <MessageCircle className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-all" strokeWidth={1.5} />
              </div>
              
              <h2 className="text-2xl text-foreground mb-3 heading-text">
                Telegram Support
              </h2>
              
              <p className="text-[15px] text-muted-foreground professional-text leading-relaxed mb-4">
                Chat with our team directly for instant assistance.
              </p>
              
              <div className="inline-flex items-center gap-2 text-primary professional-text font-medium group-hover:gap-3 transition-all">
                @RealCryptoCoop
              </div>
            </motion.a>
          </div>

          {/* FAQ Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-accent/30 p-8 md:p-10 border border-border rounded-lg"
          >
            <h3 className="text-xl text-foreground mb-4 heading-text">
              Common questions
            </h3>
            <div className="space-y-3 text-[15px] text-muted-foreground professional-text">
              <p>
                Before reaching out, you might find answers in our{' '}
                <Link href="/#faq" className="text-foreground font-medium hover:text-primary transition-colors">
                  FAQ section
                </Link>
                .
              </p>
              <p>
                For trading platform updates and announcements, check our{' '}
                <a 
                  href="https://cryptocoop.betteruptime.com/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground font-medium hover:text-primary transition-colors"
                >
                  status page
                </a>
                .
              </p>
            </div>
          </motion.div>

          {/* Response Time */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-12 text-center"
          >
            <p className="text-sm text-muted-foreground professional-text">
              Average response time: <span className="font-medium text-foreground">Under 24 hours</span>
            </p>
          </motion.div>
        </motion.div>
      </section>
      <Footer />
    </main>
  );
}
