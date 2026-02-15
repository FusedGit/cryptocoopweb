'use client';

import { motion } from 'framer-motion';
import { ArrowDownUp, Shield, Zap, Globe, TrendingUp, Wallet, Check } from 'lucide-react';
import OptimizedVideo from '@/components/ui/OptimizedVideo';
import AnimatedSection from '@/components/AnimatedSection';

const features = [
  {
    id: 'buy',
    icon: TrendingUp,
    title: 'Buy Crypto',
    subtitle: 'Simple on-ramp solutions',
    description: 'Purchase cryptocurrency without limits or restrictions. Whether you need $100 or $100,000, we facilitate smooth transactions and help move larger amounts with ease. No complications, no arbitrary caps—just straightforward access to crypto.',
    video: '/assets/06.mp4',
    stats: [
      { label: 'Volume limits', value: 'None' },
      { label: 'Payment methods', value: '10+' },
      { label: 'Supported regions', value: 'Global' }
    ],
    gradient: 'from-accent to-accent/50',
    accentColor: 'text-foreground'
  },
  {
    id: 'sell',
    icon: Wallet,
    title: 'Sell Crypto',
    subtitle: 'Flexible off-ramp solutions',
    description: 'Convert your crypto to fiat without restrictions. We support higher amounts and work to meet your needs, making it easy to move significant value off-chain. Uncomplicated processes designed to handle transactions of all sizes.',
    video: '/assets/07.mp4',
    stats: [
      { label: 'Withdrawal limits', value: 'Flexible' },
      { label: 'Settlement', value: 'Direct' },
      { label: 'Currencies', value: 'Major fiat' }
    ],
    gradient: 'from-accent to-accent/50',
    accentColor: 'text-foreground'
  },
  {
    id: 'swap',
    icon: ArrowDownUp,
    title: 'Instant Swap',
    subtitle: 'Exchange any cryptocurrency',
    description: 'Swap between all major cryptocurrencies including privacy-focused coins like Monero. We support the full spectrum of digital assets, ensuring you can exchange what matters to you without restrictions.',
    video: '/assets/10.mp4',
    stats: [
      { label: 'Trading pairs', value: '1000+' },
      { label: 'Privacy coins', value: 'Supported' },
      { label: 'Hidden fees', value: 'None' }
    ],
    gradient: 'from-accent to-accent/50',
    accentColor: 'text-foreground'
  },
  {
    id: 'coins',
    icon: Globe,
    title: 'All Coins Supported',
    subtitle: '150+ cryptocurrencies available',
    description: 'From Bitcoin and Ethereum to privacy coins and emerging altcoins. We support the entire crypto ecosystem without restrictions, giving you access to the full range of digital assets.',
    video: '/assets/01.mp4',
    stats: [
      { label: 'Cryptocurrencies', value: '150+' },
      { label: 'Networks', value: '20+' },
      { label: 'Restrictions', value: 'None' }
    ],
    gradient: 'from-accent to-accent/50',
    accentColor: 'text-foreground'
  },
  {
    id: 'nocustody',
    icon: Shield,
    title: 'Non-Custodial Design',
    subtitle: 'Your funds stay yours',
    description: 'We never hold your funds. Our non-custodial approach means your assets are always safe and under your control. Rather than locking funds for questions or disputes, we simply won\'t accept a deal if something seems unclear. Your security through simplicity.',
    video: '/assets/08.mp4',
    stats: [
      { label: 'Custody', value: 'Never' },
      { label: 'Funds locked', value: '$0' },
      { label: 'Your control', value: '100%' }
    ],
    gradient: 'from-accent to-accent/50',
    accentColor: 'text-foreground'
  }
];

// Extract check items to module scope to avoid recreating on every render (React Best Practice 6.3)
const checkItemsMap = {
  buy: ['No maximum limits', 'Easy and uncomplicated', 'Support for larger amounts'],
  sell: ['Flexible withdrawal options', 'Smooth off-ramp process', 'Handle any amount'],
  swap: ['All cryptocurrencies supported', 'Privacy coins included', 'Transparent pricing'],
  coins: ['150+ digital assets', 'Regular new listings', 'No trading restrictions'],
  nocustody: ['Never hold your funds', 'No fund locks', 'Complete transparency']
} as const;

// Spring animation from Motion MCP
const springMedium = '950ms linear(0, 0.1691, 0.529, 0.891, 1.1415, 1.2474, 1.2338, 1.1528, 1.0568, 0.9817, 0.9424, 0.9368, 0.9532, 0.9775, 0.9991, 1.0123, 1.0164, 1.0137, 1.0078, 1.0019, 0.9977, 0.996, 0.9962, 0.9975, 0.999, 1.0003, 1.0009, 1, 1.0008, 1.0004, 1, 1)';

export default function EverythingYouNeed() {
  return (
    <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden bg-gradient-to-b from-white via-background to-white">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(120,119,198,0.05),transparent_40%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(74,222,128,0.05),transparent_40%)]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        {/* Header */}
        <AnimatedSection>
          <div className="text-center mb-12 md:mb-16 lg:mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-accent rounded-full px-3 py-1.5 md:px-4 md:py-2 mb-4 md:mb-6"
            >
              <Zap className="w-3.5 h-3.5 md:w-4 md:h-4 text-foreground" />
              <span className="text-xs md:text-sm font-medium text-foreground professional-text">
                Everything you need
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 md:mb-6 heading-text px-4"
            >
              Everything you need.
              <br />
              <span className="text-muted-foreground">Nothing you don't.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto professional-text px-4"
            >
              While other exchanges demand your identity, track your trades, and limit your freedom—we do the opposite.
            </motion.p>
          </div>
        </AnimatedSection>

        {/* Features Grid */}
        <div className="space-y-16 md:space-y-24 lg:space-y-32">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center ${
                  isEven ? '' : 'lg:grid-flow-dense'
                }`}
              >
                {/* Content */}
                <div className={isEven ? '' : 'lg:col-start-2'}>
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    {/* Icon Badge */}
                    <motion.div
                      className={`inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br ${feature.gradient} mb-4 md:mb-6`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      style={{ transition: `transform ${springMedium}` }}
                    >
                      <Icon className={`w-6 h-6 md:w-8 md:h-8 ${feature.accentColor}`} />
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2 md:mb-3 heading-text">
                      {feature.title}
                    </h3>
                    
                    {/* Subtitle */}
                    <p className="text-base md:text-lg font-medium mb-3 md:mb-4 text-muted-foreground">
                      {feature.subtitle}
                    </p>

                    {/* Description */}
                    <p className="text-sm md:text-base lg:text-lg text-muted-foreground mb-6 md:mb-8 professional-text leading-relaxed">
                      {feature.description}
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
                      {feature.stats.map((stat, statIndex) => (
                        <motion.div
                          key={statIndex}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.4 + statIndex * 0.1 }}
                          className="relative"
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-accent to-transparent rounded-lg md:rounded-xl opacity-50" />
                          <div className="relative bg-white rounded-lg md:rounded-xl p-2 sm:p-3 md:p-4 border border-border">
                            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-foreground mb-0.5 md:mb-1">
                              {stat.value}
                            </p>
                            <p className="text-[10px] sm:text-xs text-muted-foreground professional-text leading-tight">
                              {stat.label}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Check marks - Dynamic per feature */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.7 }}
                      className="mt-6 md:mt-8 space-y-2 md:space-y-3"
                    >
                      {(checkItemsMap[feature.id as keyof typeof checkItemsMap] || []).map((item, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.8 + idx * 0.1 }}
                            className="flex items-center gap-3"
                          >
                            <div className="flex-shrink-0 w-5 h-5 md:w-6 md:h-6 rounded-full bg-accent flex items-center justify-center">
                            <Check className="w-3 h-3 md:w-4 md:h-4 text-foreground" strokeWidth={3} />
                            </div>
                            <span className="text-xs md:text-sm text-muted-foreground professional-text">
                              {item}
                            </span>
                          </motion.div>
                        ))}
                    </motion.div>
                  </motion.div>
                </div>

                {/* Video */}
                <div className={isEven ? '' : 'lg:col-start-1 lg:row-start-1'}>
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="relative group"
                  >
                    {/* Video Container */}
                    <div className="relative rounded-2xl md:rounded-3xl overflow-hidden border border-border refined-shadow">
                      <OptimizedVideo
                        src={feature.video}
                        className="w-full h-auto"
                        priority={index === 0}
                      />
                      
                      {/* Gradient Overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 md:group-hover:opacity-30 transition-opacity duration-500`} />
                      
                      {/* Floating Badge */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
                        className="absolute top-3 left-3 md:top-6 md:left-6 bg-white/90 backdrop-blur-sm rounded-xl md:rounded-2xl px-3 py-2 md:px-4 md:py-3 elevated-shadow"
                      >
                        <div className="flex items-center gap-1.5 md:gap-2">
                          <Icon className="w-4 h-4 md:w-5 md:h-5 text-foreground" />
                          <span className="text-xs md:text-sm font-bold text-foreground professional-text">
                            {feature.title}
                          </span>
                        </div>
                      </motion.div>

                      {/* Animated border glow */}
                      <motion.div
                        className="absolute inset-0 rounded-3xl bg-gradient-to-br from-foreground/5 to-transparent"
                        style={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>

                    {/* Decorative Elements */}
                    <motion.div
                      className={`absolute -z-10 inset-0 bg-gradient-to-br ${feature.gradient} rounded-2xl md:rounded-3xl blur-2xl md:blur-3xl opacity-20`}
                      animate={{
                        scale: [1, 1.05, 1],
                        opacity: [0.2, 0.3, 0.2]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: 'easeInOut'
                      }}
                    />
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <AnimatedSection>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 md:mt-20 lg:mt-24 text-center"
          >
            <div className="bg-gradient-to-br from-foreground to-foreground/80 rounded-2xl md:rounded-3xl p-8 sm:p-10 md:p-12 lg:p-16 relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.3),transparent_50%)]" />
              </div>

              <div className="relative z-10">
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-2xl sm:text-3xl md:text-4xl font-bold text-background mb-3 md:mb-4 heading-text px-4"
                >
                  Simple, transparent cryptocurrency exchange
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-base md:text-lg text-background/80 mb-6 md:mb-8 professional-text max-w-2xl mx-auto px-4"
                >
                  Join thousands who chose simplicity, transparency, and freedom over complexity and restrictions.
                </motion.p>
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4">
                  <motion.a
                    href="https://t.me/TheCryptoCoopBot"
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ transition: `transform ${springMedium}` }}
                    className="inline-flex items-center justify-center gap-2 bg-background text-foreground px-6 py-3 md:px-8 md:py-4 rounded-xl md:rounded-2xl font-bold text-base md:text-lg elevated-shadow hover:bg-white transition-colors professional-text"
                  >
                    Open Telegram Bot
                    <Zap className="w-4 h-4 md:w-5 md:h-5" />
                  </motion.a>
                  <motion.a
                    href="https://localcoinswap.com/profile/cryptocoop"
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ transition: `transform ${springMedium}` }}
                    className="inline-flex items-center justify-center gap-2 bg-background/80 text-foreground px-6 py-3 md:px-8 md:py-4 rounded-xl md:rounded-2xl font-bold text-base md:text-lg elevated-shadow hover:bg-white transition-colors professional-text"
                  >
                    Visit LCS Profile
                    <Globe className="w-4 h-4 md:w-5 md:h-5" />
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
}
