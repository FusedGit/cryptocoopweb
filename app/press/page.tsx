'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Download, FileText, Image as ImageIcon, Mail, ExternalLink } from 'lucide-react';
import Navbar from '@/components/sections/Navbar';
import Footer from '@/components/sections/Footer';

const pressReleases = [
  {
    date: 'January 2025',
    title: 'Cryptocoop Reaches $26M in Total Trading Volume',
    description: 'Platform achieves milestone with 21,800+ completed trades across 150+ countries, maintaining #1 ranking on LocalCoinSwap.',
  },
  {
    date: 'December 2024',
    title: 'Cryptocoop Expands to Native Telegram Integration',
    description: 'Launch of dedicated Telegram bot brings seamless cryptocurrency trading directly to messaging platform users.',
  },
  {
    date: 'November 2024',
    title: 'Global Payment Methods Expansion',
    description: 'Platform adds support for 50+ local payment methods including PromptPay, UPI, PIX, and regional banking systems.',
  },
];

const mediaAssets = [
  {
    type: 'Logo Package',
    description: 'SVG, PNG formats in multiple sizes',
    icon: ImageIcon,
  },
  {
    type: 'Brand Guidelines',
    description: 'Typography, colors, and usage rules',
    icon: FileText,
  },
  {
    type: 'Product Screenshots',
    description: 'High-resolution interface images',
    icon: ImageIcon,
  },
  {
    type: 'Fact Sheet',
    description: 'Company stats and key information',
    icon: FileText,
  },
];

const companyFacts = [
  { label: 'Founded', value: '2020' },
  { label: 'Headquarters', value: 'United Kingdom' },
  { label: 'Global Operations', value: '10 Jurisdictions' },
  { label: 'Total Volume', value: '$26M+' },
  { label: 'Completed Trades', value: '21,800+' },
  { label: 'Active Users', value: '4,500+' },
  { label: 'Supported Countries', value: '150+' },
  { label: 'Payment Methods', value: '50+' },
];

export default function PressPage() {
  return (
    <main className="min-h-screen w-full bg-background">
      <Navbar />

      <section className="container mx-auto px-6 lg:px-8 pt-32 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-5xl mx-auto"
        >
          {/* Header */}
          <div className="mb-20">
            <h1 className="text-3xl md:text-4xl lg:text-5xl text-foreground mb-6 heading-text">
              Press & Media
            </h1>
            <p className="text-xl text-muted-foreground professional-text leading-relaxed max-w-3xl">
              Resources and information for journalists, media professionals, and content creators.
            </p>
          </div>

          {/* Company Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-20"
          >
            <h2 className="text-2xl md:text-3xl text-foreground mb-8 heading-text">
              Company Overview
            </h2>
            
            <div className="bg-card p-10 border border-border rounded-lg refined-shadow">
              <p className="text-[15px] text-muted-foreground professional-text leading-relaxed mb-8">
                Cryptocoop is a leading peer-to-peer cryptocurrency exchange platform operating since 2020. With the #1 ranking on LocalCoinSwap and over $26 million in trading volume, we provide privacy-focused cryptocurrency trading services to users across 150+ countries. Our platform offers seamless integration through Telegram and supports 50+ local payment methods, enabling accessible cryptocurrency trading for a global audience.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {companyFacts.map((fact, index) => (
                  <motion.div
                    key={fact.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                    className="text-center"
                  >
                    <p className="text-2xl text-foreground heading-text mb-1">{fact.value}</p>
                    <p className="text-xs text-muted-foreground professional-text">{fact.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Recent News */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-20"
          >
            <h2 className="text-2xl md:text-3xl text-foreground mb-8 heading-text">
              Recent Announcements
            </h2>
            
            <div className="space-y-6">
              {pressReleases.map((release, index) => (
                <motion.div
                  key={release.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="bg-card p-8 border border-border rounded-lg hover:border-foreground/20 transition-colors"
                >
                  <p className="text-sm text-muted-foreground professional-text mb-3">{release.date}</p>
                  <h3 className="text-xl text-foreground heading-text mb-3">
                    {release.title}
                  </h3>
                  <p className="text-[15px] text-muted-foreground professional-text leading-relaxed">
                    {release.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Media Kit */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-20"
          >
            <h2 className="text-2xl md:text-3xl text-foreground mb-8 heading-text">
              Media Kit
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {mediaAssets.map((asset, index) => (
                <motion.div
                  key={asset.type}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="bg-accent/30 p-6 border border-border rounded-lg"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-card rounded-lg flex items-center justify-center flex-shrink-0">
                      <asset.icon className="w-5 h-5 text-foreground" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base text-foreground heading-text mb-2">
                        {asset.type}
                      </h3>
                      <p className="text-sm text-muted-foreground professional-text">
                        {asset.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <a
                href="mailto:hello@cryptocoop.info?subject=Media Kit Request"
                className="inline-flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors professional-text font-medium"
              >
                <Download className="w-4 h-4" strokeWidth={1.5} />
                Request Media Kit
              </a>
            </div>
          </motion.div>

          {/* Key Talking Points */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mb-20"
          >
            <h2 className="text-2xl md:text-3xl text-foreground mb-8 heading-text">
              Key Talking Points
            </h2>
            
            <div className="bg-card p-10 border border-border rounded-lg">
              <div className="space-y-5 text-[15px] text-muted-foreground professional-text leading-relaxed">
                <div className="border-l-2 border-primary/30 pl-6">
                  <h3 className="text-base text-foreground heading-text mb-2">Market Leadership</h3>
                  <p>
                    Cryptocoop holds the #1 ranking on LocalCoinSwap with verifiable performance metrics and consistent trading volume growth since 2020.
                  </p>
                </div>

                <div className="border-l-2 border-primary/30 pl-6">
                  <h3 className="text-base text-foreground heading-text mb-2">Global Accessibility</h3>
                  <p>
                    Operating across 150+ countries with 50+ local payment methods, from SEPA in Europe to UPI in India and PromptPay in Thailand.
                  </p>
                </div>

                <div className="border-l-2 border-primary/30 pl-6">
                  <h3 className="text-base text-foreground heading-text mb-2">Privacy Architecture</h3>
                  <p>
                    Built on data minimization principles, enabling users to maintain control over their financial information while accessing global markets.
                  </p>
                </div>

                <div className="border-l-2 border-primary/30 pl-6">
                  <h3 className="text-base text-foreground heading-text mb-2">Telegram Integration</h3>
                  <p>
                    Native integration with Telegram provides frictionless access to cryptocurrency trading without requiring separate applications or complex setup.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Media Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="bg-gradient-to-br from-primary/10 to-primary/5 p-10 border border-primary/20 rounded-lg text-center"
          >
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-6">
              <Mail className="w-6 h-6 text-white" strokeWidth={1.5} />
            </div>
            <h2 className="text-2xl text-foreground heading-text mb-4">
              Media Inquiries
            </h2>
            <p className="text-[15px] text-muted-foreground professional-text mb-6 max-w-2xl mx-auto leading-relaxed">
              For press inquiries, interview requests, or additional information, please contact our media relations team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:hello@cryptocoop.info?subject=Press Inquiry"
                className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-md professional-text font-medium hover:opacity-90 transition-opacity elevated-shadow"
              >
                Email Press Team
              </a>
              <a
                href="https://t.me/RealCryptoCoop"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white border border-border text-foreground px-6 py-3 rounded-md professional-text font-medium hover:bg-accent/30 transition-colors"
              >
                Contact on Telegram
                <ExternalLink className="w-4 h-4" strokeWidth={1.5} />
              </a>
            </div>
            <p className="mt-6 text-sm text-muted-foreground professional-text">
              Response time: Within 24-48 hours
            </p>
          </motion.div>
        </motion.div>
      </section>
      <Footer />
    </main>
  );
}
