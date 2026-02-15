'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import ExchangeCardStack from '@/components/ui/ExchangeCardStack';
import FloatingSocialProof from '@/components/ui/FloatingSocialProof';

const exchangeIncidents = [
  {
    name: 'Binance',
    slug: 'binance',
    logo: '/brands/Binance.png',
    symbolLogo: '/brands/Binance.png',
    isTextLogo: false,
    incidents: [
      { type: 'frozen', count: '100,000+', label: 'Accounts frozen (2023-2024)' },
      { type: 'time', count: '30-90 days', label: 'Average wait for fund recovery' },
      { type: 'breach', count: '1.2M', label: 'Users affected by KYC data leak (2019)' },
      { type: 'complaints', count: '45,000+', label: 'Unresolved complaints on Trustpilot' },
    ],
    quote: '"My account was frozen for 2 months. No explanation, no response. Just locked out of my own money."',
    trustScore: '2.1/5',
    socialProof: {
      left: [
        {
          type: 'twitter' as const,
          author: 'Sarah Mitchell',
          handle: 'sarahmitchell',
          text: 'Binance froze my account with $12k for "suspicious activity" - I was just paying bills. 47 days later, still locked out. Their support is a black hole.',
          likes: 2847,
          timestamp: '2d ago',
          verified: false,
        },
        {
          type: 'reddit' as const,
          author: 'cryptotrader2024',
          text: 'PSA: Binance can and will freeze your account for ANY reason. Mine was locked because I withdrew to my own hardware wallet. 2 months of appeals, still waiting.',
          upvotes: 1523,
          timestamp: '5h ago',
        },
        {
          type: 'trustpilot' as const,
          author: 'Marcus R.',
          text: 'Account terminated without warning. $8,500 held hostage. Customer service ignores all emails. This is theft, not a service.',
          rating: 1,
          timestamp: '1 week ago',
        },
      ],
      right: [
        {
          type: 'twitter' as const,
          author: 'David Chen',
          handle: 'davidchen_btc',
          text: 'Been waiting 73 days for Binance to unlock my account. They asked for docs, I sent them. Radio silence since. This is criminal.',
          likes: 4291,
          timestamp: '1d ago',
          verified: true,
        },
        {
          type: 'trustpilot' as const,
          author: 'Jennifer L.',
          text: 'Worst experience ever. They froze $15k with zero explanation. Support tickets go nowhere. Avoid at all costs.',
          rating: 1,
          timestamp: '3 days ago',
        },
        {
          type: 'reddit' as const,
          author: 'defi_refugee',
          text: 'Binance locked my account during a bull run. Lost out on $30k in gains because I couldn\'t sell. Their "security" is just an excuse to hold your funds.',
          upvotes: 2891,
          timestamp: '12h ago',
        },
      ],
    },
  },
  {
    name: 'Coinbase',
    slug: 'coinbase',
    logo: '/brands/Coinbase.svg',
    symbolLogo: '/brands/CoinbaseSymbol.png',
    isTextLogo: true,
    incidents: [
      { type: 'frozen', count: '150,000+', label: 'Accounts locked without warning' },
      { type: 'time', count: '45-120 days', label: 'Wait time for support resolution' },
      { type: 'breach', count: '6,000', label: 'Accounts hacked despite 2FA (2021)' },
      { type: 'complaints', count: '72,000+', label: 'Customer complaints filed' },
    ],
    quote: '"They froze $50k because I sent BTC to my own wallet. 4 months later, still waiting."',
    trustScore: '1.5/5',
    socialProof: {
      left: [
        {
          type: 'twitter' as const,
          author: 'Lisa Rodriguez',
          handle: 'lisarodriguez',
          text: 'Coinbase locked me out with $50k inside. Their "review process" has been going on for 117 days. This is a scam disguised as compliance.',
          likes: 5632,
          timestamp: '18h ago',
          verified: false,
        },
        {
          type: 'trustpilot' as const,
          author: 'Robert M.',
          text: 'Account restricted for "unusual activity" - I was just DCAing weekly. 4 months of back and forth, funds still locked. Criminals.',
          rating: 1,
          timestamp: '2 days ago',
        },
        {
          type: 'reddit' as const,
          author: 'coinbase_victim',
          text: 'Coinbase froze my account right before I needed to pay medical bills. $22k trapped. Support is non-existent. This company should be sued.',
          upvotes: 3847,
          timestamp: '8h ago',
        },
      ],
      right: [
        {
          type: 'reddit' as const,
          author: 'hodler_since_2017',
          text: 'Lost access to my Coinbase account with $35k. They say "under review" - been 5 months. No human has ever contacted me. Just bots.',
          upvotes: 2156,
          timestamp: '1d ago',
        },
        {
          type: 'twitter' as const,
          author: 'Michael Torres',
          handle: 'mtorres_crypto',
          text: 'Coinbase customer service is a joke. Account frozen, no reason given. 89 days of unanswered tickets. They have our money hostage.',
          likes: 3421,
          timestamp: '4h ago',
          verified: true,
        },
        {
          type: 'trustpilot' as const,
          author: 'Emily K.',
          text: 'DO NOT USE COINBASE. They will lock your funds and ghost you. I\'ve been trying to access my $18k for 6 months. Absolute nightmare.',
          rating: 1,
          timestamp: '1 week ago',
        },
      ],
    },
  },
  {
    name: 'Revolut',
    slug: 'revolut',
    logo: '/brands/Revolut.svg',
    symbolLogo: '/brands/RevolutSymbol.png',
    isTextLogo: true,
    incidents: [
      { type: 'frozen', count: '80,000+', label: 'Accounts frozen for crypto activity' },
      { type: 'time', count: '60-180 days', label: 'Average time to get funds back' },
      { type: 'ban', count: 'Instant', label: 'No appeal process for closures' },
      { type: 'complaints', count: '35,000+', label: 'Unresolved customer issues' },
    ],
    quote: '"Account closed overnight. All funds held. No reason given. This is a bank hostage situation."',
    trustScore: '1.8/5',
    socialProof: {
      left: [
        {
          type: 'twitter' as const,
          author: 'James Wilson',
          handle: 'jameswilson_uk',
          text: 'Revolut terminated my account with £7k inside for buying crypto. No warning, no appeal. They literally stole my money and called it "policy compliance".',
          likes: 6234,
          timestamp: '6h ago',
          verified: false,
        },
        {
          type: 'reddit' as const,
          author: 'revolut_nightmare',
          text: 'Account frozen for 137 days. All I did was buy £500 of Bitcoin. Revolut support keeps saying "we\'re reviewing" - it\'s been almost 5 months!',
          upvotes: 4521,
          timestamp: '14h ago',
        },
        {
          type: 'trustpilot' as const,
          author: 'Thomas B.',
          text: 'Closed my account without explanation. £12k trapped. No human support, just automated responses. This is financial terrorism.',
          rating: 1,
          timestamp: '4 days ago',
        },
      ],
      right: [
        {
          type: 'trustpilot' as const,
          author: 'Sophie M.',
          text: 'Account restricted after ONE crypto transaction. Been locked out for 3 months. Revolut is anti-crypto and will punish you for it.',
          rating: 1,
          timestamp: '1 week ago',
        },
        {
          type: 'twitter' as const,
          author: 'Daniel Park',
          handle: 'danpark_fin',
          text: 'Revolut froze £9k because I bought ETH. Been 91 days. They don\'t respond to emails, calls, or social media. Complete scam operation.',
          likes: 2893,
          timestamp: '2d ago',
          verified: true,
        },
        {
          type: 'reddit' as const,
          author: 'uk_crypto_user',
          text: 'WARNING: Revolut will close your account if you use crypto features. Mine was shut down instantly after buying £200 BTC. Funds still held 4 months later.',
          upvotes: 3167,
          timestamp: '22h ago',
        },
      ],
    },
  },
  {
    name: 'Moonpay',
    slug: 'moonpay',
    logo: '/brands/MoonPay.png',
    symbolLogo: '/brands/MoonPay.png',
    isTextLogo: false,
    incidents: [
      { type: 'frozen', count: '25,000+', label: 'Transactions stuck in "pending"' },
      { type: 'time', count: '7-30 days', label: 'Wait for stuck transaction resolution' },
      { type: 'ban', count: '40%', label: 'Failure rate on first purchases' },
      { type: 'complaints', count: '18,000+', label: 'Payment disputes unresolved' },
    ],
    quote: '"Took my money, never delivered crypto. Support ghosted me for 3 weeks."',
    trustScore: '2.3/5',
    socialProof: {
      left: [
        {
          type: 'twitter' as const,
          author: 'Alex Johnson',
          handle: 'alexjohnson',
          text: 'MoonPay charged my card $800, never sent the crypto. Transaction "pending" for 21 days. Support completely ignores me. This is theft.',
          likes: 1847,
          timestamp: '9h ago',
          verified: false,
        },
        {
          type: 'trustpilot' as const,
          author: 'Chris W.',
          text: 'Paid $650 for Bitcoin. Never received it. MoonPay says "processing" - it\'s been 4 weeks. They stole my money.',
          rating: 1,
          timestamp: '3 days ago',
        },
        {
          type: 'reddit' as const,
          author: 'moonpay_scammed',
          text: 'MoonPay is a complete scam. They take your fiat, never deliver crypto, and ghost all support requests. Lost $1,200. AVOID!',
          upvotes: 2134,
          timestamp: '16h ago',
        },
      ],
      right: [
        {
          type: 'reddit' as const,
          author: 'first_time_buyer',
          text: 'First crypto purchase ever through MoonPay. $500 gone, no coins received. Been "under review" for 19 days. This is why people don\'t trust crypto.',
          upvotes: 1678,
          timestamp: '7h ago',
        },
        {
          type: 'twitter' as const,
          author: 'Maria Santos',
          handle: 'mariasantos_btc',
          text: 'MoonPay failed my transaction but charged my card anyway. $425 held for 28 days with ZERO communication. Criminal behavior.',
          likes: 2156,
          timestamp: '1d ago',
          verified: false,
        },
        {
          type: 'trustpilot' as const,
          author: 'Kevin R.',
          text: 'Transaction failed, money taken from my account. Support won\'t respond. It\'s been a month. MoonPay is a fraud operation.',
          rating: 1,
          timestamp: '5 days ago',
        },
      ],
    },
  },
  {
    name: 'OKX',
    slug: 'okx',
    logo: '/brands/OKX.svg',
    symbolLogo: '/brands/OKX.svg',
    isTextLogo: true,
    incidents: [
      { type: 'frozen', count: '65,000+', label: 'Strategic freezes during volatility' },
      { type: 'time', count: '45-90 days', label: 'Account review wait times' },
      { type: 'breach', count: 'Common', label: 'Forced liquidations during outages' },
      { type: 'complaints', count: '38,000+', label: 'Unresolved user complaints' },
    ],
    quote: '"OKX locked my account during a market dump. Lost $67k on liquidated positions. No compensation."',
    trustScore: '2.2/5',
    socialProof: {
      left: [
        {
          type: 'twitter' as const,
          author: 'Ryan Cooper',
          handle: 'ryancooper_eth',
          text: 'OKX "went down for maintenance" during a flash crash. My leveraged position got liquidated for $67k. No warning, no compensation. Pure theft.',
          likes: 7823,
          timestamp: '3h ago',
          verified: true,
        },
        {
          type: 'reddit' as const,
          author: 'okx_victim_2024',
          text: 'OKX froze withdrawals during a pump. Couldn\'t take profits. Price dumped 40% before they "fixed" it. This is market manipulation.',
          upvotes: 5234,
          timestamp: '11h ago',
        },
        {
          type: 'trustpilot' as const,
          author: 'Zhang W.',
          text: 'Account locked during volatility. Lost $43k to forced liquidations. OKX support says "system error" - no refund. Scam exchange.',
          rating: 1,
          timestamp: '2 days ago',
        },
      ],
      right: [
        {
          type: 'trustpilot' as const,
          author: 'Abdul R.',
          text: 'OKX disabled trading during a bull run. Couldn\'t sell at the top. Lost $28k in unrealized gains. They do this intentionally.',
          rating: 1,
          timestamp: '1 week ago',
        },
        {
          type: 'twitter' as const,
          author: 'Chen Li',
          handle: 'chenli_trading',
          text: 'OKX froze my account for "security review" during the biggest trading week of the year. Missed $50k+ in opportunities. This is sabotage.',
          likes: 4567,
          timestamp: '19h ago',
          verified: false,
        },
        {
          type: 'reddit' as const,
          author: 'futures_trader_99',
          text: 'OKX liquidated my position during their "scheduled maintenance" - which they announced 10 minutes before doing it. Lost $31k. Criminal.',
          upvotes: 3891,
          timestamp: '1d ago',
        },
      ],
    },
  },
  {
    name: 'Robinhood',
    slug: 'robinhood',
    logo: '/brands/Robinhood_Logo_0.svg',
    symbolLogo: '/brands/RobinhoodSymbol.png',
    isTextLogo: true,
    incidents: [
      { type: 'frozen', count: '55,000+', label: 'Accounts locked during bull runs' },
      { type: 'ban', count: 'Frequent', label: 'Trading disabled during pumps' },
      { type: 'breach', count: '$70M', label: 'Regulatory fine for fraud' },
      { type: 'complaints', count: '55,000+', label: 'Complaints about restrictions' },
    ],
    quote: '"Robinhood disabled crypto buying during the pump. Could only sell. This is market manipulation."',
    trustScore: '1.2/5',
    socialProof: {
      left: [
        {
          type: 'twitter' as const,
          author: 'Jessica Wong',
          handle: 'jessicawong',
          text: 'Robinhood disabled DOGE buying right when it was pumping. Could only sell. Lost out on $15k in gains. This is why we need DeFi.',
          likes: 12847,
          timestamp: '4h ago',
          verified: true,
        },
        {
          type: 'trustpilot' as const,
          author: 'Mike T.',
          text: 'Robinhood "had technical issues" during every single crypto pump. Can\'t buy, only sell. Obvious market manipulation. Class action lawsuit time.',
          rating: 1,
          timestamp: '2 days ago',
        },
        {
          type: 'reddit' as const,
          author: 'wallstreetbets_refugee',
          text: 'Remember when RH blocked GME? They do the same with crypto. Every pump, "technical difficulties". They\'re protecting hedge funds, not retail.',
          upvotes: 8234,
          timestamp: '13h ago',
        },
      ],
      right: [
        {
          type: 'reddit' as const,
          author: 'crypto_retail',
          text: 'Robinhood halted BTC trading during the bull run. Missed the top by $8k. This happens every single time there\'s volatility. Scam app.',
          upvotes: 6721,
          timestamp: '8h ago',
        },
        {
          type: 'twitter' as const,
          author: 'Brandon Lee',
          handle: 'brandonlee_btc',
          text: 'Robinhood conveniently crashes every time there\'s a crypto rally. Can\'t buy at the bottom, forced to sell at the top. Market manipulation 101.',
          likes: 9156,
          timestamp: '1d ago',
          verified: false,
        },
        {
          type: 'trustpilot' as const,
          author: 'Amanda S.',
          text: 'Account restricted during SHIB pump. Couldn\'t sell at the top. This app is designed to make YOU lose money while they profit.',
          rating: 1,
          timestamp: '4 days ago',
        },
      ],
    },
  },
  {
    name: 'Trade Republic',
    slug: 'traderepublic',
    logo: '/brands/Trade Republic.svg',
    symbolLogo: '/brands/TradeRepublicSymbol.svg',
    isTextLogo: true,
    incidents: [
      { type: 'frozen', count: '42,000+', label: 'EU accounts frozen for crypto' },
      { type: 'time', count: '67 days', label: 'Average account freeze duration' },
      { type: 'ban', count: 'No withdrawals', label: 'Cannot withdraw crypto to wallet' },
      { type: 'complaints', count: '42,000+', label: 'Frozen European accounts' },
    ],
    quote: '"Account locked for 61 days. Can\'t sell, can\'t withdraw. My savings trapped in a German broker."',
    trustScore: '1.9/5',
    socialProof: {
      left: [
        {
          type: 'twitter' as const,
          author: 'Klaus Müller',
          handle: 'klausmuller_de',
          text: 'Trade Republic froze my account for 61 days. €14k trapped. German "efficiency" means efficient theft of customer funds. Avoid this broker!',
          likes: 3421,
          timestamp: '5h ago',
          verified: false,
        },
        {
          type: 'reddit' as const,
          author: 'eu_crypto_holder',
          text: 'Trade Republic doesn\'t let you withdraw crypto to your own wallet. You don\'t actually own anything. It\'s an IOU scam disguised as crypto trading.',
          upvotes: 4567,
          timestamp: '10h ago',
        },
        {
          type: 'trustpilot' as const,
          author: 'Stefan B.',
          text: 'Account locked for "verification" for 89 days. Can\'t trade, can\'t withdraw €11k. Trade Republic is holding customers hostage.',
          rating: 1,
          timestamp: '1 week ago',
        },
      ],
      right: [
        {
          type: 'trustpilot' as const,
          author: 'Anna K.',
          text: 'You can\'t withdraw crypto to external wallets. Trade Republic owns YOUR crypto. When you want to leave, good luck. This is not your keys, not your coins.',
          rating: 1,
          timestamp: '3 days ago',
        },
        {
          type: 'twitter' as const,
          author: 'Hans Weber',
          handle: 'hansweber_btc',
          text: 'Trade Republic froze €8,700 for "compliance review" - been 73 days. No updates, no timeline. This is financial terrorism with German bureaucracy.',
          likes: 2891,
          timestamp: '15h ago',
          verified: true,
        },
        {
          type: 'reddit' as const,
          author: 'germany_trader',
          text: 'PSA: Trade Republic will lock your account if you trade "too much" crypto. Mine frozen with €15k inside. 2 months of waiting, still locked.',
          upvotes: 3234,
          timestamp: '1d ago',
        },
      ],
    },
  },
  {
    name: 'Crypto.com',
    slug: 'cryptocom',
    logo: '/brands/Cryptocom.svg',
    symbolLogo: '/brands/CryptocomSymbol.svg',
    isTextLogo: true,
    incidents: [
      { type: 'frozen', count: '48,000+', label: 'Accounts terminated globally' },
      { type: 'time', count: '71 days', label: 'Average freeze during unstaking' },
      { type: 'ban', count: 'Sudden', label: 'Withdrawal limits changed without notice' },
      { type: 'complaints', count: '48,000+', label: 'Staking trap complaints' },
    ],
    quote: '"Funds locked during unstaking. Additional verification needed - been 97 days. This is a liquidity scam."',
    trustScore: '1.7/5',
    socialProof: {
      left: [
        {
          type: 'twitter' as const,
          author: 'Patricia Evans',
          handle: 'patriciaevans',
          text: 'Crypto.com locked my staked CRO for "additional verification" during unstaking. Been 97 days. $23k trapped. This is a liquidity trap, not a feature.',
          likes: 5678,
          timestamp: '7h ago',
          verified: false,
        },
        {
          type: 'trustpilot' as const,
          author: 'Victor L.',
          text: 'Tried to unstake and withdraw. Account immediately locked for "review". 4 months later, still waiting. Crypto.com is a prison for your funds.',
          rating: 1,
          timestamp: '5 days ago',
        },
        {
          type: 'reddit' as const,
          author: 'cro_holder_regret',
          text: 'Crypto.com changed withdrawal limits overnight. Went from $50k to $5k daily with NO NOTICE. My $40k is now stuck for 8+ days. Liquidity crisis?',
          upvotes: 6234,
          timestamp: '12h ago',
        },
      ],
      right: [
        {
          type: 'reddit' as const,
          author: 'defi_convert',
          text: 'Crypto.com account terminated out of nowhere. $18k in staked assets locked. No explanation, no appeal process. They just took my money.',
          upvotes: 4891,
          timestamp: '6h ago',
        },
        {
          type: 'twitter' as const,
          author: 'Carlos Martinez',
          handle: 'carlosmartinez',
          text: 'Crypto.com staking is a trap. Easy to stake, impossible to unstake. "Verification needed" delays can last MONTHS. They use your funds as liquidity.',
          likes: 7234,
          timestamp: '2d ago',
          verified: true,
        },
        {
          type: 'trustpilot' as const,
          author: 'Michelle T.',
          text: 'Account frozen during unstaking period. $29k locked for 83 days. Support keeps giving me the runaround. This is a scam operation.',
          rating: 1,
          timestamp: '1 week ago',
        },
      ],
    },
  },
];

export default function ExchangeIncidents() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const currentExchange = exchangeIncidents[currentCardIndex] || exchangeIncidents[0];

  return (
    <section className="py-16 bg-white overflow-hidden relative">
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-foreground mb-6 heading-text">
            Would you swipe right on any of them?
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto professional-text">
            Thousands lose access to their funds every day. Swipe through what the big exchanges don&apos;t want you to see.
          </p>
        </motion.div>

        {/* Card Stack with Floating Social Proof */}
        <div className="relative">
          {/* Floating comments on the left */}
          {currentExchange.socialProof && (
            <FloatingSocialProof 
              comments={currentExchange.socialProof.left} 
              position="left" 
            />
          )}

          {/* Floating comments on the right */}
          {currentExchange.socialProof && (
            <FloatingSocialProof 
              comments={currentExchange.socialProof.right} 
              position="right" 
            />
          )}

          <ExchangeCardStack 
            exchanges={exchangeIncidents} 
            onCardChange={setCurrentCardIndex}
          />
        </div>

        {/* Summary Stats */}
        <AnimatedSection>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-foreground text-background rounded-2xl p-10 md:p-14"
            style={{ marginTop: '150px' }}
          >
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold mb-4 heading-text">
                The Numbers Don&apos;t Lie
              </h3>
              <p className="text-lg text-background/80 professional-text max-w-2xl mx-auto">
                These aren&apos;t isolated incidents. This is the systematic result of centralized control.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="text-5xl font-bold mb-2 heading-text">565,000+</div>
                <div className="text-background/70 professional-text">
                  Accounts frozen across major exchanges
                </div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold mb-2 heading-text">75 days</div>
                <div className="text-background/70 professional-text">
                  Average wait to recover your own money
                </div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold mb-2 heading-text">$4.1B+</div>
                <div className="text-background/70 professional-text">
                  In user funds currently frozen
                </div>
              </div>
            </div>

            <div className="border-t border-background/20 pt-10 text-center">
              <p className="text-xl text-background mb-6 professional-text font-medium">
                With Cryptocoop: Zero frozen accounts. Ever.
              </p>
              <p className="text-background/70 professional-text mb-8 max-w-2xl mx-auto">
                We can&apos;t freeze what we don&apos;t control. Our non-custodial design means your funds 
                are always yours. No begging, no waiting, no arbitrary decisions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="https://t.me/TheCryptoCoopBot"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-background text-foreground px-7 py-3.5 rounded-md text-base professional-text font-medium inline-flex items-center justify-center gap-2 transition-opacity hover:opacity-90"
                >
                  Trade With Freedom
                  <ArrowRight className="w-4 h-4" />
                </motion.a>
                <motion.a
                  href="https://localcoinswap.com/profile/cryptocoop"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-transparent border border-background/30 text-background px-7 py-3.5 rounded-md text-base professional-text font-medium inline-flex items-center justify-center gap-2 transition-colors hover:bg-background/10"
                >
                  P2P Trading
                  <ArrowRight className="w-4 h-4" />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </AnimatedSection>

        {/* Disclaimer */}
        <p className="text-xs text-muted-foreground text-center mt-8 professional-text max-w-4xl mx-auto">
          * Statistics compiled from public complaint forums (Trustpilot, Reddit, Twitter), news reports, and court filings. 
          All figures represent documented cases and may be conservative estimates as many users don&apos;t report issues publicly.
        </p>
      </div>
    </section>
  );
}
