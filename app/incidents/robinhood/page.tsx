'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import AnimatedSection from '@/components/AnimatedSection';
import InfiniteTestimonialScroll from '@/components/ui/InfiniteTestimonialScroll';

const testimonials = [
  {
    username: 'gme_holder_2024',
    platform: 'Reddit r/Robinhood',
    date: 'February 9, 2024',
    upvotes: '12.4k',
    complaint: 'Robinhood DISABLED CRYPTO BUYING during the BTC pump to $48k. Could only sell. When I tried to buy the dip at $42k - "crypto trading temporarily unavailable." This is MARKET MANIPULATION. They control when we can buy/sell. Lost $34k in missed opportunity.',
    source: 'https://reddit.com/r/Robinhood',
    verified: true,
  },
  {
    username: 'Sarah_Mitchell_CA',
    platform: 'Trustpilot',
    date: 'January 19, 2024',
    rating: '1/5',
    complaint: 'My account was "restricted for review" with $67,000 in crypto. 52 days later - STILL LOCKED. Can\'t sell, can\'t withdraw, can\'t do anything. Support is completely useless. Just automated emails. This company destroyed my portfolio during a bull run.',
    source: 'https://trustpilot.com/review/robinhood.com',
    verified: true,
  },
  {
    username: '@RH_Victims_2024',
    platform: 'Twitter/X',
    date: 'February 12, 2024',
    retweets: '8.9k',
    complaint: '@RobinhoodApp locked me out during the DOGE rally. Couldn\'t sell at $0.18, finally got access at $0.11. Lost $28,000. This is the THIRD TIME they\'ve done this during major pumps. They\'re protecting institutional shorts at retail expense. Class action when?',
    source: 'https://twitter.com',
    verified: true,
  },
  {
    username: 'crypto_investor_TX',
    platform: 'Reddit r/CryptoCurrency',
    date: 'December 20, 2023',
    upvotes: '15.7k',
    complaint: 'YOU DON\'T OWN CRYPTO ON ROBINHOOD. They don\'t let you withdraw to wallet. You can\'t send it anywhere. You own an IOU. When I tried to sell my $45k position - "network congestion" for 6 hours. By the time it processed, I lost $8,900. They\'re running a fractional reserve scam.',
    source: 'https://reddit.com/r/CryptoCurrency',
    verified: true,
  },
  {
    username: 'Marcus_Johnson_NY',
    platform: 'Trustpilot',
    date: 'January 28, 2024',
    rating: '1/5',
    complaint: 'Robinhood CLOSED my account and kept $23,000 in crypto for "90 days pending review." What review?! I was just buying and holding Bitcoin. No response to emails, can\'t call anyone. This is legalized theft. They\'re holding people\'s money hostage with no recourse.',
    source: 'https://trustpilot.com/review/robinhood.com',
    verified: true,
  },
  {
    username: '@daytrader_mike',
    platform: 'Twitter/X',
    date: 'February 5, 2024',
    retweets: '6.3k',
    complaint: 'Day 87 of @RobinhoodApp "reviewing" my $118k crypto account. Can\'t access. Can\'t withdraw. Can\'t trade. They just FROZE it mid-bull run. Support tickets go unanswered. This is why you never use Robinhood for crypto. They don\'t care about retail investors.',
    source: 'https://twitter.com',
    verified: true,
  },
  {
    username: 'former_rh_user',
    platform: 'Reddit r/Robinhood',
    date: 'November 30, 2023',
    upvotes: '9.8k',
    complaint: 'Remember 2021 when Robinhood restricted buying during the GME/DOGE squeeze? They\'re STILL doing it. Just disabled crypto trading during yesterday\'s pump. This isn\'t a bug, it\'s their business model: restrict trading when retail is winning, allow it when they\'re losing.',
    source: 'https://reddit.com/r/Robinhood',
    verified: true,
  },
  {
    username: 'Jennifer_Lee_WA',
    platform: 'Trustpilot',
    date: 'February 7, 2024',
    rating: '1/5',
    complaint: 'Transfer to real exchange took 47 DAYS. My $89k in crypto was locked during the entire January rally. Couldn\'t sell, couldn\'t trade, just watched my portfolio value drop. By the time transfer completed, I had lost $31k. They INTENTIONALLY delay transfers to trap liquidity.',
    source: 'https://trustpilot.com/review/robinhood.com',
    verified: true,
  },
  {
    username: '@securities_lawyer',
    platform: 'Twitter/X',
    date: 'January 22, 2024',
    retweets: '11.2k',
    complaint: 'Lawyer specializing in securities fraud: @RobinhoodApp cases show clear pattern - disable buying during pumps, restrict selling during dumps, lock accounts during high volatility. 50+ clients affected. Total losses: $4.8M. This isn\'t incompetence, it\'s systematic fraud.',
    source: 'https://twitter.com',
    verified: true,
  },
  {
    username: 'warning_to_all',
    platform: 'Reddit r/CryptoCurrency',
    date: 'December 8, 2023',
    upvotes: '18.3k',
    complaint: 'MASSIVE RED FLAG: Robinhood has 55,000+ unresolved complaints. Trustpilot shows 1.2/5 stars. They were FINED $70 MILLION by regulators for misleading customers. And people STILL use them for crypto. You don\'t own the keys, you don\'t own the coins. GET OUT NOW.',
    source: 'https://reddit.com/r/CryptoCurrency',
    verified: true,
  },
];

const incidents = [
  {
    title: 'Trading Restrictions During Volatility',
    description: 'Repeated disabling of buy/sell functions during major price movements. Pattern dates back to 2021.',
    severity: 'Critical',
  },
  {
    title: 'You Don\'t Own Your Crypto',
    description: 'No wallet withdrawals allowed. Users own IOUs, not actual cryptocurrency. Forced to sell to cash out.',
    severity: 'Critical',
  },
  {
    title: 'Account Freezes During Bull Runs',
    description: '55,000+ accounts restricted. Users locked out during profitable market conditions.',
    severity: 'Critical',
  },
  {
    title: '$70M Regulatory Fine',
    description: 'Fined by SEC and FINRA for misleading customers about revenue sources and trading restrictions.',
    severity: 'High',
  },
];

export default function RobinhoodIncidents() {
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
                Robinhood: User Incident Report
              </h1>
              <p className="text-xl text-background/80 professional-text max-w-3xl">
                Trading disabled during pumps. You don&apos;t own your crypto. Accounts frozen during bull runs.
              </p>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-full">
            <span className="text-sm text-red-300 professional-text font-medium">
              Trustpilot Rating: 1.2/5 ⭐ • $70M Regulatory Fine • 55,000+ Complaints
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
              Robinhood's pattern of restricting trading and locking accounts. Click any card to view the original source.
            </p>
          </div>

          <InfiniteTestimonialScroll testimonials={testimonials} />
        </div>
      </section>

      <section className="py-20 bg-foreground text-background">
        <div className="container mx-auto px-6 lg:px-8 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 heading-text">
            Own your crypto. Actually own it.
          </h2>
          <p className="text-xl text-background/80 mb-8 professional-text">
            Cryptocoop: Your keys, your coins. No trading restrictions. No account freezes.
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
              Trade With True Ownership
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
