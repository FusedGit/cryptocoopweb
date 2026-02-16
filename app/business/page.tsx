'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Shield,
  Zap,
  Globe,
  TrendingUp,
  Lock,
  CheckCircle2,
  ArrowRight,
  CreditCard,
  FileText,
  Send,
  Layers,
  RefreshCw,
  BarChart3,
  ShieldCheck,
  Clock,
  Wallet,
  Code2,
  Plug,
  MessageSquare,
} from 'lucide-react';
import Navbar from '@/components/sections/Navbar';
import Footer from '@/components/sections/Footer';
import OptimizedVideo from '@/components/ui/OptimizedVideo';
import { CountUp } from '@/components/ui/CountUp';

const products = [
  {
    icon: CreditCard,
    title: 'Merchant Gateway',
    description:
      'Accept cryptocurrency payments on your website or app. Customers pay in crypto, you receive settlement in your preferred currency. Seamless checkout experience with real-time confirmations.',
    features: [
      'One-line integration via API or plugins',
      'Auto-convert to stablecoins or fiat',
      'Custom checkout branding',
    ],
  },
  {
    icon: FileText,
    title: 'Invoicing',
    description:
      'Generate crypto payment invoices without writing a single line of code. Share payment links directly with clients for fast, trackable settlements.',
    features: [
      'No-code invoice generator',
      'Shareable payment links',
      'Real-time status tracking',
    ],
  },
  {
    icon: Send,
    title: 'Payout Service',
    description:
      'Distribute payments to vendors, affiliates, or employees in crypto. Automate mass transfers with our payout API for fast, low-cost disbursements.',
    features: [
      'Batch payouts via API',
      'Multi-currency support',
      'Scheduled or on-demand transfers',
    ],
  },
  {
    icon: Layers,
    title: 'White-Label Solution',
    description:
      'Embed our payment infrastructure under your own brand. Full white-label checkout, dashboards, and reporting with your logo and domain.',
    features: [
      'Fully branded experience',
      'Custom domain support',
      'Dedicated account management',
    ],
  },
  {
    icon: Wallet,
    title: 'Static Wallet Addresses',
    description:
      'Assign unique deposit addresses to each customer for recurring payments, top-ups, or subscription models. Automatic balance detection and callbacks.',
    features: [
      'Unique address per customer',
      'Automatic deposit detection',
      'Webhook notifications',
    ],
  },
  {
    icon: RefreshCw,
    title: 'Built-in Swap',
    description:
      'Convert between supported cryptocurrencies instantly within your dashboard. No external exchange needed, no blockchain fees for internal swaps.',
    features: [
      'Instant cross-currency conversion',
      'Zero blockchain fees on swaps',
      'Competitive exchange rates',
    ],
  },
];

const whyChoose = [
  {
    icon: Clock,
    title: 'Real-Time Processing',
    description:
      'Process crypto payments instantly with confirmations in seconds. No delays, no pending states that keep your customers waiting.',
  },
  {
    icon: ShieldCheck,
    title: 'Volatility Protection',
    description:
      'Auto-convert incoming payments to stablecoins like USDT or USDC instantly. Protect your revenue from market fluctuations without manual intervention.',
  },
  {
    icon: Shield,
    title: 'Privacy-First Architecture',
    description:
      'Built with data minimization principles. We collect only essential transaction data, ensuring your business and customers maintain maximum privacy.',
  },
  {
    icon: Code2,
    title: 'Developer-Friendly API',
    description:
      'RESTful API with comprehensive documentation, webhooks for every payment event, and SDKs for popular languages. Go from integration to production in hours.',
  },
  {
    icon: Plug,
    title: 'Ready-Made Plugins',
    description:
      'Pre-built integrations for WooCommerce, Shopify, WHMCS, and other popular platforms. Install and start accepting crypto in minutes.',
  },
  {
    icon: MessageSquare,
    title: 'Dedicated Support',
    description:
      'Direct access to our integration team during onboarding, plus 24/7 technical support and a dedicated account manager for enterprise clients.',
  },
];

const supportedCoins = [
  'Bitcoin (BTC)',
  'Ethereum (ETH)',
  'Tether (USDT)',
  'USD Coin (USDC)',
  'Monero (XMR)',
  'Toncoin (TON)',
  'BNB',
  'Solana (SOL)',
  'Litecoin (LTC)',
  'Tron (TRX)',
  'Ripple (XRP)',
  'DAI',
  'Dogecoin (DOGE)',
  'Bitcoin Cash (BCH)',
  'Polygon (POL)',
];

const useCases = [
  {
    title: 'E-commerce & Retail',
    description:
      'Accept crypto at checkout and receive fiat settlement. Works with any cart system through our API or pre-built plugins.',
  },
  {
    title: 'SaaS & Subscriptions',
    description:
      'Recurring crypto billing with static wallet addresses. Automatic balance detection handles renewals without friction.',
  },
  {
    title: 'Gaming & Digital Goods',
    description:
      'High-volume, low-value transactions processed instantly. In-game purchases, credits, and digital asset sales at scale.',
  },
  {
    title: 'Marketplaces & Platforms',
    description:
      'Multi-party settlements with automated splits. On-ramp and off-ramp for both buyers and sellers on your platform.',
  },
  {
    title: 'Freelancers & Agencies',
    description:
      'Send invoices with crypto payment links. Clients pay globally without wire fees, you receive settlement in your local currency.',
  },
  {
    title: 'Payroll & Affiliates',
    description:
      'Mass payouts to contractors, affiliates, or employees worldwide. Batch processing via API with full audit trail.',
  },
];

const regions = [
  {
    name: 'Europe',
    methods: ['SEPA', 'SEPA Instant', 'SWIFT', 'Revolut', 'Wise'],
  },
  {
    name: 'Asia-Pacific',
    methods: ['WeChat Pay', 'Alipay', 'UPI', 'PromptPay', 'GrabPay'],
  },
  {
    name: 'Americas',
    methods: ['ACH', 'Wire', 'PIX', 'SPEI', 'Zelle'],
  },
  {
    name: 'Global',
    methods: ['Bank Transfer', 'Cash Deposit', 'International Wire'],
  },
];

const faqs = [
  {
    q: 'How quickly can I start accepting crypto payments?',
    a: 'You can be live within minutes using our no-code invoice links, or within hours using our API. Plugin installations for WooCommerce and Shopify take under 10 minutes.',
  },
  {
    q: 'Do I need KYC or verification to get started?',
    a: 'Basic merchant accounts require minimal verification. Enterprise accounts with higher limits and fiat settlement require standard business verification to comply with local regulations.',
  },
  {
    q: 'How does volatility protection work?',
    a: 'When enabled, incoming crypto payments are instantly converted to your chosen stablecoin (USDT, USDC) or fiat currency at the moment of receipt. You lock in the price your customer paid, eliminating market risk.',
  },
  {
    q: 'What are the fees?',
    a: 'We offer transparent, competitive pricing starting from 0.5% per transaction. No hidden fees, no monthly minimums. Volume-based discounts are available for enterprise clients.',
  },
  {
    q: 'Can I settle directly to my bank account?',
    a: 'Yes. We support direct bank settlement via SEPA, SWIFT, ACH, and local banking rails in 150+ countries. Settlement can be daily, weekly, or on-demand.',
  },
  {
    q: 'Is there a white-label option?',
    a: 'Absolutely. Our white-label solution lets you run the entire payment experience under your own brand, including checkout pages, dashboards, and email notifications, all on your domain.',
  },
];

export default function BusinessPage() {
  return (
    <main className="min-h-screen w-full bg-background">
      <Navbar />

      {/* ━━━━━━━━━━━━━━━━ HERO ━━━━━━━━━━━━━━━━ */}
      <section className="relative w-full min-h-screen pt-32 md:pt-44 pb-48 md:pb-64 overflow-hidden flex items-center">
        <div className="absolute inset-0">
          <OptimizedVideo
            src="/assets/03.mp4"
            className="w-full h-full object-cover"
            priority={true}
            preload="auto"
            autoPlay
            loop
            muted
            playsInline
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background md:hidden" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background hidden md:block" />
        </div>

        <div className="relative z-10 container mx-auto px-6 lg:px-8 max-w-5xl">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 22, delay: 0.1 }}
            className="text-xs tracking-[0.25em] uppercase text-muted-foreground professional-text mb-4"
          >
            Crypto Payment Gateway
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 180, damping: 20, delay: 0.2 }}
            className="text-[2.5rem] md:text-6xl lg:text-7xl heading-text text-foreground leading-[0.95] tracking-[-0.03em] max-w-4xl"
          >
            Accept crypto.
            <br />
            Settle anywhere.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 180, damping: 22, delay: 0.4 }}
            className="mt-6 text-lg md:text-xl text-muted-foreground professional-text leading-relaxed max-w-2xl"
          >
            Start accepting cryptocurrency payments with fast setup and
            transparent low fees. Built for businesses, developers, and
            platforms that move fast.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 22, delay: 0.55 }}
            className="relative z-10 flex flex-col sm:flex-row gap-3 mt-10"
          >
            <a
              href="mailto:hello@cryptocoop.info"
              className="inline-flex items-center gap-2 bg-foreground text-background px-7 py-3.5 rounded-full professional-text font-medium hover:opacity-90 transition-opacity text-sm"
            >
              Get Started
              <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </a>
            <Link
              href="/supported"
              className="inline-flex items-center gap-2 bg-card/80 backdrop-blur-sm border border-border text-foreground px-7 py-3.5 rounded-full professional-text font-medium hover:bg-accent/30 transition-colors text-sm"
            >
              View Supported Countries
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━ STATS ━━━━━━━━━━━━━━━━ */}
      <section className="py-16 md:py-20 border-y border-border">
        <div className="container mx-auto px-6 lg:px-8 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
          >
            <div className="text-center">
              <p className="heading-text text-3xl md:text-4xl text-foreground">
                <CountUp end={150} suffix="+" className="heading-text" />
              </p>
              <p className="text-sm text-muted-foreground professional-text mt-1">
                Countries supported
              </p>
            </div>
            <div className="text-center">
              <p className="heading-text text-3xl md:text-4xl text-foreground">
                <CountUp end={50} suffix="+" className="heading-text" />
              </p>
              <p className="text-sm text-muted-foreground professional-text mt-1">
                Payment methods
              </p>
            </div>
            <div className="text-center">
              <p className="heading-text text-3xl md:text-4xl text-foreground">
                <CountUp end={15} suffix="+" className="heading-text" />
              </p>
              <p className="text-sm text-muted-foreground professional-text mt-1">
                Cryptocurrencies
              </p>
            </div>
            <div className="text-center">
              <p className="heading-text text-3xl md:text-4xl text-foreground">
                24/7
              </p>
              <p className="text-sm text-muted-foreground professional-text mt-1">
                Processing available
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━ ON-RAMP / OFF-RAMP ━━━━━━━━━━━━━━━━ */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6 lg:px-8 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground professional-text mb-3">
              Core Infrastructure
            </p>
            <h2 className="text-3xl md:text-5xl heading-text text-foreground">
              On-Ramp & Off-Ramp
            </h2>
            <p className="mt-5 text-base text-muted-foreground professional-text leading-relaxed max-w-2xl">
              Bridge fiat and crypto seamlessly. Let your customers buy crypto
              with local payment methods, or accept crypto and settle in your
              preferred currency.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-primary/10 to-primary/5 p-8 border border-primary/20 rounded-xl"
            >
              <h3 className="text-xl text-foreground heading-text mb-4">
                Crypto On-Ramp
              </h3>
              <p className="text-[15px] text-muted-foreground professional-text leading-relaxed mb-5">
                Enable customers to purchase cryptocurrency using their
                preferred local payment methods. Seamless conversion from fiat
                to digital assets with instant delivery.
              </p>
              <ul className="space-y-2.5 text-sm text-muted-foreground professional-text">
                {[
                  '50+ local payment methods supported',
                  'Instant cryptocurrency delivery',
                  'Competitive exchange rates',
                  'Embeddable widget for your site',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2
                      className="w-4 h-4 text-primary mt-0.5 flex-shrink-0"
                      strokeWidth={1.5}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-accent/20 to-accent/10 p-8 border border-accent/50 rounded-xl"
            >
              <h3 className="text-xl text-foreground heading-text mb-4">
                Crypto Off-Ramp
              </h3>
              <p className="text-[15px] text-muted-foreground professional-text leading-relaxed mb-5">
                Accept cryptocurrency payments and receive settlement in your
                preferred local currency. Eliminate volatility risk with
                automatic conversion at the moment of receipt.
              </p>
              <ul className="space-y-2.5 text-sm text-muted-foreground professional-text">
                {[
                  'Same-day fiat settlement available',
                  'Direct bank account deposits',
                  'Auto-convert to stablecoins',
                  'Full accounting export',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2
                      className="w-4 h-4 text-foreground/60 mt-0.5 flex-shrink-0"
                      strokeWidth={1.5}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━ PRODUCTS ━━━━━━━━━━━━━━━━ */}
      <section className="py-24 md:py-32 bg-gradient-to-b from-accent/10 to-background">
        <div className="container mx-auto px-6 lg:px-8 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground professional-text mb-3">
              Products
            </p>
            <h2 className="text-3xl md:text-5xl heading-text text-foreground">
              Everything you need to accept crypto
            </h2>
            <p className="mt-5 text-base text-muted-foreground professional-text leading-relaxed max-w-2xl">
              From simple payment links to full white-label solutions, we
              provide the tools to integrate crypto payments at any scale.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map((product, index) => (
              <motion.div
                key={product.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.06 * index }}
                className="bg-card border border-border rounded-xl p-7 hover:border-foreground/15 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/50 flex items-center justify-center mb-5 group-hover:bg-accent/70 transition-colors">
                  <product.icon
                    className="w-5 h-5 text-foreground"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="text-lg heading-text text-foreground mb-2">
                  {product.title}
                </h3>
                <p className="text-sm text-muted-foreground professional-text leading-relaxed mb-4">
                  {product.description}
                </p>
                <ul className="space-y-1.5">
                  {product.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 text-xs text-muted-foreground/80 professional-text"
                    >
                      <div className="w-1 h-1 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━ WHY CHOOSE ━━━━━━━━━━━━━━━━ */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6 lg:px-8 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground professional-text mb-3">
              Why Cryptocoop
            </p>
            <h2 className="text-3xl md:text-5xl heading-text text-foreground">
              Built for reliability and scale
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {whyChoose.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.06 * index }}
                className="p-6"
              >
                <item.icon
                  className="w-5 h-5 text-foreground mb-4"
                  strokeWidth={1.5}
                />
                <h3 className="text-base heading-text text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground professional-text leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━ SUPPORTED COINS ━━━━━━━━━━━━━━━━ */}
      <section className="py-24 md:py-32 bg-gradient-to-b from-accent/10 to-background">
        <div className="container mx-auto px-6 lg:px-8 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground professional-text mb-3">
              Multi-Currency
            </p>
            <h2 className="text-3xl md:text-5xl heading-text text-foreground">
              Supported cryptocurrencies
            </h2>
            <p className="mt-5 text-base text-muted-foreground professional-text leading-relaxed max-w-2xl mx-auto">
              Accept payments in all major cryptocurrencies across multiple
              blockchains. New coins added regularly based on market demand.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-3"
          >
            {supportedCoins.map((coin, i) => (
              <motion.div
                key={coin}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.03 * i }}
                className="bg-card border border-border rounded-full px-5 py-2.5 text-sm professional-text text-foreground hover:border-foreground/20 transition-colors"
              >
                {coin}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━ USE CASES ━━━━━━━━━━━━━━━━ */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6 lg:px-8 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground professional-text mb-3">
              Use Cases
            </p>
            <h2 className="text-3xl md:text-5xl heading-text text-foreground">
              Built for every business model
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {useCases.map((useCase, index) => (
              <motion.div
                key={useCase.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.06 * index }}
                className="bg-accent/20 border border-border rounded-xl p-6"
              >
                <h3 className="text-base heading-text text-foreground mb-2">
                  {useCase.title}
                </h3>
                <p className="text-sm text-muted-foreground professional-text leading-relaxed">
                  {useCase.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━ REGIONAL COVERAGE ━━━━━━━━━━━━━━━━ */}
      <section className="py-24 md:py-32 bg-gradient-to-b from-accent/10 to-background">
        <div className="container mx-auto px-6 lg:px-8 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground professional-text mb-3">
              Global Coverage
            </p>
            <h2 className="text-3xl md:text-5xl heading-text text-foreground">
              Regional payment expertise
            </h2>
            <p className="mt-5 text-base text-muted-foreground professional-text leading-relaxed max-w-2xl">
              Deep integration with local payment systems worldwide. We speak
              the language of every market we serve.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {regions.map((region, idx) => (
              <motion.div
                key={region.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.08 * idx }}
                className="bg-card border border-border rounded-xl p-6"
              >
                <Globe
                  className="w-5 h-5 text-foreground mb-3"
                  strokeWidth={1.5}
                />
                <h3 className="text-base heading-text text-foreground mb-3">
                  {region.name}
                </h3>
                <div className="space-y-1.5">
                  {region.methods.map((method) => (
                    <div
                      key={method}
                      className="flex items-center gap-2 text-sm text-muted-foreground professional-text"
                    >
                      <div className="w-1 h-1 bg-primary rounded-full" />
                      {method}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━ INTEGRATION ━━━━━━━━━━━━━━━━ */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6 lg:px-8 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground professional-text mb-3">
              Integration
            </p>
            <h2 className="text-3xl md:text-5xl heading-text text-foreground">
              Go live in minutes
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                step: '01',
                title: 'Create Account',
                description:
                  'Sign up and get your API keys instantly. No lengthy verification process to start testing.',
              },
              {
                step: '02',
                title: 'Integrate',
                description:
                  'Use our API, plugins, or no-code tools. Full documentation and sandbox environment included.',
              },
              {
                step: '03',
                title: 'Go Live',
                description:
                  'Start accepting crypto payments. Monitor everything in real-time through your dashboard.',
              },
            ].map((item, idx) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * idx }}
                className="relative bg-card border border-border rounded-xl p-7"
              >
                <span className="text-[4rem] heading-text text-foreground/[0.04] absolute top-3 right-5 leading-none select-none pointer-events-none">
                  {item.step}
                </span>
                <h3 className="text-lg heading-text text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground professional-text leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-10 bg-card border border-border rounded-xl p-8"
          >
            <div className="space-y-4 text-[15px] text-muted-foreground professional-text">
              {[
                {
                  label: 'API',
                  text: 'RESTful API with webhooks for real-time transaction updates and full lifecycle management.',
                },
                {
                  label: 'Settlement',
                  text: 'Daily, weekly, or on-demand settlement to your bank account or crypto wallet.',
                },
                {
                  label: 'Security',
                  text: 'Multi-signature wallets, cold storage, and advanced fraud detection protect every transaction.',
                },
                {
                  label: 'Volume',
                  text: 'Scalable infrastructure built for high-volume operations. Enterprise limits available on request.',
                },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <p>
                    <span className="text-foreground font-medium">
                      {item.label}:
                    </span>{' '}
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━ FAQ ━━━━━━━━━━━━━━━━ */}
      <section className="py-24 md:py-32 bg-gradient-to-b from-accent/10 to-background">
        <div className="container mx-auto px-6 lg:px-8 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground professional-text mb-3">
              FAQ
            </p>
            <h2 className="text-3xl md:text-4xl heading-text text-foreground">
              Common questions
            </h2>
          </motion.div>

          <div className="space-y-5">
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 * idx }}
                className="bg-card border border-border rounded-xl p-6"
              >
                <h3 className="text-base heading-text text-foreground mb-2">
                  {faq.q}
                </h3>
                <p className="text-sm text-muted-foreground professional-text leading-relaxed">
                  {faq.a}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━ CTA ━━━━━━━━━━━━━━━━ */}
      <section className="py-24 md:py-36">
        <div className="container mx-auto px-6 lg:px-8 max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl md:text-6xl heading-text text-foreground leading-[0.95]">
              Ready to accept
              <br />
              crypto payments?
            </h2>
            <p className="mt-6 text-base md:text-lg text-muted-foreground professional-text leading-relaxed max-w-xl mx-auto">
              Contact our team to discuss your requirements, volume
              expectations, and integration timeline. We typically go from first
              call to production in under a week.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mt-10">
              <a
                href="mailto:hello@cryptocoop.info"
                className="inline-flex items-center gap-2 bg-foreground text-background px-7 py-3.5 rounded-full professional-text font-medium hover:opacity-90 transition-opacity text-sm"
              >
                Contact Sales
                <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
              </a>
              <Link
                href="/supported"
                className="inline-flex items-center gap-2 bg-card border border-border text-foreground px-7 py-3.5 rounded-full professional-text font-medium hover:bg-accent/30 transition-colors text-sm"
              >
                View Coverage
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
