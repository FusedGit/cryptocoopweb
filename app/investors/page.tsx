'use client';

import { motion } from 'framer-motion';
import {
  TrendingUp,
  Shield,
  CheckCircle2,
  ExternalLink,
  BarChart3,
  Zap,
  ArrowRight,
  Lock,
  Eye,
  Landmark,
  BadgeCheck,
  Building2,
} from 'lucide-react';
import Navbar from '@/components/sections/Navbar';
import Footer from '@/components/sections/Footer';
import { GrowthChart } from '@/components/ui/GrowthChart';
import { ProjectionChart } from '@/components/ui/ProjectionChart';
import { PerformanceMetrics } from '@/components/ui/PerformanceMetrics';
import { ROIComparison } from '@/components/ui/ROIComparison';
import { CapitalFlow } from '@/components/ui/CapitalFlow';

const lockupOptions = [
  {
    title: '12-Month Lock',
    apy: '60%',
    copy: 'For long-term capital partners who want maximum annualized yield.',
    emphasis: true,
  },
  {
    title: '6-Month Lock',
    apy: '30%',
    copy: 'For mid-term allocation with strong upside and lower lock duration.',
  },
  {
    title: '3-Month Lock',
    apy: '10%',
    copy: 'For short-term strategic capital with faster liquidity cycle.',
  },
];

const executionFlow = [
  {
    title: 'Capital In',
    copy: 'Angel investor capital is allocated into active liquidity operations, not idle reserves.',
    icon: Landmark,
  },
  {
    title: 'Trade Deployment',
    copy: 'Funds are used as working liquidity for high-frequency, spread-capture, and OTC/P2P execution.',
    icon: Zap,
  },
  {
    title: 'Yield Distribution',
    copy: 'Performance is tracked in the investor portal and paid according to your selected lock term.',
    icon: CheckCircle2,
  },
];

export default function InvestorsPage() {
  return (
    <main className="min-h-screen w-full bg-background">
      <Navbar />
      
      <section className="container mx-auto px-6 lg:px-8 pt-32 pb-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-6xl mx-auto"
        >
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="relative overflow-hidden bg-gradient-to-br from-primary/15 via-primary/10 to-accent/10 p-10 md:p-14 border border-primary/20 rounded-2xl refined-shadow mb-12"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 100, damping: 16, delay: 0.2 }}
              className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-primary/15 blur-3xl"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 100, damping: 16, delay: 0.28 }}
              className="absolute -bottom-24 -left-20 w-64 h-64 rounded-full bg-foreground/10 blur-3xl"
            />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-background/60 border border-border mb-6">
                <BadgeCheck className="w-4 h-4 text-primary" />
                <span className="text-xs md:text-sm text-foreground professional-text font-medium">
                  Built for serious angel capital, not VC dependency
                </span>
              </div>

              <div className="grid lg:grid-cols-2 gap-10 items-end">
                <div>
                  <h1 className="text-3xl md:text-5xl lg:text-6xl text-foreground heading-text leading-tight">
                    Liquidity-backed yield from real trading operations
                  </h1>
                  <p className="mt-5 text-base md:text-lg text-muted-foreground professional-text leading-relaxed max-w-2xl">
                    We deploy investor capital as active liquidity across our trading stack. No VC runway model. No burn model. Just operational execution and transparent reporting.
                  </p>
                </div>
                <div className="bg-background/80 border border-border rounded-xl p-6">
                  <p className="text-sm text-muted-foreground professional-text mb-1">Lock Duration</p>
                  <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: 'spring', stiffness: 140, damping: 18, delay: 0.3 }}
                    className="text-6xl md:text-7xl text-foreground heading-text tracking-tight"
                  >
                    60% APY
                  </motion.p>
                  <p className="text-sm text-muted-foreground professional-text mt-2">12-month lock of capital</p>
                  <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded-lg border border-border bg-card p-3">
                      <p className="text-muted-foreground professional-text">6 months</p>
                      <p className="text-2xl text-foreground heading-text">30%</p>
                    </div>
                    <div className="rounded-lg border border-border bg-card p-3">
                      <p className="text-muted-foreground professional-text">3 months</p>
                      <p className="text-2xl text-foreground heading-text">10%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* How Returns Are Generated */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card p-10 md:p-12 border border-border rounded-xl refined-shadow mb-12"
          >
            <h2 className="text-2xl md:text-3xl text-foreground mb-4 heading-text flex items-center gap-3">
              <TrendingUp className="w-7 h-7" strokeWidth={1.5} />
              How We Generate Investor Yield
            </h2>
            <p className="text-[15px] text-muted-foreground professional-text leading-relaxed mb-8 max-w-3xl">
              Cryptocoop uses investor funds as operational liquidity for active trading. Returns are derived from execution and spread capture, not speculative fundraising cycles.
            </p>

            <div className="grid md:grid-cols-3 gap-5 mb-10">
              {executionFlow.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 110, damping: 17, delay: 0.08 * index }}
                  className="bg-background border border-border rounded-xl p-6"
                >
                  <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center mb-4">
                    <item.icon className="w-5 h-5 text-foreground" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg text-foreground heading-text mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground professional-text leading-relaxed">{item.copy}</p>
                </motion.div>
              ))}
            </div>

            <div className="mb-10">
              <CapitalFlow />
            </div>

            <div className="space-y-4 text-[15px] text-muted-foreground leading-relaxed professional-text">
              <p>
                We have operated in this market cycle since 2018, with high-volume track record and platform history across LocalCoinSwap, AgoraDesk, and LocalMonero.
              </p>
              <p>
                This structure is specifically designed for angel investors who want exposure to crypto execution economics without relying on VC-style dilution or long product burn.
              </p>
            </div>
          </motion.div>

          {/* Lock-up Terms */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-primary/10 to-primary/5 p-10 md:p-12 border border-primary/20 rounded-xl mb-12"
          >
            <h2 className="text-2xl md:text-3xl text-foreground mb-4 heading-text flex items-center gap-3">
              <Lock className="w-7 h-7" strokeWidth={1.5} />
              Lock-up Terms & Target APY
            </h2>
            <p className="text-[15px] text-foreground/90 professional-text leading-relaxed mb-8 max-w-3xl">
              We align return profile with commitment horizon. Longer lock duration enables deeper capital deployment and higher yield potential.
            </p>

            <div className="grid md:grid-cols-3 gap-5">
              {lockupOptions.map((option, index) => (
                <motion.div
                  key={option.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 120, damping: 16, delay: 0.08 * index }}
                  className={`rounded-xl border p-6 ${
                    option.emphasis
                      ? 'bg-background border-primary/35'
                      : 'bg-background/70 border-border'
                  }`}
                >
                  <p className="text-sm text-muted-foreground professional-text">{option.title}</p>
                  <p className="text-5xl text-foreground heading-text mt-2">{option.apy}</p>
                  <p className="text-sm text-muted-foreground professional-text mt-2">Target APY</p>
                  <p className="text-sm text-muted-foreground professional-text mt-4 leading-relaxed">{option.copy}</p>
                </motion.div>
              ))}
            </div>

            <p className="mt-8 text-sm text-foreground/80 professional-text">
              Example projection: $500,000 at 12-month lock targets $300,000 yield, with reporting visibility in your investor panel.
            </p>
          </motion.div>

          {/* Performance, Scale, and Transparency */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-card p-10 md:p-12 border border-border rounded-xl refined-shadow mb-12"
          >
            <h2 className="text-2xl md:text-3xl text-foreground mb-6 heading-text flex items-center gap-3">
              <BarChart3 className="w-7 h-7" strokeWidth={1.5} />
              2026 Scale Trajectory
            </h2>
            <div className="grid lg:grid-cols-2 gap-10 mb-10">
              <div>
                <h3 className="text-lg text-foreground heading-text mb-5">Historical Growth</h3>
                <GrowthChart />
              </div>
              <div>
                <h3 className="text-lg text-foreground heading-text mb-5">Forward Projection</h3>
                <ProjectionChart />
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-10">
              <div>
                <h3 className="text-lg text-foreground heading-text mb-5">Performance Indicators</h3>
                <PerformanceMetrics />
              </div>
              <div>
                <h3 className="text-lg text-foreground heading-text mb-5">Yield Comparison</h3>
                <ROIComparison />
              </div>
            </div>

            <div className="mt-8 bg-accent/20 border border-border rounded-xl p-6">
              <p className="text-sm text-foreground professional-text font-medium">
                2026 projection: <span className="heading-text text-lg">$40M turnover</span> with expansion acceleration from a major product launch currently under NDA.
              </p>
            </div>
          </motion.div>

          {/* Investor Portal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-card p-10 md:p-12 border border-border rounded-xl refined-shadow mb-12"
          >
            <h2 className="text-2xl md:text-3xl text-foreground mb-6 heading-text">
              Investor Portal Visibility
            </h2>
            <p className="text-[15px] text-muted-foreground professional-text leading-relaxed mb-8 max-w-3xl">
              Every investor gets access to a private panel to monitor allocation, payout status, lock period, and performance snapshots.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: 'Stake Overview', icon: Eye, copy: 'Principal, selected lock duration, and current status.' },
                { title: 'Capital Activity', icon: TrendingUp, copy: 'How your liquidity is being deployed across operations.' },
                { title: 'Payout Tracking', icon: CheckCircle2, copy: 'Distribution timeline and payment confirmations.' },
                { title: 'Security Layer', icon: Shield, copy: 'Access logs, account controls, and policy safeguards.' },
              ].map((item, idx) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 110, damping: 17, delay: 0.08 * idx }}
                  className="bg-background border border-border rounded-lg p-5"
                >
                  <item.icon className="w-5 h-5 text-foreground mb-3" strokeWidth={1.5} />
                  <p className="text-sm text-foreground professional-text font-medium mb-2">{item.title}</p>
                  <p className="text-xs text-muted-foreground professional-text leading-relaxed">{item.copy}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Trust Proof + Imprint */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-gradient-to-br from-accent/20 to-accent/10 p-10 md:p-12 border border-accent/50 rounded-xl mb-12"
          >
            <h2 className="text-2xl md:text-3xl text-foreground mb-6 heading-text">
              Trust, Proof, and Imprint
            </h2>
            <div className="grid lg:grid-cols-2 gap-10">
              <div className="space-y-4 text-[15px] text-muted-foreground professional-text leading-relaxed">
                <p className="text-foreground font-medium">Operational confidence signals:</p>
                <ul className="space-y-2">
                  <li>• Trading history across LocalCoinSwap, AgoraDesk, and LocalMonero dating back to 2018.</li>
                  <li>• Public profile credibility and ranking history available for independent verification.</li>
                  <li>• Example institutional wallet profile with over 500 BTC tracked as liquidity proof point.</li>
                  <li>• No VC dependency; growth funded through operations and aligned angel capital.</li>
                </ul>
                <a
                  href="https://localcoinswap.com/profile/cryptocoop"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors professional-text font-medium"
                >
                  Verify public trading profile
                  <ExternalLink className="w-4 h-4" strokeWidth={1.5} />
                </a>
              </div>
              <div className="bg-background border border-border rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Building2 className="w-5 h-5 text-foreground" strokeWidth={1.5} />
                  <p className="text-base text-foreground heading-text">Corporate Imprint</p>
                </div>
                <ul className="space-y-3 text-sm text-muted-foreground professional-text">
                  <li>• Registered UK entity with cross-jurisdiction operations.</li>
                  <li>• Multi-market execution footprint (EU, UK, APAC corridors).</li>
                  <li>• Investor documentation available under NDA for due diligence.</li>
                  <li>• Structured onboarding and compliance checks for strategic partners.</li>
                </ul>
              </div>
            </div>
            <div className="mt-6">
              <p className="text-xs text-muted-foreground professional-text">
                Note: APY values represent target returns based on current execution model and are not a guaranteed outcome.
              </p>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center space-y-8"
          >
            <div className="max-w-2xl mx-auto">
              <h3 className="text-xl md:text-2xl text-foreground heading-text mb-4">
                Become a strategic liquidity partner
              </h3>
              <p className="text-[15px] text-muted-foreground professional-text leading-relaxed">
                We are scaling aggressively in 2026 and selectively onboarding angel investors aligned with long-term execution.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="https://s.craft.me/SOyTD5nduCQ9Vv"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-md professional-text font-medium hover:opacity-90 transition-opacity elevated-shadow"
              >
                <ExternalLink className="w-4 h-4" strokeWidth={1.5} />
                View Complete Documentation
              </a>
              <a 
                href="https://t.me/cryptocoop2024"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white border border-border text-foreground px-6 py-3 rounded-md professional-text font-medium hover:bg-accent/30 transition-colors"
              >
                Speak with Investment Team
                <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
              </a>
            </div>
          </motion.div>
        </motion.div>
      </section>
      
      <Footer />
    </main>
  );
}
