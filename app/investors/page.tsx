'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { TrendingUp, Shield, CheckCircle2, ExternalLink, BarChart3, Zap, ArrowRight } from 'lucide-react';
import Navbar from '@/components/sections/Navbar';
import Footer from '@/components/sections/Footer';
import { GrowthChart } from '@/components/ui/GrowthChart';
import { ProjectionChart } from '@/components/ui/ProjectionChart';
import { PerformanceMetrics } from '@/components/ui/PerformanceMetrics';
import { ROIComparison } from '@/components/ui/ROIComparison';
import { CapitalFlow } from '@/components/ui/CapitalFlow';

export default function InvestorsPage() {
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
            <h1 className="text-3xl md:text-4xl lg:text-5xl text-foreground mb-5 heading-text">
              Investment Overview
            </h1>
            <p className="text-lg text-muted-foreground professional-text max-w-2xl">
              Proven trading operations with verifiable performance metrics
            </p>
          </div>

          {/* Executive Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card p-10 md:p-12 border border-border rounded-lg refined-shadow mb-12"
          >
            <h2 className="text-2xl md:text-3xl text-foreground mb-6 heading-text">
              Performance Summary
            </h2>
            <div className="space-y-5 text-[15px] text-muted-foreground leading-relaxed professional-text">
              <p>
                Cryptocoop maintains the #1 ranking on LocalCoinSwap's leaderboard, operating a validated P2P trading model with 80x revenue growth from 2020 to 2025 achieved through organic expansion.
              </p>
              <p>
                We are engaging with strategic partners to expand our trading operations and accelerate growth trajectory.
              </p>
            </div>

            <div className="mt-10">
              <PerformanceMetrics />
            </div>

            <p className="mt-8 text-center text-sm text-muted-foreground professional-text">
              UK-registered company, operational since 2018
            </p>
          </motion.div>

          {/* Capital Deployment */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-primary/10 to-primary/5 p-10 md:p-12 border border-primary/20 rounded-lg mb-12"
          >
            <h2 className="text-2xl md:text-3xl text-foreground mb-6 heading-text flex items-center gap-3">
              <Zap className="w-7 h-7" strokeWidth={1.5} />
              Capital Deployment Model
            </h2>
            <div className="space-y-5 text-[15px] text-foreground/90 leading-relaxed professional-text mb-8">
              <p>
                Our operational model follows a direct capital-to-revenue pathway: invested capital deploys immediately into high-velocity trades with a 30-day revenue cycle.
              </p>
              <p>
                This eliminates traditional startup risks associated with R&D timelines or product-market fit uncertainty. We're scaling proven operations, not developing new products.
              </p>
            </div>
            
            <CapitalFlow />
          </motion.div>

          {/* Track Record with Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-card p-10 md:p-12 border border-border rounded-lg refined-shadow mb-12"
          >
            <h2 className="text-2xl md:text-3xl text-foreground mb-8 heading-text flex items-center gap-3">
              <BarChart3 className="w-7 h-7" strokeWidth={1.5} />
              Historical Performance & Projections
            </h2>
            
            <div className="mb-10">
              <GrowthChart />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm professional-text">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-2 font-medium text-foreground">Year</th>
                    <th className="text-right py-3 px-2 font-medium text-foreground">Turnover</th>
                    <th className="text-right py-3 px-2 font-medium text-foreground">Net Profit</th>
                    <th className="text-right py-3 px-2 font-medium text-foreground">Capital</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-2">2020</td>
                    <td className="text-right py-3 px-2">$300K</td>
                    <td className="text-right py-3 px-2">$5.2K</td>
                    <td className="text-right py-3 px-2">$20K</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-2">2021</td>
                    <td className="text-right py-3 px-2">$1M</td>
                    <td className="text-right py-3 px-2">$23K</td>
                    <td className="text-right py-3 px-2">$28K</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-2">2022</td>
                    <td className="text-right py-3 px-2">$3M</td>
                    <td className="text-right py-3 px-2">$111K</td>
                    <td className="text-right py-3 px-2">$49K</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-2">2023</td>
                    <td className="text-right py-3 px-2">$8M</td>
                    <td className="text-right py-3 px-2">$303K</td>
                    <td className="text-right py-3 px-2">$90K</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-2">2024</td>
                    <td className="text-right py-3 px-2">$13M</td>
                    <td className="text-right py-3 px-2">$498K</td>
                    <td className="text-right py-3 px-2">$120K</td>
                  </tr>
                  <tr className="border-b border-border/50 bg-accent/20">
                    <td className="py-3 px-2 font-medium text-foreground">2025</td>
                    <td className="text-right py-3 px-2 font-medium text-foreground">$15M</td>
                    <td className="text-right py-3 px-2 font-medium text-foreground">$575K</td>
                    <td className="text-right py-3 px-2 font-medium text-foreground">$100K</td>
                  </tr>
                  <tr className="bg-primary/5">
                    <td className="py-3 px-2 font-medium text-foreground">2026 (projected)</td>
                    <td className="text-right py-3 px-2 font-medium text-foreground">$24M</td>
                    <td className="text-right py-3 px-2 font-medium text-foreground">$924K</td>
                    <td className="text-right py-3 px-2 font-medium text-foreground">$454K</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-8 text-center text-sm text-muted-foreground professional-text">
              Growth trajectory constrained by capital availability rather than market capacity or operational limitations
            </p>
          </motion.div>

          {/* Investment Tiers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-card p-10 md:p-12 border border-border rounded-lg refined-shadow mb-12"
          >
            <h2 className="text-2xl md:text-3xl text-foreground mb-4 heading-text">
              Investment Structure & ROI Projections
            </h2>
            <p className="text-[15px] text-muted-foreground professional-text mb-10 leading-relaxed max-w-3xl">
              Investment scales operations proportionally. Higher capital deployment enables greater trade volume and corresponding profit generation.
            </p>

            <div className="grid lg:grid-cols-2 gap-10 mb-12">
              <div>
                <h3 className="text-lg text-foreground heading-text mb-6">Investment Tiers Comparison</h3>
                <ProjectionChart />
              </div>
              <div>
                <h3 className="text-lg text-foreground heading-text mb-6">ROI Performance</h3>
                <ROIComparison />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { tier: 'Tier 1', amount: '$200K', roi: '60%', returns: '$120K', turnover: '$24M' },
                { tier: 'Tier 2', amount: '$500K', roi: '50%', returns: '$250K', turnover: '$45M', recommended: true },
                { tier: 'Tier 3', amount: '$1M', roi: '45%', returns: '$450K', turnover: '$72M' },
              ].map((tier) => (
                <div
                  key={tier.tier}
                  className={`${
                    tier.recommended 
                      ? 'bg-accent/10 border-2 border-primary/30' 
                      : 'bg-background border border-border'
                  } rounded-lg p-8 hover:border-foreground/20 transition-colors relative`}
                >
                  {tier.recommended && (
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-primary px-3 py-1 rounded-full">
                      <span className="text-xs text-white professional-text font-medium">Recommended</span>
                    </div>
                  )}
                  <div className="mb-6">
                    <p className="text-xs text-muted-foreground professional-text mb-3">{tier.tier}</p>
                    <p className="text-4xl text-foreground mb-2 heading-text">{tier.amount}</p>
                    <p className="text-sm text-muted-foreground professional-text">Investment</p>
                  </div>
                  <div className="space-y-4 text-center">
                    <div className="border-t border-border pt-4">
                      <p className="text-2xl text-foreground heading-text">{tier.roi}</p>
                      <p className="text-xs text-muted-foreground professional-text">1-Year ROI</p>
                    </div>
                    <div className="bg-accent/30 p-4 rounded-lg">
                      <p className="text-lg text-foreground heading-text">{tier.returns}</p>
                      <p className="text-xs text-muted-foreground professional-text">Projected Profit Share</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground professional-text mb-1">2026 Turnover:</p>
                      <p className="text-xl text-foreground heading-text">{tier.turnover}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-8 text-center text-sm text-muted-foreground professional-text">
              Quarterly distribution schedule begins Q2 2026
            </p>
          </motion.div>

          {/* Why Invest */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-card p-10 md:p-12 border border-border rounded-lg refined-shadow mb-12"
          >
            <h2 className="text-2xl md:text-3xl text-foreground mb-10 heading-text text-center">
              Investment Characteristics
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-foreground/60 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                  <div>
                    <h3 className="text-base text-foreground heading-text mb-1">Verifiable Performance</h3>
                    <p className="text-sm text-muted-foreground professional-text leading-relaxed">
                      #1 ranking on LocalCoinSwap with publicly accessible metrics and real-time verification
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-foreground/60 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                  <div>
                    <h3 className="text-base text-foreground heading-text mb-1">Rapid Deployment</h3>
                    <p className="text-sm text-muted-foreground professional-text leading-relaxed">
                      Capital allocates to active trading within days, with revenue generation commencing within 30 days
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-foreground/60 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                  <div>
                    <h3 className="text-base text-foreground heading-text mb-1">Linear Scalability</h3>
                    <p className="text-sm text-muted-foreground professional-text leading-relaxed">
                      Direct correlation between invested capital and trading volume, enabling predictable growth projections
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-foreground/60 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                  <div>
                    <h3 className="text-base text-foreground heading-text mb-1">Consistent Returns</h3>
                    <p className="text-sm text-muted-foreground professional-text leading-relaxed">
                      Quarterly distributions maintained regardless of short-term market fluctuations
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Verification */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-gradient-to-br from-accent/20 to-accent/10 p-10 md:p-12 border border-accent/50 rounded-lg mb-12"
          >
            <h2 className="text-2xl md:text-3xl text-foreground mb-4 heading-text text-center">
              Performance Verification
            </h2>
            <p className="text-[15px] text-center text-muted-foreground professional-text leading-relaxed mb-8 max-w-2xl mx-auto">
              All trading metrics, volume data, and performance rankings are publicly accessible for independent verification.
            </p>
            <div className="flex justify-center">
              <a
                href="https://localcoinswap.com/profile/cryptocoop"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-md professional-text font-medium hover:opacity-90 transition-opacity elevated-shadow"
              >
                <ExternalLink className="w-4 h-4" strokeWidth={1.5} />
                View Trading Profile
              </a>
            </div>
          </motion.div>

          {/* Platform Expansion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-card p-10 md:p-12 border border-border rounded-lg refined-shadow mb-12"
          >
            <h2 className="text-2xl md:text-3xl text-foreground mb-6 heading-text">
              Platform Strategy
            </h2>
            <div className="space-y-5 text-[15px] text-muted-foreground leading-relaxed professional-text mb-8">
              <p>
                Our operations have expanded beyond LocalCoinSwap with the launch of a native Telegram trading application, broadening market access and user acquisition channels.
              </p>
              <p>
                We maintain ongoing discussions with Telegram regarding platform integration opportunities and scaling partnerships.
              </p>
            </div>
            <div className="bg-accent/20 p-6 rounded-lg">
              <p className="text-center text-sm text-foreground professional-text font-medium mb-4">Multi-Platform Presence</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-card p-4 rounded-lg border border-border text-center">
                  <p className="text-foreground professional-text font-medium mb-1">LocalCoinSwap</p>
                  <p className="text-sm text-muted-foreground professional-text">#1 Ranked Trader</p>
                </div>
                <div className="bg-card p-4 rounded-lg border border-border text-center">
                  <p className="text-foreground professional-text font-medium mb-1">Telegram</p>
                  <p className="text-sm text-muted-foreground professional-text">Native Application</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Investment Terms */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="bg-gradient-to-br from-primary/10 to-primary/5 p-10 md:p-12 border border-primary/20 rounded-lg mb-12"
          >
            <h2 className="text-2xl md:text-3xl text-foreground mb-6 heading-text">
              Investment Parameters
            </h2>
            <div className="space-y-5 text-[15px] text-foreground/90 leading-relaxed professional-text mb-8">
              <p>
                Current fundraising target: $200K - $1M from 4-6 strategic partners
              </p>
              <p className="font-medium">Allocation objectives:</p>
              <ul className="space-y-2 pl-6">
                <li>• Expand trading capital for increased volume execution</li>
                <li>• Scale operations to $24M-$72M annual turnover</li>
                <li>• Deliver 45-60% ROI through quarterly distributions beginning Q2 2026</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg border border-primary/20">
              <p className="text-sm text-foreground professional-text font-medium mb-4">Key Terms</p>
              <ul className="space-y-2 text-sm text-muted-foreground professional-text">
                <li>• Profit-sharing structure (detailed terms available upon request)</li>
                <li>• Quarterly distribution schedule</li>
                <li>• Wire transfer settlement within 30 days of commitment</li>
                <li>• Initial distribution: Q2 2026</li>
              </ul>
            </div>
          </motion.div>

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="bg-card p-10 md:p-12 border border-border rounded-lg refined-shadow mb-12"
          >
            <h2 className="text-2xl md:text-3xl text-foreground mb-8 heading-text">
              Engagement Process
            </h2>
            <div className="space-y-6 text-[15px] text-muted-foreground leading-relaxed professional-text">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center text-foreground professional-text font-medium flex-shrink-0 text-sm">
                  1
                </div>
                <p>Initial consultation to review investment terms and address inquiries</p>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center text-foreground professional-text font-medium flex-shrink-0 text-sm">
                  2
                </div>
                <p>Comprehensive financial documentation and legal agreement review</p>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center text-foreground professional-text font-medium flex-shrink-0 text-sm">
                  3
                </div>
                <p>Capital transfer to secure allocation and Q2 2026 distribution eligibility</p>
              </div>
            </div>
            <div className="mt-8 bg-accent/30 p-6 rounded-lg text-center">
              <p className="text-sm text-foreground professional-text">
                Limited to 4-6 strategic partners
              </p>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="text-center space-y-8"
          >
            <div className="max-w-2xl mx-auto">
              <h3 className="text-xl md:text-2xl text-foreground heading-text mb-4">
                Capital-efficient growth opportunity
              </h3>
              <p className="text-[15px] text-muted-foreground professional-text leading-relaxed">
                Partner with established trading operations. Investment capitalizes on proven performance rather than speculative development.
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
                Contact Investment Team
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
