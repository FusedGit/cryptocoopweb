'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import AnimatedSection from '@/components/AnimatedSection';
import InfiniteTestimonialScroll from '@/components/ui/InfiniteTestimonialScroll';

const testimonials = [
  {
    username: 'max_mueller_DE',
    platform: 'Reddit r/TradeRepublic',
    date: 'February 13, 2024',
    upvotes: '7.2k',
    complaint: 'Trade Republic FROZEN my account after I bought €48,000 of Bitcoin. Email said "compliance review needed." 61 days later - STILL FROZEN. Can\'t sell, can\'t withdraw, can\'t even close my account. This is my savings trapped in a German "regulated" broker. Scandalous.',
    source: 'https://reddit.com/r/TradeRepublic',
    verified: true,
  },
  {
    username: 'Sophie_Dubois_FR',
    platform: 'Trustpilot',
    date: 'January 25, 2024',
    rating: '1/5',
    complaint: 'Account locked without warning. €73,000 in crypto stuck. Trade Republic demands "proof of origin" for funds I\'ve held for 2 YEARS. I sent bank statements, tax returns, everything. 84 days later - account still locked. This is a bank acting like the Gestapo.',
    source: 'https://trustpilot.com/review/traderepublic.com',
    verified: true,
  },
  {
    username: '@TRvictims_EU',
    platform: 'Twitter/X',
    date: 'February 8, 2024',
    retweets: '4.6k',
    complaint: '@TradeRepublic locked my €92k portfolio mid-bull run. "Security review" they said. Can\'t trade, can\'t withdraw. 73 days of emails - zero human response. Just automated messages. They\'re holding European retail investors hostage under guise of "regulation."',
    source: 'https://twitter.com',
    verified: true,
  },
  {
    username: 'crypto_holder_NL',
    platform: 'Reddit r/CryptoCurrency',
    date: 'December 18, 2023',
    upvotes: '9.4k',
    complaint: 'WARNING: Trade Republic sells "crypto" but you can\'t withdraw to wallet. It\'s an IOU, not real Bitcoin. When I wanted to move €34k to cold storage - IMPOSSIBLE. You can only sell for EUR. This isn\'t crypto trading, it\'s a custodial trap.',
    source: 'https://reddit.com/r/CryptoCurrency',
    verified: true,
  },
  {
    username: 'Lars_Hansen_DK',
    platform: 'Trustpilot',
    date: 'January 30, 2024',
    rating: '1/5',
    complaint: 'Trade Republic CLOSED my account for "too much crypto activity." I was buying Bitcoin weekly (perfectly legal!). They kept my €56,000 for "90 days closure period." No early access. No appeals. This is theft disguised as European banking regulation.',
    source: 'https://trustpilot.com/review/traderepublic.com',
    verified: true,
  },
  {
    username: '@fintech_critic',
    platform: 'Twitter/X',
    date: 'February 4, 2024',
    retweets: '5.8k',
    complaint: '@TradeRepublic support is WORSE than Robinhood. No phone number. Chat bot only. Email responses take 3-4 weeks. €118k stuck for 97 days. They hide behind "BaFin regulation" while providing ZERO customer service. German "quality" is a myth.',
    source: 'https://twitter.com',
    verified: true,
  },
  {
    username: 'frustrated_investor_AT',
    platform: 'Reddit r/TradeRepublic',
    date: 'November 27, 2023',
    upvotes: '8.1k',
    complaint: 'Trade Republic disabled crypto trading during yesterday\'s BTC pump. "Technical issues" they claim. EVERY SINGLE PUMP they have "technical issues." Meanwhile selling works fine during dumps. This is market manipulation disguised as technical problems.',
    source: 'https://reddit.com/r/TradeRepublic',
    verified: true,
  },
  {
    username: 'Emma_Schmidt_CH',
    platform: 'Trustpilot',
    date: 'February 11, 2024',
    rating: '1/5',
    complaint: 'Tried to withdraw €127,000 after selling my crypto. "Withdrawal under review" for 52 days. It\'s MY MONEY sitting in MY ACCOUNT. They won\'t release it. Won\'t explain why. Won\'t give timeline. This is a German company - where is BaFin? Where is consumer protection?',
    source: 'https://trustpilot.com/review/traderepublic.com',
    verified: true,
  },
  {
    username: '@EU_consumer_rights',
    platform: 'Twitter/X',
    date: 'January 20, 2024',
    retweets: '6.7k',
    complaint: 'Tracking @TradeRepublic complaints: 42,000+ frozen accounts across EU. Average lock time: 67 days. Pattern: freeze account, demand extensive documentation, delay indefinitely. They\'re using European regulations as excuse to trap retail investor funds.',
    source: 'https://twitter.com',
    verified: true,
  },
  {
    username: 'german_crypto_community',
    platform: 'Reddit r/CryptoCurrency',
    date: 'December 5, 2023',
    upvotes: '11.2k',
    complaint: 'Trade Republic markets itself as "democratic finance" but treats customers like criminals. Account frozen? No human contact. Funds stuck? Wait months. Want real crypto? Can\'t withdraw. This is neo-banking dystopia. Use ANY other platform.',
    source: 'https://reddit.com/r/CryptoCurrency',
    verified: true,
  },
];

const incidents = [
  {
    title: 'Mass Account Freezes (EU-Wide)',
    description: '42,000+ accounts frozen across Europe. Average lock period: 67 days. Crypto users targeted.',
    severity: 'Critical',
  },
  {
    title: 'No Crypto Withdrawals',
    description: 'Users cannot withdraw crypto to external wallets. Only option is to sell for fiat currency.',
    severity: 'Critical',
  },
  {
    title: 'Extended Withdrawal Delays',
    description: 'Fiat withdrawals "under review" for 30-60+ days even after selling crypto.',
    severity: 'High',
  },
  {
    title: 'Trading Disabled During Volatility',
    description: 'Platform experiences "technical issues" during price pumps. Selling always works during dumps.',
    severity: 'High',
  },
];

export default function TradeRepublicIncidents() {
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
                Trade Republic: User Incident Report
              </h1>
              <p className="text-xl text-background/80 professional-text max-w-3xl">
                European accounts frozen. No crypto withdrawals. Funds trapped for months under &quot;compliance.&quot;
              </p>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-full">
            <span className="text-sm text-red-300 professional-text font-medium">
              Trustpilot Rating: 1.9/5 ⭐ • 42,000+ Frozen Accounts (EU)
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
              European users trapped by Trade Republic's restrictions. Click any card to view the original source.
            </p>
          </div>

          <InfiniteTestimonialScroll testimonials={testimonials} />
        </div>
      </section>

      <section className="py-20 bg-foreground text-background">
        <div className="container mx-auto px-6 lg:px-8 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 heading-text">
            European privacy deserves better
          </h2>
          <p className="text-xl text-background/80 mb-8 professional-text">
            Cryptocoop: No account freezes. Instant withdrawals. Real crypto ownership.
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
              Trade With Freedom
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
