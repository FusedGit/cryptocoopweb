'use client';

import { motion } from 'framer-motion';
import {
  TrendingUp,
  Globe,
  ExternalLink,
  Shield,
  Users,
  Sparkles,
  Heart,
  Target,
  ArrowRight,
} from 'lucide-react';
import Navbar from '@/components/sections/Navbar';
import Footer from '@/components/sections/Footer';
import OptimizedVideo from '@/components/ui/OptimizedVideo';
import { CountUp } from '@/components/ui/CountUp';

const timeline = [
  {
    year: '2013',
    title: 'Early beginnings',
    description:
      'Founders enter the cryptocurrency space, building deep expertise in decentralized finance and alternative currencies.',
  },
  {
    year: '2018',
    title: 'P2P trading starts',
    description:
      'Begin active trading on P2P platforms, quickly establishing a reputation for reliability and speed across global markets.',
  },
  {
    year: '2020',
    title: 'Cryptocoop launches',
    description:
      'Founded as a dedicated P2P exchange service on LocalCryptos, becoming a top trader before the platform closed in 2023.',
  },
  {
    year: '2022',
    title: 'Multi-platform expansion',
    description:
      'Expanded to LocalMonero, AgoraDesk, and LocalCoinSwap, serving thousands of clients across dozens of countries.',
  },
  {
    year: '2024',
    title: 'Market leadership',
    description:
      'Became the number one ranked trader globally on LocalCoinSwap with over $26M in total volume.',
  },
  {
    year: '2026',
    title: 'Scaling operations',
    description:
      'Launching our own exchange platform, business payment gateway, and expanding into new markets worldwide.',
  },
];

const values = [
  {
    icon: Shield,
    title: 'Financial Privacy',
    description:
      'Individuals deserve control over their financial information. Our platform minimizes data collection while maintaining secure, reliable operations.',
  },
  {
    icon: Users,
    title: 'User Empowerment',
    description:
      'Technology should serve users, not constrain them. We create accessible solutions that enable anyone to participate in the global economy.',
  },
  {
    icon: Sparkles,
    title: 'Practical Innovation',
    description:
      'Rather than waiting for systemic change, we build practical solutions that work today. Bridging existing infrastructure with crypto technology.',
  },
  {
    icon: Heart,
    title: 'Community First',
    description:
      'Grounded in a commitment to building ecosystems that empower people to create communities beyond traditional institutional boundaries.',
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen w-full bg-background">
      <Navbar />

      {/* ━━━━━━━━━━━━━━━━ HERO ━━━━━━━━━━━━━━━━ */}
      <section className="relative w-full min-h-screen pt-32 md:pt-44 pb-48 md:pb-64 overflow-hidden flex items-center">
        <div className="absolute inset-0">
          <OptimizedVideo
            src="/assets/09.mp4"
            className="w-full h-full object-cover"
            priority={true}
            preload="auto"
            autoPlay
            loop
            muted
            playsInline
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background md:hidden" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background hidden md:block" />
        </div>

        <div className="relative z-10 container mx-auto px-6 lg:px-8 max-w-5xl">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 22, delay: 0.1 }}
            className="text-xs tracking-[0.25em] uppercase text-muted-foreground professional-text mb-4"
          >
            About Cryptocoop
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 180, damping: 20, delay: 0.2 }}
            className="text-[2.5rem] md:text-6xl lg:text-7xl heading-text text-foreground leading-[0.95] tracking-[-0.03em] max-w-4xl"
          >
            Building the future
            <br />
            of private finance
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 180, damping: 22, delay: 0.4 }}
            className="mt-6 text-lg md:text-xl text-muted-foreground professional-text leading-relaxed max-w-2xl"
          >
            A leading peer-to-peer cryptocurrency exchange dedicated to
            accessible, privacy-focused digital asset trading. Operating
            globally since 2018.
          </motion.p>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━ STATS ━━━━━━━━━━━━━━━━ */}
      <section className="py-16 md:py-20 border-y border-border">
        <div className="container mx-auto px-6 lg:px-8 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
          >
            <div className="text-center">
              <p className="heading-text text-3xl md:text-4xl text-foreground">
                $<CountUp end={26} className="heading-text" />M+
              </p>
              <p className="text-sm text-muted-foreground professional-text mt-1">
                Total volume traded
              </p>
            </div>
            <div className="text-center">
              <p className="heading-text text-3xl md:text-4xl text-foreground">
21,<CountUp end={800} className="heading-text" />+
              </p>
              <p className="text-sm text-muted-foreground professional-text mt-1">
                Completed trades
              </p>
            </div>
            <div className="text-center">
              <p className="heading-text text-3xl md:text-4xl text-foreground">
4,<CountUp end={500} className="heading-text" />+
              </p>
              <p className="text-sm text-muted-foreground professional-text mt-1">
                Unique clients
              </p>
            </div>
            <div className="text-center">
              <p className="heading-text text-3xl md:text-4xl text-foreground">
                <CountUp end={10} className="heading-text" />
              </p>
              <p className="text-sm text-muted-foreground professional-text mt-1">
                Jurisdictions
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━ MISSION ━━━━━━━━━━━━━━━━ */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6 lg:px-8 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground professional-text mb-3">
                Our Mission
              </p>
              <h2 className="text-3xl md:text-4xl heading-text text-foreground leading-tight">
                Financial freedom
                <br />
                without compromise
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="space-y-5 text-[15px] text-muted-foreground professional-text leading-relaxed"
            >
              <p>
                Since Bitcoin emerged over 17 years ago, there has been a vision
                of financial systems operating independently of centralized
                control. Cryptocoop was founded to support this vision by
                providing accessible, privacy-focused cryptocurrency exchange
                services.
              </p>
              <p>
                We believe in reducing barriers to cryptocurrency trading while
                maintaining the highest standards of security and user privacy.
                Our platform enables individuals worldwide to access digital
                asset markets through a straightforward, reliable exchange
                service.
              </p>
              <p>
                No KYC. No surveillance. No arbitrary restrictions on how you
                use your own money. Just a fast, secure platform that respects
                your right to transact privately.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━ TIMELINE ━━━━━━━━━━━━━━━━ */}
      <section className="py-24 md:py-32 bg-gradient-to-b from-accent/10 to-background">
        <div className="container mx-auto px-6 lg:px-8 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground professional-text mb-3">
              Our Journey
            </p>
            <h2 className="text-3xl md:text-5xl heading-text text-foreground">
              From P2P trading to global platform
            </h2>
          </motion.div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[19px] md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-border" />

            <div className="space-y-12">
              {timeline.map((item, idx) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05 * idx }}
                  className={`relative flex flex-col md:flex-row gap-6 md:gap-12 ${
                    idx % 2 === 0
                      ? 'md:flex-row'
                      : 'md:flex-row-reverse md:text-right'
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-[15px] md:left-1/2 md:-translate-x-1/2 top-1 w-[9px] h-[9px] rounded-full bg-foreground ring-4 ring-background z-10" />

                  {/* Content */}
                  <div
                    className={`flex-1 pl-12 md:pl-0 ${
                      idx % 2 === 0
                        ? 'md:pr-16 md:text-right'
                        : 'md:pl-16 md:text-left'
                    }`}
                  >
                    <p className="text-sm heading-text text-primary mb-1">
                      {item.year}
                    </p>
                    <h3 className="text-lg heading-text text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground professional-text leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Spacer for the other side */}
                  <div className="hidden md:block flex-1" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Performance card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 bg-gradient-to-br from-primary/10 to-primary/5 p-8 md:p-10 border border-primary/20 rounded-xl"
          >
            <h3 className="text-xl heading-text text-foreground mb-6">
              Verified track record
            </h3>
            <p className="text-[15px] text-muted-foreground professional-text leading-relaxed mb-6">
              Our trading history is publicly verifiable. Over 21,800 completed
              trades with $26M+ in volume, built entirely on reputation and
              consistent execution. Number one ranked trader globally on
              LocalCoinSwap.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://localcoinswap.com/profile/cryptocoop"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors professional-text font-medium"
              >
                View Trading Profile
                <ExternalLink className="w-3.5 h-3.5" strokeWidth={1.5} />
              </a>
              <a
                href="https://localcoinswap.com/leaderboard"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors professional-text font-medium"
              >
                Global Leaderboard
                <ExternalLink className="w-3.5 h-3.5" strokeWidth={1.5} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━ TEAM ━━━━━━━━━━━━━━━━ */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6 lg:px-8 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground professional-text mb-3">
              The Team
            </p>
            <h2 className="text-3xl md:text-5xl heading-text text-foreground">
              Built by builders
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card border border-border rounded-xl p-8"
            >
              <TrendingUp
                className="w-5 h-5 text-foreground mb-5"
                strokeWidth={1.5}
              />
              <h3 className="text-lg heading-text text-foreground mb-3">
                Leadership
              </h3>
              <p className="text-sm text-muted-foreground professional-text leading-relaxed">
                Our founders have been involved in cryptocurrency since 2013 and
                alternative currencies since 2005. Before launching Cryptocoop
                in 2020, they led cooperative business and alternative currency
                projects in Spain and internationally, building community
                ecosystems beyond traditional structures. They have also
                contributed to digital banking initiatives at the European
                level.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-card border border-border rounded-xl p-8"
            >
              <Globe
                className="w-5 h-5 text-foreground mb-5"
                strokeWidth={1.5}
              />
              <h3 className="text-lg heading-text text-foreground mb-3">
                Global operations
              </h3>
              <p className="text-sm text-muted-foreground professional-text leading-relaxed">
                Cryptocoop operates registered businesses across nearly 10
                jurisdictions, including the USA, UK, various European Union
                countries, and Hong Kong. This multi-jurisdiction structure
                enables us to serve clients worldwide while maintaining
                compliance with local requirements in every market.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━ VALUES ━━━━━━━━━━━━━━━━ */}
      <section className="py-24 md:py-32 bg-gradient-to-b from-accent/10 to-background">
        <div className="container mx-auto px-6 lg:px-8 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground professional-text mb-3">
              What We Value
            </p>
            <h2 className="text-3xl md:text-5xl heading-text text-foreground">
              Principles that guide us
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6">
            {values.map((value, idx) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.08 * idx }}
                className="bg-card border border-border rounded-xl p-7 hover:border-foreground/15 transition-colors"
              >
                <value.icon
                  className="w-5 h-5 text-foreground mb-4"
                  strokeWidth={1.5}
                />
                <h3 className="text-base heading-text text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-muted-foreground professional-text leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━ CTA ━━━━━━━━━━━━━━━━ */}
      <section className="py-24 md:py-36">
        <div className="container mx-auto px-6 lg:px-8 max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl md:text-6xl heading-text text-foreground leading-[0.95]">
              Join thousands who
              <br />
              trade with privacy
            </h2>
            <p className="mt-6 text-base md:text-lg text-muted-foreground professional-text leading-relaxed max-w-xl mx-auto">
              Five years of proven operations, thousands of satisfied clients,
              and a commitment to financial privacy that never wavers.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mt-10">
              <a
                href="https://exchange.cryptocoop.info"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-foreground text-background px-7 py-3.5 rounded-full professional-text font-medium hover:opacity-90 transition-opacity text-sm"
              >
                Open Exchange
                <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
              </a>
              <a
                href="https://t.me/cryptocoop2024"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-card border border-border text-foreground px-7 py-3.5 rounded-full professional-text font-medium hover:bg-accent/30 transition-colors text-sm"
              >
                Contact Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
