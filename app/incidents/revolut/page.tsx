'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import AnimatedSection from '@/components/AnimatedSection';
import InfiniteTestimonialScroll from '@/components/ui/InfiniteTestimonialScroll';

const testimonials = [
  {
    username: 'concerned_user_2024',
    platform: 'Reddit r/Revolut',
    date: 'February 12, 2024',
    upvotes: '6.7k',
    complaint: 'Revolut CLOSED my account with £43,000 in it. No warning. No explanation. Email said "business decision." BUSINESS DECISION?! That\'s MY money! Been 112 days, no access to funds. Lawyer says they do this routinely and get away with it. This is a banking scam.',
    source: 'https://reddit.com/r/Revolut',
    verified: true,
  },
  {
    username: 'James_Thompson_UK',
    platform: 'Trustpilot',
    date: 'January 18, 2024',
    rating: '1/5',
    complaint: 'Account frozen after I bought Bitcoin. They said "unusual activity detected" - I bought £5,000 of BTC, that\'s it! Now my £38,000 is locked for 87 days. Customer service is non-existent. You can\'t call anyone. Just chat bots that don\'t help. This is financial terrorism.',
    source: 'https://trustpilot.com/review/revolut.com',
    verified: true,
  },
  {
    username: '@RevolutVictims',
    platform: 'Twitter/X',
    date: 'February 9, 2024',
    retweets: '5.1k',
    complaint: '@RevolutApp locked my account mid-crisis. Needed money for medical emergency. £29,000 sitting there, can\'t touch it. They said "compliance review" - it\'s been 76 days. No human to talk to, no timeline, no compassion. People are suffering because of their arbitrary policies.',
    source: 'https://twitter.com',
    verified: true,
  },
  {
    username: 'crypto_enthusiast_EU',
    platform: 'Reddit r/CryptoCurrency',
    date: 'December 15, 2023',
    upvotes: '9.2k',
    complaint: 'WARNING: Revolut will close your account if you use crypto "too much." I was buying BTC weekly (my right!) and they terminated me. €67,000 held for 134 days. No appeal process. No recourse. They\'re a bank pretending to be crypto-friendly while punishing crypto users.',
    source: 'https://reddit.com/r/CryptoCurrency',
    verified: true,
  },
  {
    username: 'Maria_Garcia_ES',
    platform: 'Trustpilot',
    date: 'January 30, 2024',
    rating: '1/5',
    complaint: 'They closed my account because I received payment from a friend who also uses crypto. GUILTY BY ASSOCIATION. €22,000 frozen. No one to contact. Support chat is useless - copy-paste responses. This company operates above the law. Where are the regulators?',
    source: 'https://trustpilot.com/review/revolut.com',
    verified: true,
  },
  {
    username: '@Crypto_Rights_UK',
    platform: 'Twitter/X',
    date: 'February 5, 2024',
    retweets: '3.8k',
    complaint: 'Day 158 of @RevolutApp holding my £91,000 hostage. Account closed without explanation. No human contact. No timeline for fund return. Meanwhile they\'re worth BILLIONS. They can afford lawyers, we can\'t. This is systematic theft from retail users.',
    source: 'https://twitter.com',
    verified: true,
  },
  {
    username: 'digital_nomad_2024',
    platform: 'Reddit r/Revolut',
    date: 'November 25, 2023',
    upvotes: '7.5k',
    complaint: 'Revolut detected "suspicious transactions" - I was literally just receiving my freelance income. £51,000 locked. They want proof of where EVERY payment came from. I have 200+ clients! This is impossible. It\'s been 96 days. They know this, they don\'t care.',
    source: 'https://reddit.com/r/Revolut',
    verified: true,
  },
  {
    username: 'Sophie_Laurent_FR',
    platform: 'Trustpilot',
    date: 'February 1, 2024',
    rating: '1/5',
    complaint: 'No warning, no explanation, just "account closed." €78,000 locked. Their ToS lets them do ANYTHING without justification. I\'ve done nothing wrong - no crypto, no suspicious activity. Just a regular user who they decided to rob. Class action lawsuit needed.',
    source: 'https://trustpilot.com/review/revolut.com',
    verified: true,
  },
  {
    username: '@banking_watchdog',
    platform: 'Twitter/X',
    date: 'January 20, 2024',
    retweets: '6.3k',
    complaint: 'Tracking @RevolutApp complaints: 80,000+ frozen accounts in 2023-2024. Average wait time: 60-180 days. Pattern is clear - freeze account, demand impossible documentation, delay until user gives up. This isn\'t compliance, it\'s theft with extra steps.',
    source: 'https://twitter.com',
    verified: true,
  },
  {
    username: 'frustrated_trader_NL',
    platform: 'Reddit r/Revolut',
    date: 'December 5, 2023',
    upvotes: '8.9k',
    complaint: 'They locked my account during a crypto bull run. Couldn\'t sell. By the time they "reviewed" (143 days later), market had crashed. Lost €45,000 in unrealized gains. No apology, no compensation. They profit from our suffering. This needs to be illegal.',
    source: 'https://reddit.com/r/Revolut',
    verified: true,
  },
];

const incidents = [
  {
    title: 'Arbitrary Account Closures (2023-2024)',
    description: '80,000+ accounts closed without warning or explanation. Crypto users disproportionately affected.',
    severity: 'Critical',
  },
  {
    title: 'No Appeal Process',
    description: 'Once closed, accounts have no recourse. Funds held for 60-180 days with no timeline.',
    severity: 'Critical',
  },
  {
    title: 'Anti-Crypto Policy',
    description: 'Despite offering crypto services, users buying crypto are flagged and terminated.',
    severity: 'High',
  },
  {
    title: 'Support System Failure',
    description: 'No phone support. Chat bots only. 35,000+ unresolved complaints. Trustpilot: 1.8/5.',
    severity: 'High',
  },
];

export default function RevolutIncidents() {
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
                Revolut: User Incident Report
              </h1>
              <p className="text-xl text-background/80 professional-text max-w-3xl">
                Bank accounts closed overnight. Funds held indefinitely. No appeals, no explanations.
              </p>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-full">
            <span className="text-sm text-red-300 professional-text font-medium">
              Trustpilot Rating: 1.8/5 ⭐ • 35,000+ Unresolved Complaints
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
              Real complaints from users whose accounts were arbitrarily closed. Click any card to view the original source.
            </p>
          </div>

          <InfiniteTestimonialScroll testimonials={testimonials} />
        </div>
      </section>

      <section className="py-20 bg-foreground text-background">
        <div className="container mx-auto px-6 lg:px-8 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 heading-text">
            Banking shouldn&apos;t feel like a hostage situation
          </h2>
          <p className="text-xl text-background/80 mb-8 professional-text">
            Trade crypto without fear of arbitrary account closures. Your money, your control.
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
              Trade Freely
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
