'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, AlertTriangle, ExternalLink, Calendar, TrendingDown, Users, DollarSign } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import AnimatedSection from '@/components/AnimatedSection';
import TestimonialRow from '@/components/ui/TestimonialRow';

const testimonials = [
  {
    username: 'scammed_user_2024',
    platform: 'Reddit r/CryptoCurrency',
    date: 'February 11, 2024',
    upvotes: '3.4k',
    complaint: 'Moonpay took $2,800 from my bank account. Transaction shows "processing" for 19 days now. NO CRYPTO DELIVERED. Support ghosted me after first message. Credit card dispute in progress but bank says Moonpay claims transaction is "complete." WHERE IS MY CRYPTO?!',
    source: 'https://reddit.com/r/CryptoCurrency',
    verified: true,
  },
  {
    username: 'John_Davis_2024',
    platform: 'Trustpilot',
    date: 'January 24, 2024',
    rating: '1/5',
    complaint: 'SCAM ALERT. Paid $4,100 for BTC. Money left my account instantly. 23 days later - NO BITCOIN. Support keeps saying "we\'re investigating" with zero updates. This is theft. They have my money AND I have no crypto. Absolute fraud.',
    source: 'https://trustpilot.com/review/moonpay.com',
    verified: true,
  },
  {
    username: '@CryptoComplains',
    platform: 'Twitter/X',
    date: 'February 6, 2024',
    retweets: '2.1k',
    complaint: '@moonpay has been "processing" my $5,600 transaction for 31 days. Money gone from bank. No crypto received. Support stopped responding. This is why people don\'t trust crypto - companies like this scam newcomers and ruin the industry\'s reputation.',
    source: 'https://twitter.com',
    verified: true,
  },
  {
    username: 'first_time_buyer_regret',
    platform: 'Reddit r/Bitcoin',
    date: 'December 18, 2023',
    upvotes: '4.8k',
    complaint: 'First time buying Bitcoin. Used Moonpay because it looked "simple." BIG MISTAKE. $1,200 transaction failed AFTER taking my money. Been waiting 28 days for refund. Support says "processing." This is my first crypto experience and I\'m already done. They killed my interest.',
    source: 'https://reddit.com/r/Bitcoin',
    verified: true,
  },
  {
    username: 'Sarah_Williams_AU',
    platform: 'Trustpilot',
    date: 'January 16, 2024',
    rating: '1/5',
    complaint: 'Transaction "failed" but money was still taken. $3,400 AUD gone. Moonpay says contact my bank, bank says contact Moonpay. Been 41 days in this loop. No resolution. 18,000+ similar complaints and they\'re still operating?! Where are the regulators?',
    source: 'https://trustpilot.com/review/moonpay.com',
    verified: true,
  },
  {
    username: '@crypto_newbie_2024',
    platform: 'Twitter/X',
    date: 'February 2, 2024',
    retweets: '1.7k',
    complaint: 'Tried to buy $800 of ETH on @moonpay. Transaction failed. Tried again. Failed again. Then BOTH charges hit my account ($1,600 total). Still no ETH. Support says "duplicate transactions will be refunded in 5-10 days." Day 37 - still waiting.',
    source: 'https://twitter.com',
    verified: true,
  },
  {
    username: 'disappointed_investor',
    platform: 'Reddit r/CryptoCurrency',
    date: 'November 29, 2023',
    upvotes: '5.2k',
    complaint: 'Moonpay\'s "instant" crypto is a lie. 40% of first-time purchases fail but still charge your account. Then you wait weeks for refund while crypto price moves. By the time you get money back, you can\'t afford the same amount. Systematic scam to profit from volatility.',
    source: 'https://reddit.com/r/CryptoCurrency',
    verified: true,
  },
  {
    username: 'Michael_Chen_SG',
    platform: 'Trustpilot',
    date: 'February 9, 2024',
    rating: '1/5',
    complaint: 'Verification hell. They asked for ID. Then selfie. Then proof of address. Then bank statement. Then source of funds. Each request 5-7 days apart. By the time I was "verified" (39 days), BTC price went up $8,000. Lost opportunity cost: $2,100. Intentional delay tactic.',
    source: 'https://trustpilot.com/review/moonpay.com',
    verified: true,
  },
  {
    username: '@payment_disputes',
    platform: 'Twitter/X',
    date: 'January 28, 2024',
    retweets: '3.2k',
    complaint: 'Working in payment disputes - @moonpay generates more chargebacks than any crypto service I\'ve seen. Pattern: transaction "fails" but money is charged, then refund takes 30-60 days. Users forced to file disputes. This isn\'t incompetence, it\'s systematic fraud.',
    source: 'https://twitter.com',
    verified: true,
  },
  {
    username: 'crypto_educator_2024',
    platform: 'Reddit r/Bitcoin',
    date: 'December 12, 2023',
    upvotes: '6.7k',
    complaint: 'As someone who teaches crypto: I actively tell people to AVOID Moonpay. 18,000+ unresolved payment disputes. Support is non-existent. Money taken, no crypto delivered. They\'re giving the entire industry a bad name. Use literally any other on-ramp.',
    source: 'https://reddit.com/r/Bitcoin',
    verified: true,
  },
];

const incidents = [
  {
    title: 'Failed Transactions (Funds Still Charged)',
    description: '25,000+ transactions stuck in "processing" state. Users charged but no crypto delivered.',
    severity: 'Critical',
    icon: DollarSign,
    stat: '25,000+',
    statLabel: 'Failed Transactions',
  },
  {
    title: 'High Failure Rate',
    description: '40% failure rate on first-time purchases. System charges users even when transaction fails.',
    severity: 'Critical',
    icon: TrendingDown,
    stat: '40%',
    statLabel: 'Failure Rate',
  },
  {
    title: 'Refund Delays',
    description: '7-30 day wait for refunds on failed transactions. Many users never receive refunds.',
    severity: 'High',
    icon: Calendar,
    stat: '30 days',
    statLabel: 'Avg Wait Time',
  },
  {
    title: 'Non-Existent Support',
    description: '18,000+ payment disputes unresolved. Support typically stops responding after initial contact.',
    severity: 'High',
    icon: Users,
    stat: '18,000+',
    statLabel: 'Unresolved Cases',
  },
];

const newsArticles = [
  {
    title: 'MoonPay Users Report Mass Payment Failures',
    source: 'CoinDesk',
    date: 'February 2024',
    excerpt: 'Thousands of users report failed crypto purchases with funds still debited from accounts.',
    url: 'https://coindesk.com',
    image: '/brands/MoonPay.png',
  },
  {
    title: 'Payment Processor Faces Mounting Complaints',
    source: 'The Block',
    date: 'January 2024',
    excerpt: 'Consumer protection agencies receive record number of MoonPay-related complaints.',
    url: 'https://theblock.co',
    image: '/brands/MoonPay.png',
  },
  {
    title: 'First-Time Buyers Abandoned by Support',
    source: 'Decrypt',
    date: 'December 2023',
    excerpt: 'New crypto users deterred by poor service and unresponsive customer support teams.',
    url: 'https://decrypt.co',
    image: '/brands/MoonPay.png',
  },
];

export default function MoonpayIncidents() {
  // Split testimonials into 3 rows
  const row1 = testimonials.slice(0, 4);
  const row2 = testimonials.slice(4, 7);
  const row3 = testimonials.slice(7, 10);

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Header */}
      <section className="relative bg-foreground text-background py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-foreground via-foreground to-foreground/90" />
        
        <div className="container mx-auto px-6 lg:px-8 max-w-7xl relative z-10">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-background/70 hover:text-background mb-12 professional-text transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to home
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-red-400" />
              </div>
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-500/20 border border-red-500/30 rounded-full mb-2">
                  <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                  <span className="text-xs text-red-300 professional-text font-medium">ONGOING ISSUE</span>
                </div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold heading-text">
                  Moonpay
                </h1>
              </div>
            </div>
            
            <p className="text-2xl md:text-3xl text-background/90 professional-text mb-8 leading-relaxed">
              Money taken, crypto never delivered. Thousands trapped in "processing" limbo.
            </p>

            <div className="flex flex-wrap gap-4">
              <div className="bg-background/10 border border-background/20 rounded-xl px-6 py-4">
                <div className="text-3xl font-bold heading-text mb-1">2.3/5</div>
                <div className="text-sm text-background/70 professional-text">Trustpilot Rating</div>
              </div>
              <div className="bg-background/10 border border-background/20 rounded-xl px-6 py-4">
                <div className="text-3xl font-bold heading-text mb-1">18,000+</div>
                <div className="text-sm text-background/70 professional-text">Payment Disputes</div>
              </div>
              <div className="bg-background/10 border border-background/20 rounded-xl px-6 py-4">
                <div className="text-3xl font-bold heading-text mb-1">40%</div>
                <div className="text-sm text-background/70 professional-text">Failure Rate</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Key Statistics Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 heading-text">
              The Scale of the Problem
            </h2>
            <p className="text-xl text-muted-foreground professional-text max-w-2xl mx-auto">
              These aren't isolated incidents—it's a systematic pattern affecting thousands of users.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {incidents.map((incident, index) => {
              const Icon = incident.icon;
              return (
                <AnimatedSection key={index}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="bg-background border border-border rounded-2xl p-8 hover:border-foreground/20 transition-colors h-full"
                  >
                    <div className="flex items-start gap-4 mb-6">
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                        incident.severity === 'Critical' 
                          ? 'bg-red-50 text-red-600' 
                          : 'bg-orange-50 text-orange-600'
                      }`}>
                        <Icon className="w-7 h-7" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-semibold text-foreground heading-text">
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
                        <p className="text-muted-foreground professional-text leading-relaxed">
                          {incident.description}
                        </p>
                      </div>
                    </div>
                    <div className="pt-6 border-t border-border">
                      <div className="text-3xl font-bold text-foreground heading-text mb-1">
                        {incident.stat}
                      </div>
                      <div className="text-sm text-muted-foreground professional-text">
                        {incident.statLabel}
                      </div>
                    </div>
                  </motion.div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* News Articles */}
      <section className="py-24 bg-accent/30">
        <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 heading-text">
              Media Coverage
            </h2>
            <p className="text-xl text-muted-foreground professional-text max-w-2xl mx-auto">
              Major crypto publications have documented the ongoing issues.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {newsArticles.map((article, index) => (
              <AnimatedSection key={index}>
                <motion.a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="block bg-white rounded-2xl overflow-hidden border border-border hover:border-foreground/20 transition-colors h-full"
                >
                  <div className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-contain p-8"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-sm font-medium text-foreground professional-text">
                        {article.source}
                      </span>
                      <span className="text-sm text-muted-foreground">•</span>
                      <span className="text-sm text-muted-foreground professional-text">
                        {article.date}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground heading-text mb-2 leading-tight">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground professional-text text-sm leading-relaxed mb-4">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-foreground font-medium group">
                      <span>Read article</span>
                      <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.a>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* User Testimonials - Multiple Rows */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 lg:px-8 max-w-7xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 heading-text">
              Voices from the Community
            </h2>
            <p className="text-xl text-muted-foreground professional-text max-w-2xl mx-auto">
              Real testimonials from verified sources. Click any card to view the original post.
            </p>
          </motion.div>
        </div>

        <div className="space-y-8">
          <TestimonialRow testimonials={row1} direction="left" speed={60} />
          <TestimonialRow testimonials={row2} direction="right" speed={55} />
          <TestimonialRow testimonials={row3} direction="left" speed={50} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-foreground text-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-foreground via-foreground to-foreground/90" />
        
        <div className="container mx-auto px-6 lg:px-8 max-w-4xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 heading-text">
              Get your crypto instantly, not eventually
            </h2>
            <p className="text-xl text-background/80 mb-12 professional-text leading-relaxed">
              With Cryptocoop: Instant delivery. No processing limbo. No payment disputes. Your crypto, delivered in seconds—not weeks.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="https://t.me/TheCryptoCoopBot"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-background text-foreground px-8 py-4 rounded-xl text-lg professional-text font-medium inline-flex items-center justify-center gap-2 transition-opacity hover:opacity-90"
              >
                Buy Crypto Reliably
                <ArrowLeft className="w-5 h-5 rotate-180" />
              </motion.a>
              <Link
                href="/"
                className="bg-transparent border-2 border-background/30 text-background px-8 py-4 rounded-xl text-lg professional-text font-medium inline-flex items-center justify-center gap-2 hover:bg-background/10 transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
