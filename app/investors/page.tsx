'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, TrendingUp, Shield, Users, Lock, CheckCircle2, ExternalLink, BarChart3, Zap, Target } from 'lucide-react';

export default function InvestorsPage() {
  return (
    <main className="min-h-screen w-full bg-gradient-to-b from-yellow-50 via-white to-cyan-50">
      {/* Back Button */}
      <div className="container mx-auto px-4 pt-24">
        <Link href="/" className="inline-flex items-center gap-2 text-foreground hover:text-primary font-bold doodle-text mb-8">
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>
      </div>

      <section className="container mx-auto px-4 py-12 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-foreground mb-6 doodle-text">
              Investment Proposal: CryptoCoop
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-semibold doodle-text max-w-3xl mx-auto leading-relaxed">
              The #1 Ranked Trader on LocalCoinSwap
            </p>
          </div>

          {/* Executive Summary */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-8 md:p-10 border-4 border-black mb-12"
          >
            <h2 className="text-3xl font-black text-foreground mb-6 doodle-text">
              Executive Summary
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed font-semibold">
              <p>
                CryptoCoop is the <span className="font-black text-green-600">#1 ranked trader</span> on LocalCoinSwap's leaderboard, operating a proven P2P crypto trading model that has grown revenue <span className="font-black">80x from 2020 to 2025</span> without significant external funding.
              </p>
              <p>
                We are seeking strategic investment partners to scale our high-velocity trading operations and unlock exponential growth.
              </p>
            </div>

            <div className="mt-8 grid md:grid-cols-3 gap-6">
              <div className="bg-cyan-50 p-6 border-3 border-cyan-300 text-center">
                <p className="text-4xl font-black text-cyan-600 mb-2">895</p>
                <p className="text-sm font-bold text-foreground">Trades (30 Days)</p>
              </div>
              <div className="bg-green-50 p-6 border-3 border-green-300 text-center">
                <p className="text-4xl font-black text-green-600 mb-2">$617K</p>
                <p className="text-sm font-bold text-foreground">Monthly Volume</p>
              </div>
              <div className="bg-purple-50 p-6 border-3 border-purple-300 text-center">
                <p className="text-4xl font-black text-purple-600 mb-2">$20K+</p>
                <p className="text-sm font-bold text-foreground">Daily Average</p>
              </div>
            </div>

            <p className="mt-6 text-center text-muted-foreground font-semibold">
              <span className="font-black">Established & Registered:</span> UK-registered company operating since 2018
            </p>
          </motion.div>

          {/* Capital Constraint */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-r from-orange-500 to-red-500 p-8 md:p-10 border-4 border-black text-white mb-8"
          >
            <h2 className="text-3xl font-black mb-6 doodle-text flex items-center gap-3">
              <Zap className="w-10 h-10" />
              Capital is Our Only Constraint
            </h2>
            <div className="space-y-4 text-lg leading-relaxed font-semibold">
              <p>
                Our business model is simple and proven: <span className="font-black">capital in → trades executed → profits out.</span>
              </p>
              <p>
                Every dollar invested deploys immediately into high-velocity trades with a 30-day revenue cycle. No R&D delays, no product development risk, just scaling a machine that's already working.
              </p>
            </div>
          </motion.div>

          {/* Track Record */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white p-8 md:p-10 border-4 border-black mb-8"
          >
            <h2 className="text-3xl font-black text-foreground mb-6 doodle-text flex items-center gap-3">
              <BarChart3 className="w-10 h-10 text-green-600" />
              Track Record: 2020-2025
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-black">
                    <th className="text-left p-2 font-black">Year</th>
                    <th className="text-right p-2 font-black">Turnover</th>
                    <th className="text-right p-2 font-black">Net Profit</th>
                    <th className="text-right p-2 font-black">Capital</th>
                  </tr>
                </thead>
                <tbody className="font-semibold">
                  <tr className="border-b border-gray-200">
                    <td className="p-2">2020</td>
                    <td className="text-right p-2">$300K</td>
                    <td className="text-right p-2">$5.2K</td>
                    <td className="text-right p-2">$20K</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="p-2">2021</td>
                    <td className="text-right p-2">$1M</td>
                    <td className="text-right p-2">$23K</td>
                    <td className="text-right p-2">$28K</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="p-2">2022</td>
                    <td className="text-right p-2">$3M</td>
                    <td className="text-right p-2">$111K</td>
                    <td className="text-right p-2">$49K</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="p-2">2023</td>
                    <td className="text-right p-2">$8M</td>
                    <td className="text-right p-2">$303K</td>
                    <td className="text-right p-2">$90K</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="p-2">2024</td>
                    <td className="text-right p-2">$13M</td>
                    <td className="text-right p-2">$498K</td>
                    <td className="text-right p-2">$120K</td>
                  </tr>
                  <tr className="border-b border-gray-200 bg-green-50">
                    <td className="p-2 font-black">2025</td>
                    <td className="text-right p-2 font-black">$15M</td>
                    <td className="text-right p-2 font-black">$575K</td>
                    <td className="text-right p-2 font-black">$100K</td>
                  </tr>
                  <tr className="bg-cyan-50">
                    <td className="p-2 font-black">2026 (projected)</td>
                    <td className="text-right p-2 font-black text-green-600">$24M</td>
                    <td className="text-right p-2 font-black text-green-600">$924K</td>
                    <td className="text-right p-2 font-black text-green-600">$454K</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-6 text-center text-lg font-black text-orange-600">
              Growth has plateaued due to capital constraints, not market saturation or operational limits.
            </p>
          </motion.div>

          {/* Investment Tiers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white p-8 md:p-10 border-4 border-black mb-8"
          >
            <h2 className="text-3xl font-black text-foreground mb-6 doodle-text flex items-center gap-3">
              <Target className="w-10 h-10 text-purple-600" />
              Investment Tiers & Returns
            </h2>
            <p className="text-lg text-muted-foreground font-semibold mb-8 leading-relaxed">
              Your investment scales our operations linearly. The more you invest, the more trades we execute, and the more profit we generate together.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Tier 1 */}
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 border-4 border-blue-500">
                <div className="text-center mb-4">
                  <p className="text-sm font-bold text-blue-600 mb-2">TIER 1</p>
                  <p className="text-4xl font-black text-foreground mb-2">$200K</p>
                  <p className="text-sm text-muted-foreground font-semibold">Investment</p>
                </div>
                <div className="space-y-3 text-center">
                  <div className="border-t-2 border-blue-300 pt-3">
                    <p className="text-2xl font-black text-green-600">60%</p>
                    <p className="text-xs font-bold text-muted-foreground">1-Year ROI</p>
                  </div>
                  <div className="bg-white p-3 border-2 border-blue-200">
                    <p className="text-lg font-black text-foreground">$120K</p>
                    <p className="text-xs font-bold text-muted-foreground">Your Profit Share</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground">2026 Turnover:</p>
                    <p className="text-xl font-black text-foreground">$24M</p>
                  </div>
                </div>
              </div>

              {/* Tier 2 */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 border-4 border-green-500 relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-1 text-xs font-black border-2 border-black">
                  POPULAR
                </div>
                <div className="text-center mb-4">
                  <p className="text-sm font-bold text-green-600 mb-2">TIER 2</p>
                  <p className="text-4xl font-black text-foreground mb-2">$500K</p>
                  <p className="text-sm text-muted-foreground font-semibold">Investment</p>
                </div>
                <div className="space-y-3 text-center">
                  <div className="border-t-2 border-green-300 pt-3">
                    <p className="text-2xl font-black text-green-600">50%</p>
                    <p className="text-xs font-bold text-muted-foreground">1-Year ROI</p>
                  </div>
                  <div className="bg-white p-3 border-2 border-green-200">
                    <p className="text-lg font-black text-foreground">$250K</p>
                    <p className="text-xs font-bold text-muted-foreground">Your Profit Share</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground">2026 Turnover:</p>
                    <p className="text-xl font-black text-foreground">$45M</p>
                  </div>
                </div>
              </div>

              {/* Tier 3 */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 border-4 border-purple-500">
                <div className="text-center mb-4">
                  <p className="text-sm font-bold text-purple-600 mb-2">TIER 3</p>
                  <p className="text-4xl font-black text-foreground mb-2">$1M</p>
                  <p className="text-sm text-muted-foreground font-semibold">Investment</p>
                </div>
                <div className="space-y-3 text-center">
                  <div className="border-t-2 border-purple-300 pt-3">
                    <p className="text-2xl font-black text-green-600">45%</p>
                    <p className="text-xs font-bold text-muted-foreground">1-Year ROI</p>
                  </div>
                  <div className="bg-white p-3 border-2 border-purple-200">
                    <p className="text-lg font-black text-foreground">$450K</p>
                    <p className="text-xs font-bold text-muted-foreground">Your Profit Share</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground">2026 Turnover:</p>
                    <p className="text-xl font-black text-foreground">$72M</p>
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-6 text-center text-sm text-muted-foreground font-semibold">
              Quarterly dividend payments begin Q2 2026
            </p>
          </motion.div>

          {/* Why Investors Choose CryptoCoop */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white p-8 md:p-10 border-4 border-black mb-8"
          >
            <h2 className="text-3xl font-black text-foreground mb-6 doodle-text text-center">
              Why Investors Choose CryptoCoop
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-6 border-3 border-cyan-300">
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle2 className="w-8 h-8 text-cyan-600" />
                  <h3 className="text-xl font-black doodle-text">Proven Execution</h3>
                </div>
                <ul className="space-y-2 text-muted-foreground font-semibold leading-relaxed">
                  <li>• #1 leaderboard ranking on LocalCoinSwap</li>
                  <li>• Live, verifiable metrics—not projections</li>
                  <li>• 895 trades in 30 days demonstrates operational excellence</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 border-3 border-green-300">
                <div className="flex items-center gap-3 mb-3">
                  <Zap className="w-8 h-8 text-green-600" />
                  <h3 className="text-xl font-black doodle-text">Capital Velocity</h3>
                </div>
                <ul className="space-y-2 text-muted-foreground font-semibold leading-relaxed">
                  <li>• Funds deploy into trades within days</li>
                  <li>• Revenue generation begins within 30 days</li>
                  <li>• No lengthy development cycles needed</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 border-3 border-yellow-300">
                <div className="flex items-center gap-3 mb-3">
                  <TrendingUp className="w-8 h-8 text-orange-600" />
                  <h3 className="text-xl font-black doodle-text">Asymmetric Upside</h3>
                </div>
                <ul className="space-y-2 text-muted-foreground font-semibold leading-relaxed">
                  <li>• Linear scalability: $1M → $72M turnover</li>
                  <li>• Conservative profit projections</li>
                  <li>• Larger investments = larger returns</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 border-3 border-purple-300">
                <div className="flex items-center gap-3 mb-3">
                  <Shield className="w-8 h-8 text-purple-600" />
                  <h3 className="text-xl font-black doodle-text">Downside Protection</h3>
                </div>
                <ul className="space-y-2 text-muted-foreground font-semibold leading-relaxed">
                  <li>• Profit-share structure: pay only when we win</li>
                  <li>• No fixed obligations or guaranteed payments</li>
                  <li>• Aligned incentives between investors and operators</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Verification Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-gradient-to-r from-green-400 to-cyan-400 p-1 border-4 border-black mb-8"
          >
            <div className="bg-white p-8">
              <h2 className="text-3xl font-black text-foreground mb-4 doodle-text text-center flex items-center justify-center gap-3">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
                Verification & Due Diligence
              </h2>
              <p className="text-lg text-center text-muted-foreground font-semibold leading-relaxed mb-6">
                All trading metrics, volume data, and leaderboard rankings are publicly verifiable in real-time.
              </p>
              <div className="text-center">
                <a
                  href="https://localcoinswap.com/profile/cryptocoop"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-4 font-black text-lg border-4 border-black hover:scale-105 transition-transform"
                >
                  <ExternalLink className="w-6 h-6" />
                  View Live Trading Profile
                </a>
              </div>
            </div>
          </motion.div>

          {/* Platform Expansion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-white p-8 md:p-10 border-4 border-black mb-8"
          >
            <h2 className="text-3xl font-black text-foreground mb-6 doodle-text">
              Platform Expansion
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed font-semibold">
              <p>
                We officially launched our <span className="font-black text-foreground">Telegram trading app</span>, expanding beyond LocalCoinSwap to capture a broader market.
              </p>
              <p>
                We are in active discussions with Telegram regarding scaling opportunities and platform integration.
              </p>
              <div className="bg-cyan-50 p-6 border-3 border-cyan-300 mt-6">
                <p className="text-center font-black text-foreground mb-4">Our Multi-Platform Presence:</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 border-2 border-cyan-300 text-center">
                    <p className="font-black text-cyan-600 mb-2">LocalCoinSwap</p>
                    <p className="text-sm">#1 Ranked Trader</p>
                  </div>
                  <div className="bg-white p-4 border-2 border-cyan-300 text-center">
                    <p className="font-black text-cyan-600 mb-2">Telegram</p>
                    <p className="text-sm">Native Trading Bot</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* The Ask & Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="bg-gradient-to-r from-purple-500 to-pink-500 p-8 md:p-10 border-4 border-black text-white mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-black mb-6 doodle-text text-center">
              The Ask
            </h2>
            <div className="space-y-4 text-lg leading-relaxed font-semibold max-w-3xl mx-auto">
              <p>
                We are raising <span className="font-black">$200K - $1M</span> from 4-6 strategic partners to:
              </p>
              <ul className="space-y-2 pl-6">
                <li>1. Increase trading capital for higher volume execution</li>
                <li>2. Scale operations to $24M-$72M turnover in 2026</li>
                <li>3. Deliver 45-60% ROI with quarterly payouts starting Q2 2026</li>
              </ul>
              <div className="bg-white text-foreground p-6 border-3 border-purple-700 mt-6">
                <p className="font-black mb-3 text-center">Investment Terms:</p>
                <ul className="space-y-2 text-base">
                  <li>✓ Profit-sharing structure (details available upon request)</li>
                  <li>✓ Quarterly dividend payments</li>
                  <li>✓ Wire transfer within 30 days of commitment</li>
                  <li>✓ First payout: Q2 2026</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="bg-white p-8 md:p-10 border-4 border-black mb-12"
          >
            <h2 className="text-3xl font-black text-foreground mb-6 doodle-text text-center">
              Next Steps
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed font-semibold">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-cyan-500 text-white font-black flex items-center justify-center border-3 border-black flex-shrink-0">
                  1
                </div>
                <p>Schedule a call to discuss investment terms and answer questions</p>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-green-500 text-white font-black flex items-center justify-center border-3 border-black flex-shrink-0">
                  2
                </div>
                <p>Review detailed financials and legal documentation (we have the documents ready to sign)</p>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-purple-500 text-white font-black flex items-center justify-center border-3 border-black flex-shrink-0">
                  3
                </div>
                <p>Wire funds to secure your position and Q2 2026 dividend eligibility</p>
              </div>
            </div>
            <div className="mt-8 bg-yellow-100 p-6 border-3 border-yellow-400 text-center">
              <p className="text-xl font-black text-foreground">
                ⚠️ Limited availability: 4-6 partners only
              </p>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="text-center space-y-6"
          >
            <h3 className="text-2xl font-black text-foreground doodle-text">
              This is a high-velocity, capital-efficient opportunity
            </h3>
            <p className="text-xl text-muted-foreground font-semibold max-w-2xl mx-auto">
              Partner with a proven crypto trading operation. Your investment doesn't fund dreams—it scales a machine that's already dominating the market.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="https://s.craft.me/SOyTD5nduCQ9Vv"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-primary text-white px-8 py-4 font-black text-lg doodle-text sketchy-shadow border-4 border-black hover:scale-105 transition-transform"
              >
                <ExternalLink className="w-6 h-6" />
                View Full Investment Details
              </a>
              <a 
                href="https://t.me/cryptocoop2024"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-green-500 text-white px-8 py-4 font-black text-lg doodle-text sketchy-shadow border-4 border-black hover:scale-105 transition-transform"
              >
                Contact Us to Invest
              </a>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}
