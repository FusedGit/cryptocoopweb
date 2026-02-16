'use client';

import { motion } from 'framer-motion';
import {
  TrendingUp,
  Shield,
  CheckCircle2,
  ExternalLink,
  Zap,
  ArrowRight,
  Eye,
  Landmark,
  Building2,
} from 'lucide-react';
import Navbar from '@/components/sections/Navbar';
import Footer from '@/components/sections/Footer';
import { CapitalFlow } from '@/components/ui/CapitalFlow';
import OptimizedVideo from '@/components/ui/OptimizedVideo';
import { SparklesText } from '@/components/ui/sparkles-text';
import { CountUp } from '@/components/ui/CountUp';
import { TurnoverGraph } from '@/components/ui/TurnoverGraph';

const executionFlow = [
  {
    step: '01',
    title: 'Capital In',
    copy: 'Your capital is deployed directly into active trading operations — working from day one.',
    icon: Landmark,
  },
  {
    step: '02',
    title: 'Trade Deployment',
    copy: 'Funds fuel high-frequency spread capture, OTC arbitrage, and P2P liquidity across global markets.',
    icon: Zap,
  },
  {
    step: '03',
    title: 'Yield Distribution',
    copy: 'Returns are tracked in real-time through your investor portal and distributed on schedule.',
    icon: CheckCircle2,
  },
];

export default function InvestorsPage() {
  return (
    <main className="min-h-screen w-full bg-background overflow-x-hidden">
      <Navbar />

      {/* ━━━━━━━━━━━━━━━━ HERO ━━━━━━━━━━━━━━━━ */}
      <section className="relative pt-28 pb-6 md:pt-36 md:pb-10 overflow-hidden">
        <div className="relative z-10 container mx-auto px-6 lg:px-8">
          {/* Headline */}
          <div className="text-center max-w-5xl mx-auto">
            <h1 className="text-[2.75rem] md:text-7xl lg:text-[5.5rem] heading-text text-foreground leading-[0.95] tracking-[-0.03em]">
              Liquidity-backed yield
              <br />
              from real trading
            </h1>
            <p className="mt-7 text-lg md:text-xl text-muted-foreground professional-text leading-relaxed max-w-2xl mx-auto">
              Your capital powers active trading operations across global crypto
              markets — generating consistent, performance-backed returns with
              full transparency.
            </p>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mt-10">
            <a
              href="https://s.craft.me/SOyTD5nduCQ9Vv"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-foreground text-background px-7 py-3.5 rounded-full professional-text font-medium hover:opacity-90 transition-opacity text-sm"
            >
              View Documentation
              <ExternalLink className="w-4 h-4" strokeWidth={1.5} />
            </a>
            <a
              href="https://t.me/cryptocoop2024"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-card border border-border text-foreground px-7 py-3.5 rounded-full professional-text font-medium hover:bg-accent/30 transition-colors text-sm"
            >
              Speak with Team
              <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </a>
          </div>

          {/* Video showcase */}
          <div className="-mt-4 mx-auto max-w-4xl">
            <div className="relative rounded-2xl overflow-hidden mix-blend-multiply -mb-20">
              <OptimizedVideo
                src="/assets/12.mp4"
                className="w-full aspect-video object-cover scale-110"
                priority={true}
                preload="auto"
                autoPlay
                loop
                muted
                playsInline
              />
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━ APY SHOWCASE ━━━━━━━━━━━━━━━━ */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6 lg:px-8 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground professional-text mb-3">
              Target Returns
            </p>
            <h2 className="text-3xl md:text-4xl heading-text text-foreground">
              Performance-backed yield
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="group relative rounded-2xl border border-primary/15 bg-gradient-to-br from-accent/15 via-card to-card p-10 md:p-14 text-center transition-colors hover:border-primary/30"
          >
            <SparklesText
              className="heading-text text-8xl md:text-[9rem] text-foreground leading-none"
              sparklesCount={18}
              sparkleDuration={3}
              colors={{ first: '#9E7AFF', second: '#FE8BBB' }}
            >
              <CountUp end={60} suffix="%" className="heading-text" />
            </SparklesText>
            <p className="text-lg text-muted-foreground professional-text mt-4">
              Target APY
            </p>
            <div className="mt-8 pt-6 border-t border-border max-w-md mx-auto">
              <p className="text-sm text-muted-foreground professional-text leading-relaxed">
                Maximum yield for committed capital partners. Deeper deployment
                generates higher, more consistent returns backed by real
                execution.
              </p>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-8 text-center text-sm text-muted-foreground/70 professional-text"
          >
            Example: $500K deployed targets $300K yield, with live reporting in
            your investor panel.
          </motion.p>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━ HOW YIELD IS GENERATED ━━━━━━━━━━━━━━━━ */}
      <section className="py-24 md:py-32 bg-gradient-to-b from-accent/10 to-background">
        <div className="container mx-auto px-6 lg:px-8 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground professional-text mb-3">
              The Model
            </p>
            <h2 className="text-3xl md:text-5xl heading-text text-foreground max-w-xl">
              How your capital generates yield
            </h2>
            <p className="mt-5 text-base text-muted-foreground professional-text leading-relaxed max-w-2xl">
              Every dollar deployed works as active trading liquidity. Returns
              come from real execution and spread capture across live markets.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5 mb-14">
            {executionFlow.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="relative bg-card border border-border rounded-xl p-7 hover:border-primary/15 transition-colors"
              >
                <span className="text-[4rem] heading-text text-foreground/[0.04] absolute top-3 right-5 leading-none select-none pointer-events-none">
                  {item.step}
                </span>
                <div className="w-10 h-10 rounded-lg bg-accent/50 flex items-center justify-center mb-5">
                  <item.icon
                    className="w-5 h-5 text-foreground"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="text-lg heading-text text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground professional-text leading-relaxed">
                  {item.copy}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <CapitalFlow />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 space-y-3 text-sm text-muted-foreground professional-text leading-relaxed max-w-3xl"
          >
            <p>
              Active since 2018 with a verified high-volume track record across
              LocalCoinSwap, AgoraDesk, and LocalMonero.
            </p>
            <p>
              Built for investors who want direct exposure to crypto execution
              economics — backed by operational performance, not promises.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━ GROWTH TRAJECTORY ━━━━━━━━━━━━━━━━ */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6 lg:px-8 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground professional-text mb-3">
              Growth
            </p>
            <h2 className="text-3xl md:text-5xl heading-text text-foreground">
              Scaling through execution
            </h2>
            <p className="mt-5 text-base text-muted-foreground professional-text leading-relaxed max-w-2xl mx-auto">
              From $2M to a projected $40M in annual turnover — growth driven
              entirely by operational expansion and compounding market presence.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <TurnoverGraph />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 rounded-xl border border-accent/40 bg-accent/10 p-6 text-center"
          >
            <p className="text-sm professional-text text-foreground">
              2026 target:{' '}
              <span className="heading-text text-xl">
                $<CountUp end={40} className="heading-text" />M annual turnover
              </span>{' '}
              — expansion driven by a major product launch currently under NDA.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━ INVESTOR PORTAL ━━━━━━━━━━━━━━━━ */}
      <section className="py-24 md:py-32 bg-gradient-to-b from-background via-accent/5 to-background">
        <div className="container mx-auto px-6 lg:px-8 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground professional-text mb-3">
              Portal
            </p>
            <h2 className="text-3xl md:text-5xl heading-text text-foreground">
              Full visibility, always
            </h2>
            <p className="mt-5 text-base text-muted-foreground professional-text leading-relaxed max-w-2xl">
              Your private investor dashboard gives you real-time insight into
              how your capital is working — allocation, payouts, and performance
              at a glance.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: 'Stake Overview',
                icon: Eye,
                copy: 'Principal, lock duration, and current status.',
              },
              {
                title: 'Capital Activity',
                icon: TrendingUp,
                copy: 'How your liquidity is deployed across operations.',
              },
              {
                title: 'Payout Tracking',
                icon: CheckCircle2,
                copy: 'Distribution timeline and payment confirmations.',
              },
              {
                title: 'Security Layer',
                icon: Shield,
                copy: 'Access logs, account controls, and policy safeguards.',
              },
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.08 * idx }}
                className="group bg-card border border-border rounded-xl p-6 hover:border-primary/15 transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-accent/40 flex items-center justify-center mb-4 group-hover:bg-accent/60 transition-colors">
                  <item.icon
                    className="w-4 h-4 text-foreground"
                    strokeWidth={1.5}
                  />
                </div>
                <p className="text-sm heading-text text-foreground mb-1.5">
                  {item.title}
                </p>
                <p className="text-xs text-muted-foreground professional-text leading-relaxed">
                  {item.copy}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━ TRUST & VERIFICATION ━━━━━━━━━━━━━━━━ */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6 lg:px-8 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground professional-text mb-3">
              Trust & Verification
            </p>
            <h2 className="text-3xl md:text-5xl heading-text text-foreground">
              Proof of operations
            </h2>
          </motion.div>

          {/* Animated trust stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-3 gap-5 mb-14"
          >
            <div className="text-center">
              <p className="heading-text text-4xl md:text-5xl text-foreground">
                <CountUp end={500} suffix="+" className="heading-text" />
              </p>
              <p className="text-sm text-muted-foreground professional-text mt-2">
                BTC tracked on-chain
              </p>
            </div>
            <div className="text-center">
              <p className="heading-text text-4xl md:text-5xl text-foreground">
                <CountUp end={2018} duration={1500} className="heading-text" />
              </p>
              <p className="text-sm text-muted-foreground professional-text mt-2">
                Operating since
              </p>
            </div>
            <div className="text-center">
              <p className="heading-text text-4xl md:text-5xl text-foreground">
                <CountUp end={3} suffix="+" className="heading-text" />
              </p>
              <p className="text-sm text-muted-foreground professional-text mt-2">
                Trading platforms
              </p>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-6">
            {/* Trust signals */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3 space-y-4"
            >
              {[
                'Verified trading history across LocalCoinSwap, AgoraDesk, and LocalMonero since 2018.',
                'Public profile rankings independently verifiable — full track record, not curated highlights.',
                'Institutional-grade wallet with 500+ BTC in tracked liquidity as a proof of capital depth.',
                'Growth funded entirely through operational revenue and aligned angel partnerships.',
              ].map((text, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.08 * idx }}
                  className="flex gap-3 items-start"
                >
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-foreground/25 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground professional-text leading-relaxed">
                    {text}
                  </p>
                </motion.div>
              ))}

              <a
                href="https://localcoinswap.com/profile/cryptocoop"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors professional-text font-medium pt-2"
              >
                Verify public trading profile
                <ExternalLink className="w-3.5 h-3.5" strokeWidth={1.5} />
              </a>
            </motion.div>

            {/* Corporate imprint */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2 bg-card border border-border rounded-xl p-7"
            >
              <div className="flex items-center gap-2.5 mb-5">
                <Building2
                  className="w-4 h-4 text-foreground"
                  strokeWidth={1.5}
                />
                <p className="text-sm heading-text text-foreground">
                  Corporate Imprint
                </p>
              </div>
              <ul className="space-y-3 text-sm text-muted-foreground professional-text">
                {[
                  'Registered UK entity with cross-jurisdiction operations.',
                  'Multi-market execution footprint (EU, UK, APAC).',
                  'Full documentation available under NDA for due diligence.',
                  'Structured onboarding for strategic partners.',
                ].map((text, idx) => (
                  <li key={idx} className="flex gap-2.5 items-start">
                    <div className="mt-2 w-1 h-1 rounded-full bg-muted-foreground/40 flex-shrink-0" />
                    {text}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <p className="mt-10 text-xs text-muted-foreground/50 professional-text">
            APY values represent target returns based on current execution model
            and are not a guaranteed outcome.
          </p>
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
              Become a strategic
              <br />
              liquidity partner
            </h2>
            <p className="mt-6 text-base md:text-lg text-muted-foreground professional-text leading-relaxed max-w-xl mx-auto">
              We&apos;re scaling aggressively in 2026 and selectively
              onboarding investors aligned with long-term, execution-driven
              growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mt-10">
              <a
                href="https://s.craft.me/SOyTD5nduCQ9Vv"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-foreground text-background px-7 py-3.5 rounded-full professional-text font-medium hover:opacity-90 transition-opacity text-sm"
              >
                <ExternalLink className="w-4 h-4" strokeWidth={1.5} />
                View Complete Documentation
              </a>
              <a
                href="https://t.me/cryptocoop2024"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-card border border-border text-foreground px-7 py-3.5 rounded-full professional-text font-medium hover:bg-accent/30 transition-colors text-sm"
              >
                Speak with Investment Team
                <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
