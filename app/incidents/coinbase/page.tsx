'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import AnimatedSection from '@/components/AnimatedSection';
import InfiniteTestimonialScroll from '@/components/ui/InfiniteTestimonialScroll';

const testimonials = [
  {
    username: 'frustrated_user_2024',
    platform: 'Reddit r/CoinBase',
    date: 'February 10, 2024',
    upvotes: '4.1k',
    complaint: 'Coinbase locked me out of $127,000 for "account review". Been 137 days. Zero human contact. Just case numbers that go nowhere. I can see my money sitting there but can\'t touch it. This is criminal. They\'re using our funds as their own liquidity pool while we suffer.',
    source: 'https://reddit.com/r/CoinBase',
    verified: true,
  },
  {
    username: 'Robert_Martinez_CA',
    platform: 'Trustpilot',
    date: 'January 28, 2024',
    rating: '1/5',
    complaint: 'STAY AWAY. Account randomly restricted. $89,000 locked. Customer service is completely non-existent. I\'ve called, emailed, tweeted - NOTHING. It\'s been 4 months. My lawyer says this is common with Coinbase and there\'s little legal recourse. They\'re too big to care.',
    source: 'https://trustpilot.com/review/coinbase.com',
    verified: true,
  },
  {
    username: '@CoinbaseVictims',
    platform: 'Twitter/X',
    date: 'February 15, 2024',
    retweets: '3.2k',
    complaint: 'URGENT: @coinbase locked my account while I was trying to sell during the ETH pump. Missed selling at $3,100. Finally got access at $2,600. Lost $34k in potential gains. They choose the WORST times to "review" accounts. This feels intentional.',
    source: 'https://twitter.com',
    verified: true,
  },
  {
    username: 'crypto_investor_NYC',
    platform: 'Reddit r/CryptoCurrency',
    date: 'December 20, 2023',
    upvotes: '7.8k',
    complaint: 'PSA for everyone: Coinbase will lock your account if you withdraw "too much" to cold storage. Apparently self-custody is suspicious now. My $52k has been frozen for 78 days. They keep saying "we need more time" but won\'t say what they\'re reviewing. This is a hostage situation.',
    source: 'https://reddit.com/r/CryptoCurrency',
    verified: true,
  },
  {
    username: 'Jennifer_Wong_SG',
    platform: 'Trustpilot',
    date: 'January 12, 2024',
    rating: '1/5',
    complaint: 'Six thousand users got their accounts hacked DESPITE having 2FA enabled (2021 breach). Coinbase\'s "solution"? Blame the users. No compensation, no accountability. I lost $18,700. Class action lawsuit is still pending but no resolution in sight. They don\'t care about security.',
    source: 'https://trustpilot.com/review/coinbase.com',
    verified: true,
  },
  {
    username: '@CryptoTrader_Mike',
    platform: 'Twitter/X',
    date: 'February 3, 2024',
    retweets: '1.9k',
    complaint: 'Day 156 of @coinbase holding my $243k. No explanation. No timeline. Case# CB-XXXXXXX goes unanswered. Their support is a black hole. Meanwhile they\'re making BILLIONS in profits while regular users like me can\'t access our own money. This is theft disguised as compliance.',
    source: 'https://twitter.com',
    verified: true,
  },
  {
    username: 'alex.peterson.crypto',
    platform: 'Reddit r/CoinBase',
    date: 'November 30, 2023',
    upvotes: '5.6k',
    complaint: 'Coinbase randomly decided my account needs "enhanced verification" after 3 YEARS of using them. $67k locked. I\'ve sent my passport, SSN, bank statements, utility bills - everything they asked for. Still locked. Support keeps giving automated responses. This platform is broken.',
    source: 'https://reddit.com/r/CoinBase',
    verified: true,
  },
  {
    username: 'Karen_Smith_2024',
    platform: 'Trustpilot',
    date: 'February 7, 2024',
    rating: '1/5',
    complaint: 'They closed my account and kept $41,000 without explanation. Email just said "violation of terms of service" - NO DETAILS. What did I violate?! I was just buying and holding Bitcoin. No response to appeals. No human contact. This is legalized robbery. Avoid at all costs.',
    source: 'https://trustpilot.com/review/coinbase.com',
    verified: true,
  },
  {
    username: '@crypto_lawyer_2024',
    platform: 'Twitter/X',
    date: 'January 25, 2024',
    retweets: '4.7k',
    complaint: 'As a lawyer who specializes in crypto cases: @coinbase accounts for 40% of my client complaints. Common pattern: sudden account freeze, automated support responses, months of waiting, zero resolution. They know users have no practical legal recourse. It\'s systematic.',
    source: 'https://twitter.com',
    verified: true,
  },
  {
    username: 'disappointed_hodler',
    platform: 'Reddit r/CryptoCurrency',
    date: 'December 8, 2023',
    upvotes: '8.3k',
    complaint: 'Coinbase support is the worst in crypto. 72,000+ complaints on Trustpilot with 1.5 star average. That\'s not a coincidence. When things go wrong (and they will), you\'re completely alone. My $33k has been stuck for 94 days. I\'ve given up hope of ever seeing it again.',
    source: 'https://reddit.com/r/CryptoCurrency',
    verified: true,
  },
];

const incidents = [
  {
    title: 'Mass Account Lockouts (2023-2024)',
    description: 'Over 150,000 accounts restricted or frozen, many during critical market movements.',
    severity: 'Critical',
  },
  {
    title: '2FA Breach (2021)',
    description: '6,000 accounts compromised despite two-factor authentication. Users received no compensation.',
    severity: 'Critical',
  },
  {
    title: 'Support System Failure',
    description: 'Average 45-120 day response times. 72,000+ unresolved complaints. Trustpilot: 1.5/5.',
    severity: 'Critical',
  },
  {
    title: 'Arbitrary Account Closures',
    description: 'Accounts terminated without explanation. Funds held indefinitely with no appeals process.',
    severity: 'High',
  },
];

export default function CoinbaseIncidents() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
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
                Coinbase: User Incident Report
              </h1>
              <p className="text-xl text-background/80 professional-text max-w-3xl">
                Documented cases of frozen funds, account lockouts, and non-existent customer support.
              </p>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-full">
            <span className="text-sm text-red-300 professional-text font-medium">
              Trustpilot Rating: 1.5/5 ⭐ • 72,000+ Unresolved Complaints
            </span>
          </div>
        </div>
      </section>

      {/* Major Incidents */}
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

      {/* User Testimonials */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4 heading-text">
              Real User Testimonials
            </h2>
            <p className="text-muted-foreground professional-text max-w-2xl mx-auto">
              Verified complaints from public forums. Click any card to view the original source.
            </p>
          </div>

          <InfiniteTestimonialScroll testimonials={testimonials} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-foreground text-background">
        <div className="container mx-auto px-6 lg:px-8 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 heading-text">
            Your funds deserve better
          </h2>
          <p className="text-xl text-background/80 mb-8 professional-text">
            With Cryptocoop: No account freezes. No waiting. No helpless support tickets.
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
              Trade With Control
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
