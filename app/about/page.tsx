'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Globe, ExternalLink } from 'lucide-react';
import Navbar from '@/components/sections/Navbar';
import Footer from '@/components/sections/Footer';

export default function AboutPage() {
  return (
    <main className="min-h-screen w-full bg-background">
      <Navbar />

      <section className="container mx-auto px-6 lg:px-8 pt-32 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="mb-20">
            <h1 className="text-3xl md:text-4xl lg:text-5xl text-foreground mb-6 heading-text">
              About Cryptocoop
            </h1>
            <p className="text-xl text-muted-foreground professional-text leading-relaxed">
              A leading peer-to-peer cryptocurrency exchange dedicated to accessible, privacy-focused digital asset trading.
            </p>
          </div>

          {/* Our Purpose */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-20"
          >
            <h2 className="text-2xl md:text-3xl text-foreground mb-8 heading-text">
              Our Mission
            </h2>
            <div className="space-y-6 text-[15px] text-muted-foreground professional-text leading-relaxed">
              <p>
                Since Bitcoin's emergence over 17 years ago, there has been a vision of financial systems operating independently of centralized control. Cryptocoop was founded to support this vision by providing accessible, privacy-focused cryptocurrency exchange services.
              </p>
              <p>
                We believe in reducing barriers to cryptocurrency trading while maintaining the highest standards of security and user privacy. Our platform enables individuals worldwide to access digital asset markets through a straightforward, reliable exchange service.
              </p>
            </div>
          </motion.div>

          {/* Our Journey */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-20"
          >
            <h2 className="text-2xl md:text-3xl text-foreground mb-8 heading-text">
              Our Journey
            </h2>
            <div className="space-y-6 text-[15px] text-muted-foreground professional-text leading-relaxed">
              <p>
                Cryptocoop launched as a P2P exchange service in 2020. We began on LocalCryptos, quickly establishing ourselves as a top trader before the platform's closure in 2023. In 2022, we expanded to LocalMonero/AgoraDesk (closed in 2024) and LocalCoinSwap, which has become the world's leading non-custodial P2P platform.
              </p>
              
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-8 border border-primary/20 rounded-lg my-8">
                <h3 className="text-lg text-foreground heading-text mb-4">Platform Performance</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-2xl text-foreground heading-text mb-1">$26M+</p>
                    <p className="text-sm text-muted-foreground professional-text">Total Volume</p>
                  </div>
                  <div>
                    <p className="text-2xl text-foreground heading-text mb-1">21,800+</p>
                    <p className="text-sm text-muted-foreground professional-text">Completed Trades</p>
                  </div>
                  <div>
                    <p className="text-2xl text-foreground heading-text mb-1">4,500+</p>
                    <p className="text-sm text-muted-foreground professional-text">Unique Clients</p>
                  </div>
                </div>
                <div className="mt-6 flex flex-wrap gap-4">
                  <a
                    href="https://localcoinswap.com/profile/cryptocoop"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors professional-text font-medium"
                  >
                    View Profile
                    <ExternalLink className="w-4 h-4" strokeWidth={1.5} />
                  </a>
                  <a
                    href="https://localcoinswap.com/leaderboard"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors professional-text font-medium"
                  >
                    World Ranking
                    <ExternalLink className="w-4 h-4" strokeWidth={1.5} />
                  </a>
                </div>
              </div>

              <p>
                Today, Cryptocoop stands as the world leader on LocalCoinSwap, having built trust with thousands of clients across global markets.
              </p>
            </div>
          </motion.div>

          {/* The Team */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-20"
          >
            <h2 className="text-2xl md:text-3xl text-foreground mb-8 heading-text">
              The Team
            </h2>
            
            <div className="grid gap-6 mb-8">
              <div className="bg-card p-6 border border-border rounded-lg">
                <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-5 h-5 text-foreground" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg text-foreground heading-text mb-3">Leadership</h3>
                <p className="text-[15px] text-muted-foreground professional-text leading-relaxed">
                  Our founders have been involved in cryptocurrency since 2013 and alternative currencies since 2005. Prior to launching Cryptocoop in 2020, they led cooperative business and alternative currency projects in Spain and internationally, focused on building community ecosystems beyond traditional nation-state structures. They have also contributed to digital banking initiatives at the European level.
                </p>
              </div>
            </div>

            <div className="bg-accent/30 p-6 border border-border rounded-lg">
              <div className="flex items-start gap-3">
                <Globe className="w-5 h-5 text-foreground mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                <div>
                  <h3 className="text-base text-foreground heading-text mb-2">Global Operations</h3>
                  <p className="text-[15px] text-muted-foreground professional-text leading-relaxed">
                    To serve as a leading P2P crypto platform, Cryptocoop operates registered businesses across nearly 10 jurisdictions, including the USA, UK, various European Union countries, and Hong Kong.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* What We Value */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-20"
          >
            <h2 className="text-2xl md:text-3xl text-foreground mb-8 heading-text">
              What We Value
            </h2>
            
            <div className="space-y-8">
              <div className="border-l-2 border-primary/30 pl-6">
                <h3 className="text-lg text-foreground heading-text mb-3">Financial Privacy</h3>
                <p className="text-[15px] text-muted-foreground professional-text leading-relaxed">
                  We believe individuals deserve control over their financial information. Our platform is designed to minimize data collection while maintaining secure, reliable trading operations.
                </p>
              </div>

              <div className="border-l-2 border-primary/30 pl-6">
                <h3 className="text-lg text-foreground heading-text mb-3">User Empowerment</h3>
                <p className="text-[15px] text-muted-foreground professional-text leading-relaxed">
                  Technology should serve users, not constrain them. We focus on creating accessible, straightforward solutions that enable cryptocurrency holders to participate fully in the global economy.
                </p>
              </div>

              <div className="border-l-2 border-primary/30 pl-6">
                <h3 className="text-lg text-foreground heading-text mb-3">Practical Innovation</h3>
                <p className="text-[15px] text-muted-foreground professional-text leading-relaxed">
                  Rather than waiting for systemic change, we build practical solutions that work today. Our approach bridges existing infrastructure with cryptocurrency technology to deliver immediate value.
                </p>
              </div>

              <div className="border-l-2 border-primary/30 pl-6">
                <h3 className="text-lg text-foreground heading-text mb-3">Community First</h3>
                <p className="text-[15px] text-muted-foreground professional-text leading-relaxed">
                  Our work is grounded in a commitment to building ecosystems that empower people to create communities beyond traditional institutional boundaries.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Looking Forward */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-gradient-to-br from-accent/20 to-accent/10 p-10 border border-accent/50 rounded-lg"
          >
            <h2 className="text-2xl text-foreground mb-4 heading-text">
              Continued Growth
            </h2>
            <p className="text-[15px] text-muted-foreground professional-text leading-relaxed mb-6">
              With five years of proven P2P exchange operations and thousands of satisfied clients, Cryptocoop continues to expand our services and global reach. Our focus remains on providing reliable, accessible cryptocurrency trading infrastructure for users worldwide.
            </p>
            <p className="text-[15px] text-foreground professional-text font-medium">
              We're committed to maintaining our position as a trusted cryptocurrency exchange while continuously improving our platform and expanding our capabilities.
            </p>
          </motion.div>
        </motion.div>
      </section>
      <Footer />
    </main>
  );
}
