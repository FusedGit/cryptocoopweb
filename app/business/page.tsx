'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Shield, Zap, Globe, TrendingUp, Lock, CheckCircle2, ArrowRight } from 'lucide-react';
import Navbar from '@/components/sections/Navbar';
import Footer from '@/components/sections/Footer';

const features = [
  {
    icon: Shield,
    title: 'Privacy-First Infrastructure',
    description: 'Built with data minimization principles. We collect only essential transaction data, ensuring your business and customers maintain maximum privacy.',
  },
  {
    icon: Zap,
    title: 'Instant Settlement',
    description: 'Real-time cryptocurrency settlement with automated fiat conversion. Funds available within minutes, not days.',
  },
  {
    icon: Globe,
    title: 'Global Coverage',
    description: 'Support for 150+ countries with local payment methods. From SEPA in Europe to UPI in India, WeChat Pay in China, and PromptPay in Thailand.',
  },
  {
    icon: TrendingUp,
    title: 'Competitive Rates',
    description: 'Industry-leading conversion rates with transparent fee structures. No hidden costs or surprise charges.',
  },
  {
    icon: Lock,
    title: 'Secure Architecture',
    description: 'Multi-signature wallets, cold storage options, and industry-standard security protocols protect every transaction.',
  },
];

const useCases = [
  {
    title: 'E-commerce Platforms',
    description: 'Accept cryptocurrency payments and receive settlement in your preferred fiat currency. Seamless integration with existing checkout systems.',
  },
  {
    title: 'Digital Services',
    description: 'Enable global customers to pay with crypto while you receive local currency. Perfect for SaaS, digital content, and subscription services.',
  },
  {
    title: 'Gaming & Entertainment',
    description: 'Process high-volume transactions with instant settlement. Support for multiple cryptocurrencies and fiat off-ramp options.',
  },
  {
    title: 'Marketplaces',
    description: 'Facilitate multi-party transactions with automated splits. On-ramp and off-ramp for both buyers and sellers.',
  },
];

export default function BusinessPage() {
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
              Business Payment Solutions
            </h1>
            <p className="text-xl text-muted-foreground professional-text leading-relaxed max-w-3xl">
              Enterprise-grade cryptocurrency payment processing with global reach. Accept crypto, settle in fiat—or vice versa.
            </p>
          </div>

          {/* On-Ramp / Off-Ramp */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-20"
          >
            <h2 className="text-2xl md:text-3xl text-foreground mb-8 heading-text">
              Comprehensive On-Ramp & Off-Ramp Services
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-8 border border-primary/20 rounded-lg">
                <h3 className="text-xl text-foreground heading-text mb-4">Crypto On-Ramp</h3>
                <p className="text-[15px] text-muted-foreground professional-text leading-relaxed mb-4">
                  Enable customers to purchase cryptocurrency using local payment methods. Seamless conversion from fiat to digital assets.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground professional-text">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                    <span>Support for 50+ local payment methods</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                    <span>Instant cryptocurrency delivery</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                    <span>Competitive exchange rates</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-accent/20 to-accent/10 p-8 border border-accent/50 rounded-lg">
                <h3 className="text-xl text-foreground heading-text mb-4">Crypto Off-Ramp</h3>
                <p className="text-[15px] text-muted-foreground professional-text leading-relaxed mb-4">
                  Accept cryptocurrency payments and receive settlement in your preferred local currency. Eliminate volatility risk.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground professional-text">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-foreground/60 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                    <span>Same-day fiat settlement available</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-foreground/60 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                    <span>Direct bank account deposits</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-foreground/60 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                    <span>Automated accounting integration</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Key Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-20"
          >
            <h2 className="text-2xl md:text-3xl text-foreground mb-8 heading-text">
              Built for Business
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="bg-card p-6 border border-border rounded-lg hover:border-foreground/20 transition-colors"
                >
                  <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-5 h-5 text-foreground" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg text-foreground heading-text mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-[15px] text-muted-foreground professional-text leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Use Cases */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-20"
          >
            <h2 className="text-2xl md:text-3xl text-foreground mb-8 heading-text">
              Industry Solutions
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {useCases.map((useCase, index) => (
                <motion.div
                  key={useCase.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="bg-accent/30 p-6 border border-border rounded-lg"
                >
                  <h3 className="text-lg text-foreground heading-text mb-3">
                    {useCase.title}
                  </h3>
                  <p className="text-[15px] text-muted-foreground professional-text leading-relaxed">
                    {useCase.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Technical Capabilities */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mb-20"
          >
            <h2 className="text-2xl md:text-3xl text-foreground mb-8 heading-text">
              Technical Capabilities
            </h2>
            
            <div className="bg-card p-10 border border-border rounded-lg">
              <div className="grid md:grid-cols-3 gap-8 mb-8">
                <div className="text-center">
                  <p className="text-3xl text-foreground heading-text mb-2">150+</p>
                  <p className="text-sm text-muted-foreground professional-text">Supported Countries</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl text-foreground heading-text mb-2">50+</p>
                  <p className="text-sm text-muted-foreground professional-text">Payment Methods</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl text-foreground heading-text mb-2">24/7</p>
                  <p className="text-sm text-muted-foreground professional-text">Processing Available</p>
                </div>
              </div>

              <div className="space-y-4 text-[15px] text-muted-foreground professional-text">
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <p><span className="text-foreground font-medium">API Integration:</span> RESTful API with webhooks for real-time transaction updates</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <p><span className="text-foreground font-medium">Settlement Options:</span> Daily, weekly, or on-demand settlement to your bank account</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <p><span className="text-foreground font-medium">Multi-Currency Support:</span> BTC, ETH, USDT, USDC, XMR, TON, and more</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <p><span className="text-foreground font-medium">Volume Handling:</span> Scalable infrastructure supporting high-volume operations</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <p><span className="text-foreground font-medium">Risk Management:</span> Advanced fraud detection and transaction monitoring</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Regional Payment Specialization */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mb-20"
          >
            <h2 className="text-2xl md:text-3xl text-foreground mb-8 heading-text">
              Regional Payment Expertise
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card p-6 border border-border rounded-lg">
                <h3 className="text-lg text-foreground heading-text mb-4">Asia-Pacific</h3>
                <p className="text-[15px] text-muted-foreground professional-text leading-relaxed mb-4">
                  Deep integration with regional payment systems including WeChat Pay, Alipay, UPI, PromptPay, and MoMo.
                </p>
                <div className="space-y-2 text-sm text-muted-foreground professional-text">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-primary rounded-full" />
                    <span>China (WeChat Pay, Alipay)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-primary rounded-full" />
                    <span>India (UPI, IMPS, Paytm)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-primary rounded-full" />
                    <span>Southeast Asia (PromptPay, GrabPay, MoMo)</span>
                  </div>
                </div>
              </div>

              <div className="bg-card p-6 border border-border rounded-lg">
                <h3 className="text-lg text-foreground heading-text mb-4">Europe & Americas</h3>
                <p className="text-[15px] text-muted-foreground professional-text leading-relaxed mb-4">
                  Comprehensive support for SEPA, SWIFT, ACH, PIX, and other regional banking systems.
                </p>
                <div className="space-y-2 text-sm text-muted-foreground professional-text">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-primary rounded-full" />
                    <span>Europe (SEPA, SEPA Instant)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-primary rounded-full" />
                    <span>USA (ACH, Wire, Zelle)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-primary rounded-full" />
                    <span>Latin America (PIX, SPEI, Mercado Pago)</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Technical FAQ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mb-20"
          >
            <h2 className="text-2xl md:text-3xl text-foreground mb-8 heading-text">
              Integration Details
            </h2>
            
            <div className="space-y-6">
              <div className="bg-card p-6 border border-border rounded-lg">
                <h3 className="text-base text-foreground heading-text mb-3">Processing Model</h3>
                <p className="text-[15px] text-muted-foreground professional-text leading-relaxed">
                  We operate a hybrid model combining P2P liquidity with direct payment processor partnerships. This ensures competitive rates, guaranteed availability, and enterprise-grade reliability for high-volume operations.
                </p>
              </div>

              <div className="bg-card p-6 border border-border rounded-lg">
                <h3 className="text-base text-foreground heading-text mb-3">Entity Structure</h3>
                <p className="text-[15px] text-muted-foreground professional-text leading-relaxed">
                  All payments are processed through registered legal entities operating in their respective jurisdictions. We maintain corporate banking relationships and full regulatory compliance in each market we serve.
                </p>
              </div>

              <div className="bg-card p-6 border border-border rounded-lg">
                <h3 className="text-base text-foreground heading-text mb-3">Transaction Limits & Volumes</h3>
                <p className="text-[15px] text-muted-foreground professional-text leading-relaxed mb-3">
                  Standard limits apply based on payment method and region. Enterprise clients receive custom limits based on volume commitments and relationship development.
                </p>
                <div className="space-y-2 text-sm text-muted-foreground professional-text">
                  <div className="flex items-start gap-2">
                    <div className="w-1 h-1 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                    <span>Standard transactions: Varies by payment method and region</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1 h-1 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                    <span>Enterprise agreements: Custom limits negotiated based on volume</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1 h-1 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                    <span>Both individual and corporate payments accepted</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="bg-gradient-to-br from-primary/10 to-primary/5 p-10 border border-primary/20 rounded-lg text-center"
          >
            <h2 className="text-2xl text-foreground heading-text mb-4">
              Ready to integrate cryptocurrency payments?
            </h2>
            <p className="text-[15px] text-muted-foreground professional-text mb-8 max-w-2xl mx-auto leading-relaxed">
              Contact our business development team to discuss your specific requirements, volume expectations, and integration timeline.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:hello@cryptocoop.info"
                className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-md professional-text font-medium hover:opacity-90 transition-opacity elevated-shadow"
              >
                Contact Sales
                <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
              </a>
              <Link
                href="/supported"
                className="inline-flex items-center gap-2 bg-white border border-border text-foreground px-6 py-3 rounded-md professional-text font-medium hover:bg-accent/30 transition-colors"
              >
                View Coverage
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </section>
      <Footer />
    </main>
  );
}
