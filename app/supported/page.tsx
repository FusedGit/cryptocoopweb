'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Globe, CreditCard, Building2 } from 'lucide-react';
import Navbar from '@/components/sections/Navbar';
import Footer from '@/components/sections/Footer';

const regions = [
  {
    name: 'North America',
    countries: [
      'Canada',
      'United States',
      'Mexico',
    ],
  },
  {
    name: 'Latin America & Caribbean',
    countries: [
      'Argentina',
      'Belize',
      'Bolivia',
      'Brazil',
      'Chile',
      'Colombia',
      'Costa Rica',
      'Dominican Republic',
      'Ecuador',
      'El Salvador',
      'Guatemala',
      'Honduras',
      'Panama',
      'Paraguay',
      'Peru',
      'Uruguay',
      'Venezuela',
    ],
  },
  {
    name: 'Europe',
    countries: [
      'Austria',
      'Belgium',
      'Bulgaria',
      'Croatia',
      'Cyprus',
      'Czech Republic',
      'Denmark',
      'Estonia',
      'Finland',
      'France',
      'Germany',
      'Greece',
      'Hungary',
      'Iceland',
      'Ireland',
      'Italy',
      'Latvia',
      'Liechtenstein',
      'Lithuania',
      'Luxembourg',
      'Malta',
      'Netherlands',
      'Norway',
      'Poland',
      'Portugal',
      'Romania',
      'Slovakia',
      'Slovenia',
      'Spain',
      'Sweden',
      'Switzerland',
      'United Kingdom',
    ],
  },
  {
    name: 'Asia & Pacific',
    countries: [
      'Australia',
      'Bangladesh',
      'Brunei',
      'Cambodia',
      'China',
      'Hong Kong',
      'India',
      'Indonesia',
      'Japan',
      'Kazakhstan',
      'Laos',
      'Malaysia',
      'Mongolia',
      'Nepal',
      'New Zealand',
      'Pakistan',
      'Philippines',
      'Singapore',
      'South Korea',
      'Sri Lanka',
      'Taiwan',
      'Thailand',
      'Vietnam',
    ],
  },
  {
    name: 'Middle East & Africa',
    countries: [
      'Bahrain',
      'Egypt',
      'Israel',
      'Jordan',
      'Kenya',
      'Kuwait',
      'Morocco',
      'Nigeria',
      'Oman',
      'Qatar',
      'Saudi Arabia',
      'South Africa',
      'Tunisia',
      'Turkey',
      'United Arab Emirates',
    ],
  },
];

const paymentMethods = [
  {
    region: 'International',
    methods: [
      { name: 'SWIFT', description: 'International bank wire transfers' },
      { name: 'Cryptocurrency', description: 'BTC, ETH, USDT, XMR, TON' },
    ],
  },
  {
    region: 'United States',
    methods: [
      { name: 'ACH', description: 'Automated Clearing House transfers' },
      { name: 'Wire Transfer', description: 'Domestic wire transfers' },
      { name: 'Zelle', description: 'Instant bank transfers' },
      { name: 'Cash App', description: 'Peer-to-peer payments' },
      { name: 'Venmo', description: 'Digital wallet transfers' },
    ],
  },
  {
    region: 'Europe',
    methods: [
      { name: 'SEPA', description: 'Single Euro Payments Area transfers' },
      { name: 'SEPA Instant', description: 'Instant Euro transfers' },
      { name: 'Faster Payments (UK)', description: 'UK instant bank transfers' },
      { name: 'BACS (UK)', description: 'UK bank payments' },
    ],
  },
  {
    region: 'Canada',
    methods: [
      { name: 'Interac e-Transfer', description: 'Canadian instant transfers' },
      { name: 'EFT', description: 'Electronic Funds Transfer' },
    ],
  },
  {
    region: 'Australia & New Zealand',
    methods: [
      { name: 'PayID', description: 'Australian instant payments' },
      { name: 'Osko', description: 'Fast bank transfers (Australia)' },
      { name: 'BECS', description: 'Bulk Electronic Clearing System' },
      { name: 'POLi', description: 'Internet banking payments (NZ/AU)' },
    ],
  },
  {
    region: 'China',
    methods: [
      { name: 'WeChat Pay', description: 'Digital wallet and QR payments' },
      { name: 'Alipay', description: 'Mobile and online payments' },
      { name: 'UnionPay', description: 'Bank card payments' },
    ],
  },
  {
    region: 'Southeast Asia',
    methods: [
      { name: 'PromptPay (Thailand)', description: 'QR code and mobile payments' },
      { name: 'PayNow (Singapore)', description: 'Instant fund transfers' },
      { name: 'GrabPay', description: 'Digital wallet (Multiple countries)' },
      { name: 'GCash (Philippines)', description: 'Mobile wallet payments' },
      { name: 'MoMo (Vietnam)', description: 'E-wallet and payments' },
      { name: 'VietQR (Vietnam)', description: 'QR code payments' },
      { name: 'ShopeePay', description: 'Digital wallet (Multiple countries)' },
    ],
  },
  {
    region: 'India',
    methods: [
      { name: 'UPI', description: 'Unified Payments Interface' },
      { name: 'IMPS', description: 'Immediate Payment Service' },
      { name: 'NEFT', description: 'National Electronic Funds Transfer' },
      { name: 'RTGS', description: 'Real Time Gross Settlement' },
      { name: 'Paytm', description: 'Digital wallet payments' },
      { name: 'PhonePe', description: 'Mobile payment app' },
    ],
  },
  {
    region: 'Latin America',
    methods: [
      { name: 'PIX (Brazil)', description: 'Instant payment system' },
      { name: 'SPEI (Mexico)', description: 'Electronic payment system' },
      { name: 'Mercado Pago', description: 'Digital wallet (Multiple countries)' },
      { name: 'Nequi (Colombia)', description: 'Mobile banking platform' },
      { name: 'Yape (Peru)', description: 'Mobile payment app' },
    ],
  },
  {
    region: 'Middle East',
    methods: [
      { name: 'SAMA (Saudi Arabia)', description: 'Instant payment system' },
      { name: 'UAEFTS (UAE)', description: 'Electronic funds transfer' },
      { name: 'Fawri+ (UAE)', description: 'Instant payment service' },
    ],
  },
  {
    region: 'Africa',
    methods: [
      { name: 'M-Pesa (Kenya)', description: 'Mobile money transfer' },
      { name: 'Instant EFT (South Africa)', description: 'Instant bank transfers' },
    ],
  },
];

export default function SupportedPage() {
  return (
    <main className="min-h-screen w-full bg-background">
      <Navbar />

      <section className="container mx-auto px-6 lg:px-8 pt-32 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="mb-16">
            <h1 className="text-3xl md:text-4xl lg:text-5xl text-foreground mb-5 heading-text">
              Supported Countries & Payment Methods
            </h1>
            <p className="text-lg text-muted-foreground professional-text max-w-3xl">
              Cryptocoop provides global cryptocurrency exchange services across multiple regions with support for local payment methods.
            </p>
          </div>

          {/* Supported Countries */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-20"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                <Globe className="w-5 h-5 text-foreground" strokeWidth={1.5} />
              </div>
              <h2 className="text-2xl md:text-3xl text-foreground heading-text">
                Supported Countries
              </h2>
            </div>

            <p className="text-[15px] text-muted-foreground professional-text mb-8 leading-relaxed">
              Countries and territories where we currently provide cryptocurrency exchange services:
            </p>

            <div className="space-y-8">
              {regions.map((region, index) => (
                <motion.div
                  key={region.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="bg-card p-8 border border-border rounded-lg"
                >
                  <h3 className="text-lg text-foreground heading-text mb-4">
                    {region.name}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {region.countries.map((country) => (
                      <div
                        key={country}
                        className="text-sm text-muted-foreground professional-text"
                      >
                        {country}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Payment Methods */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-primary" strokeWidth={1.5} />
              </div>
              <h2 className="text-2xl md:text-3xl text-foreground heading-text">
                Payment Methods
              </h2>
            </div>

            <p className="text-[15px] text-muted-foreground professional-text mb-8 leading-relaxed">
              We support a wide range of local and international payment methods to make cryptocurrency trading accessible:
            </p>

            <div className="space-y-6">
              {paymentMethods.map((category, index) => (
                <motion.div
                  key={category.region}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                  className="bg-card p-8 border border-border rounded-lg"
                >
                  <h3 className="text-lg text-foreground heading-text mb-6">
                    {category.region}
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {category.methods.map((method) => (
                      <div key={method.name} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-foreground professional-text font-medium mb-1">
                            {method.name}
                          </p>
                          <p className="text-sm text-muted-foreground professional-text">
                            {method.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-12 bg-accent/30 p-8 border border-border rounded-lg"
          >
            <div className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-foreground mt-0.5 flex-shrink-0" strokeWidth={1.5} />
              <div>
                <h3 className="text-base text-foreground heading-text mb-3">
                  Availability Notice
                </h3>
                <p className="text-[15px] text-muted-foreground professional-text leading-relaxed mb-3">
                  Payment method availability varies by region and may be subject to local regulations and banking partnerships. Not all payment methods are available in all countries.
                </p>
                <p className="text-[15px] text-muted-foreground professional-text leading-relaxed">
                  For specific payment method availability in your region, please contact our{' '}
                  <Link href="/support" className="text-foreground font-medium hover:text-primary transition-colors">
                    support team
                  </Link>
                  .
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>
      <Footer />
    </main>
  );
}
