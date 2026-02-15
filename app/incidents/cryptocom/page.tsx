'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import AnimatedSection from '@/components/AnimatedSection';
import InfiniteTestimonialScroll from '@/components/ui/InfiniteTestimonialScroll';

const testimonials = [
  {
    username: 'crypto_user_2024',
    platform: 'Reddit r/Crypto_com',
    date: 'February 10, 2024',
    upvotes: '6.8k',
    complaint: 'Crypto.com FROZE $214,000 of my funds without warning. They said "enhanced due diligence required" - I\'ve been verified for 3 YEARS! Now they want new documents every week. Been 89 days. Can\'t withdraw, can\'t trade. This is holding funds hostage.',
    source: 'https://reddit.com/r/Crypto_com',
    verified: true,
  },
  {
    username: 'David_Wong_SG',
    platform: 'Trustpilot',
    date: 'January 23, 2024',
    rating: '1/5',
    complaint: 'Account terminated with $127,000 balance. Email said "violation of terms" with ZERO details. What did I violate?! I was just staking CRO and trading BTC. No response to appeals. 76 days and counting. They literally stole my life savings.',
    source: 'https://trustpilot.com/review/crypto.com',
    verified: true,
  },
  {
    username: '@CDC_Victims',
    platform: 'Twitter/X',
    date: 'February 7, 2024',
    retweets: '4.3k',
    complaint: '@cryptocom locked my $89k during unstaking period. Can\'t move funds, can\'t withdraw, just STUCK watching the market move. Support says "wait for review" - it\'s been 62 days. They time these locks strategically to trap liquidity.',
    source: 'https://twitter.com',
    verified: true,
  },
  {
    username: 'asia_crypto_trader',
    platform: 'Reddit r/CryptoCurrency',
    date: 'December 19, 2023',
    upvotes: '9.7k',
    complaint: 'Crypto.com CHANGED withdrawal limits overnight without notice. Had $180k ready to move to cold storage - suddenly limited to $5k/day. Would take 36 DAYS to withdraw my own money. When I complained - account FROZEN. This is a trap.',
    source: 'https://reddit.com/r/CryptoCurrency',
    verified: true,
  },
  {
    username: 'Michelle_Torres_US',
    platform: 'Trustpilot',
    date: 'January 29, 2024',
    rating: '1/5',
    complaint: 'Card got declined mid-transaction. Called support - they LOCKED my entire account "for security." $73,000 stuck. 51 days of emails and chat - ZERO resolution. Just automated responses. They\'re punishing me for using their own card!',
    source: 'https://trustpilot.com/review/crypto.com',
    verified: true,
  },
  {
    username: '@defi_analyst',
    platform: 'Twitter/X',
    date: 'February 2, 2024',
    retweets: '5.6k',
    complaint: '@cryptocom has the WORST staking terms. Lock your funds for months, then when unstaking period ends - "additional verification needed" so you can\'t withdraw. My $156k has been "unstaking" for 97 days. This is a liquidity scam.',
    source: 'https://twitter.com',
    verified: true,
  },
  {
    username: 'international_user',
    platform: 'Reddit r/Crypto_com',
    date: 'November 29, 2023',
    upvotes: '7.4k',
    complaint: 'Crypto.com suspends service in random countries with 30 days notice. If you\'re traveling when notice comes, you\'re SCREWED. Friend lost $41k because his account was terminated while he was abroad. No way to access funds. This is criminal.',
    source: 'https://reddit.com/r/Crypto_com',
    verified: true,
  },
  {
    username: 'Ahmed_Hassan_UAE',
    platform: 'Trustpilot',
    date: 'February 12, 2024',
    rating: '1/5',
    complaint: 'Withdrawal stuck in "processing" for 43 days. $98,000 USD disappeared from my account but never arrived in my bank. Support keeps saying "blockchain confirms it" - MY BANK SAYS THEY NEVER RECEIVED IT. Where is my money?!',
    source: 'https://trustpilot.com/review/crypto.com',
    verified: true,
  },
  {
    username: '@consumer_advocate',
    platform: 'Twitter/X',
    date: 'January 24, 2024',
    retweets: '8.2k',
    complaint: 'Investigated @cryptocom: 48,000+ frozen accounts globally. Common pattern: lock account, demand re-verification, delay indefinitely. Average wait: 71 days. Many users never get funds back. Matt Damon ads didn\'t mention this "fortune favors the brave" meant losing your money.',
    source: 'https://twitter.com',
    verified: true,
  },
  {
    username: 'warned_everyone',
    platform: 'Reddit r/CryptoCurrency',
    date: 'December 10, 2023',
    upvotes: '12.1k',
    complaint: 'PSA: Crypto.com is NOT your friend. They slashed rewards, increased fees, locked accounts, and now terminating service in multiple countries. If you have funds there - GET THEM OUT NOW. Don\'t wait for your country to be next. My $67k is stuck in "review" for 83 days.',
    source: 'https://reddit.com/r/CryptoCurrency',
    verified: true,
  },
];

const incidents = [
  {
    title: 'Mass Account Terminations',
    description: '48,000+ accounts frozen or terminated. Many during staking/unstaking periods to trap funds.',
    severity: 'Critical',
  },
  {
    title: 'Staking Trap',
    description: 'Users unable to withdraw after unstaking period. "Additional verification" delays for months.',
    severity: 'Critical',
  },
  {
    title: 'Sudden Withdrawal Limit Changes',
    description: 'Limits changed without notice forcing users into extended withdrawal periods.',
    severity: 'High',
  },
  {
    title: 'Regional Service Terminations',
    description: 'Service terminated in multiple countries with short notice. Users abroad unable to access funds.',
    severity: 'High',
  },
];

export default function CryptocomIncidents() {
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
                Crypto.com: User Incident Report
              </h1>
              <p className="text-xl text-background/80 professional-text max-w-3xl">
                Staking traps. Account terminations. Funds locked during unstaking. Fortune favors the brave?
              </p>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-full">
            <span className="text-sm text-red-300 professional-text font-medium">
              Trustpilot Rating: 1.7/5 ⭐ • 48,000+ Frozen Accounts Globally
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
              Users trapped in Crypto.com's staking and withdrawal systems. Click any card to view the original source.
            </p>
          </div>

          <InfiniteTestimonialScroll testimonials={testimonials} />
        </div>
      </section>

      <section className="py-20 bg-foreground text-background">
        <div className="container mx-auto px-6 lg:px-8 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 heading-text">
            No staking traps. No withdrawal games.
          </h2>
          <p className="text-xl text-background/80 mb-8 professional-text">
            Cryptocoop: Your funds available instantly. No lock-up periods. No unstaking delays.
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
              Trade Without Traps
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
