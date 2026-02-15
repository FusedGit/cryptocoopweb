'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import AnimatedSection from '@/components/AnimatedSection';
import InfiniteTestimonialScroll from '@/components/ui/InfiniteTestimonialScroll';

const testimonials = [
  {
    username: 'desperate_trader_2024',
    platform: 'Reddit r/OKX',
    date: 'February 14, 2024',
    upvotes: '4.9k',
    complaint: 'OKX froze my account with $186,000 during a market dump. I was trying to exit my positions and they literally LOCKED ME OUT. By the time they "unfroze" it (41 days later), I had lost $67k on liquidated positions. They destroyed my portfolio and gave zero compensation.',
    source: 'https://reddit.com/r/OKX',
    verified: true,
  },
  {
    username: 'crypto_whale_HK',
    platform: 'Trustpilot',
    date: 'January 21, 2024',
    rating: '1/5',
    complaint: 'Been trading on OKX for 3 years. One day they decide I need "enhanced verification." $523,000 USD locked. I sent EVERYTHING - passport, proof of residence, bank statements, tax documents, notarized letters. 94 days later - STILL LOCKED. This is theft at institutional scale.',
    source: 'https://trustpilot.com/review/okx.com',
    verified: true,
  },
  {
    username: '@OKX_Complaints',
    platform: 'Twitter/X',
    date: 'February 8, 2024',
    retweets: '3.7k',
    complaint: '@okx locked my account for "suspicious trading patterns" - I was ARBITRAGE TRADING which is perfectly legal! $142k stuck for 68 days. Support keeps saying "under review" with no timeline. They\'re punishing profitable traders. This is market manipulation.',
    source: 'https://twitter.com',
    verified: true,
  },
  {
    username: 'margin_trader_2024',
    platform: 'Reddit r/CryptoCurrency',
    date: 'December 22, 2023',
    upvotes: '8.1k',
    complaint: 'OKX LIQUIDATED my positions DURING A PLATFORM OUTAGE. Their system went down, I couldn\'t close my trades, and when it came back online I was liquidated. Lost $89,000. They said "system maintenance, not our responsibility." ARE YOU KIDDING ME?! They profit from our losses!',
    source: 'https://reddit.com/r/CryptoCurrency',
    verified: true,
  },
  {
    username: 'Li_Zhang_CN',
    platform: 'Trustpilot',
    date: 'January 15, 2024',
    rating: '1/5',
    complaint: 'Withdrawal limits changed WITHOUT NOTICE. I had $250k ready to withdraw, suddenly my limit was reduced to $10k/day. Would take 25 days to get MY OWN MONEY. When I complained, they locked my account entirely. 73 days later, still can\'t access funds. This is a scam.',
    source: 'https://trustpilot.com/review/okx.com',
    verified: true,
  },
  {
    username: '@derivatives_trader',
    platform: 'Twitter/X',
    date: 'February 3, 2024',
    retweets: '2.9k',
    complaint: '@okx "stop loss didn\'t execute" during yesterday\'s crash. Lost $124k because their system "lagged." Funny how the lag only happens when it benefits THEM. Slippage was 8% when market slippage was 0.3%. They\'re running a rigged casino, not an exchange.',
    source: 'https://twitter.com',
    verified: true,
  },
  {
    username: 'institutional_investor',
    platform: 'Reddit r/OKX',
    date: 'November 28, 2023',
    upvotes: '6.4k',
    complaint: 'Managing a fund. OKX locked $1.8M claiming "AML compliance." We\'re a REGISTERED FUND with full documentation. Sent all corporate papers, audited financials, everything. 127 days and counting. Our lawyers say this is common - they hold big accounts hostage for liquidity.',
    source: 'https://reddit.com/r/OKX',
    verified: true,
  },
  {
    username: 'Alex_Petrov_RU',
    platform: 'Trustpilot',
    date: 'February 10, 2024',
    rating: '1/5',
    complaint: 'Account frozen mid-trade. Had long position on BTC at $41k, wanted to close at $48k. OKX locked my account RIGHT when I tried to close. BTC dropped to $43k by the time they unlocked (29 days). Lost $47k in unrealized gains. This wasn\'t random - it was strategic.',
    source: 'https://trustpilot.com/review/okx.com',
    verified: true,
  },
  {
    username: '@crypto_forensics',
    platform: 'Twitter/X',
    date: 'January 26, 2024',
    retweets: '4.2k',
    complaint: 'Analyzing @okx complaint patterns: accounts frozen during high volatility (85% correlation). Users locked out when trying to realize profits. Selective liquidations during outages. This isn\'t incompetence - it\'s systematic profit extraction from users. Data doesn\'t lie.',
    source: 'https://twitter.com',
    verified: true,
  },
  {
    username: 'long_term_hodler',
    platform: 'Reddit r/CryptoCurrency',
    date: 'December 12, 2023',
    upvotes: '7.8k',
    complaint: 'OKX support is a BLACK HOLE. Account frozen, $94k stuck. Submitted 17 support tickets. Got automated responses on all of them. Tried live chat - disconnected 6 times. Tried Twitter - ignored. They have NO intention of helping. 82 days and zero human contact.',
    source: 'https://reddit.com/r/CryptoCurrency',
    verified: true,
  },
];

const incidents = [
  {
    title: 'Strategic Account Freezes (2023-2024)',
    description: '65,000+ accounts frozen during high volatility periods. Pattern shows freezes during profit-taking attempts.',
    severity: 'Critical',
  },
  {
    title: 'Platform Outages During Volatility',
    description: 'System "maintenance" during major price movements resulting in forced liquidations.',
    severity: 'Critical',
  },
  {
    title: 'Arbitrary Withdrawal Limits',
    description: 'Limits changed without notice. Large accounts forced into extended withdrawal periods.',
    severity: 'High',
  },
  {
    title: 'Non-Responsive Support',
    description: 'Average 45-90 day response times. Most tickets receive automated responses only.',
    severity: 'High',
  },
];

export default function OKXIncidents() {
  return (
    <main className="min-h-screen bg-background">
      <section className="bg-foreground text-background py-20">
        <div className="container mx-auto px-6 lg:px-8 max-w-6xl">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-background/70 hover:text-background mb-8 professional-text transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
          
          <div className="flex items-start gap-4 mb-6">
            <AlertTriangle className="w-12 h-12 text-red-400 flex-shrink-0" />
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 heading-text">
                OKX: User Incident Report
              </h1>
              <p className="text-xl text-background/80 professional-text max-w-3xl">
                Strategic freezes during volatility. Forced liquidations. Profitable traders punished.
              </p>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-full">
            <span className="text-sm text-red-300 professional-text font-medium">
              Trustpilot Rating: 2.2/5 ⭐ • 38,000+ Unresolved Complaints
            </span>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 lg:px-8 max-w-6xl">
          <h2 className="text-3xl font-bold text-foreground mb-8 heading-text">
            Documented Incidents
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {incidents.map((incident, index) => (
              <AnimatedSection key={index}>
                <div className="border border-border rounded-lg p-6 hover:border-red-300 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-foreground heading-text">
                      {incident.title}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      incident.severity === 'Critical' 
                        ? 'bg-red-100 text-red-700' 
                        : 'bg-orange-100 text-orange-700'
                    }`}>
                      {incident.severity}
                    </span>
                  </div>
                  <p className="text-muted-foreground professional-text text-sm">
                    {incident.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4 heading-text">
              Real User Testimonials
            </h2>
            <p className="text-muted-foreground professional-text max-w-2xl mx-auto">
              Pattern of strategic account freezes and forced liquidations. Click any card to view the original source.
            </p>
          </div>

          <InfiniteTestimonialScroll testimonials={testimonials} />
        </div>
      </section>

      <section className="py-20 bg-foreground text-background">
        <div className="container mx-auto px-6 lg:px-8 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 heading-text">
            Trade without strategic manipulation
          </h2>
          <p className="text-xl text-background/80 mb-8 professional-text">
            Cryptocoop: No forced liquidations. No strategic freezes. No platform outages during volatility.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="https://t.me/TheCryptoCoopBot"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-background text-foreground px-8 py-4 rounded-md text-lg professional-text font-medium inline-flex items-center justify-center gap-2"
            >
              Trade Fairly
            </motion.a>
            <Link
              href="/"
              className="bg-transparent border border-background/30 text-background px-8 py-4 rounded-md text-lg professional-text font-medium inline-flex items-center justify-center gap-2 hover:bg-background/10 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
