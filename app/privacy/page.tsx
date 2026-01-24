'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Eye, Shield, Info, Lock, AlertCircle, Scale, FileText } from 'lucide-react';
import Navbar from '@/components/sections/Navbar';
import Footer from '@/components/sections/Footer';

const sections = [
  {
    title: '1. Information Collection',
    icon: Eye,
    content: [
      'Authentication Information (via Telegram):',
      '• User identifier',
      '• Username and display name',
      '• Profile information',
      '• Language preferences',
      '',
      'Transaction Data:',
      '• Digital asset transaction history',
      '• Payment method information',
      '• Trading statistics and preferences',
      '',
      'Operational Preferences:',
      '• Currency settings',
      '• Platform configurations',
      '',
      'Payment information is retained exclusively for fraud prevention and dispute resolution. All data maintains strict security protocols and remains confidential.',
    ],
  },
  {
    title: '2. Information We Do Not Collect',
    icon: Shield,
    content: [
      'Cryptocoop adheres to data minimization principles. We do not collect or store:',
      '• Authentication passwords (managed by Telegram)',
      '• Complete payment card numbers',
      '• Cryptocurrency private keys or recovery phrases',
      '• Government identification documents',
      '• Tax identification numbers',
      '• Precise geolocation or IP addresses',
      '• Private communications',
      '',
      'We collect only information essential for platform operation and user support.',
    ],
  },
  {
    title: '3. Data Usage',
    icon: Info,
    content: [
      'Collected information serves the following purposes:',
      '• Transaction processing and execution',
      '• Trading record maintenance',
      '• Customer support provision',
      '• Fraud detection and prevention',
      '• Transaction history access',
      '• Referral program management',
      '• Platform functionality improvement',
      '• Dispute and chargeback resolution',
      '',
      'We maintain strict policies against:',
      '• Unsolicited marketing communications',
      '• User data commercialization',
      '• Targeted advertising',
      '• Data mining or behavioral profiling',
    ],
  },
  {
    title: '4. Information Sharing',
    icon: Lock,
    content: [
      'Cryptocoop does not sell, lease, or distribute user information to third parties.',
      '',
      'Limited Access:',
      '• Internal operations team (transaction processing)',
      '• Legal authorities (when legally mandated)',
      '',
      'Service Providers:',
      '• Telegram (authentication services)',
      '• Supabase (secure database infrastructure)',
      '• Vercel (application hosting and performance analytics)',
      '• CoinGecko (market data - no personal information transmitted)',
      '',
      'Payment processors maintain independent data practices. Please consult their respective privacy policies.',
      '',
      'Payment credentials are encrypted and accessed exclusively for dispute resolution purposes.',
    ],
  },
  {
    title: '5. Security Measures',
    icon: Shield,
    content: [
      'Our security infrastructure includes:',
      '• TLS/HTTPS encryption for all communications',
      '• Database access controls and authentication protocols',
      '• Telegram-managed authentication security',
      '• Continuous security monitoring and updates',
      '',
      'While we implement industry-standard security practices, absolute security cannot be guaranteed. Users share responsibility for account protection through two-factor authentication and credential safeguarding.',
    ],
  },
  {
    title: '6. Data Retention',
    icon: AlertCircle,
    content: [
      'User information is retained during:',
      '• Active account status',
      '• Legal compliance requirements',
      '• Fraud prevention and dispute resolution necessity',
      '',
      'Transaction records and payment information may be retained beyond account closure for regulatory compliance and dispute resolution purposes.',
    ],
  },
  {
    title: '7. User Rights',
    icon: Scale,
    content: [
      'Users maintain the following rights:',
      '• Access to stored personal information',
      '• Correction of inaccurate data',
      '• Account and data deletion requests',
      '• Transaction history export',
      '• Service discontinuation at any time',
      '',
      'To exercise these rights, contact our privacy team at hello@cryptocoop.info.',
      '',
      'Note: Certain information may be retained for legal compliance following account deletion, including transaction records required for dispute resolution.',
    ],
  },
  {
    title: '8. Analytics & Performance',
    icon: Eye,
    content: [
      'Cryptocoop utilizes Vercel Analytics and Speed Insights for platform performance monitoring.',
      '',
      'Analytics Data:',
      '• Page navigation patterns',
      '• Performance metrics and load times',
      '• Device and browser specifications',
      '• Regional aggregates',
      '',
      'This information is:',
      '• Collected without tracking cookies',
      '• Anonymized and aggregated',
      '• Used exclusively for performance optimization',
      '• Not shared with advertising networks',
      '• Compliant with GDPR and privacy regulations',
      '',
      'Performance monitoring enables technical issue identification and platform reliability improvements without collecting personally identifiable information.',
    ],
  },
  {
    title: '9. Cookies & Storage',
    icon: Eye,
    content: [
      'Our platform employs minimal tracking:',
      '• Local device storage for user preferences',
      '• Session management for authentication',
      '• No advertising cookies',
      '• No cross-site tracking',
      '',
      'We do not engage in behavioral tracking or cross-platform monitoring.',
    ],
  },
  {
    title: '10. Age Requirements',
    icon: AlertCircle,
    content: [
      'Platform access is restricted to individuals aged 18 years or older.',
      '',
      'Accounts identified as belonging to minors will be immediately deactivated.',
    ],
  },
  {
    title: '11. Policy Updates',
    icon: FileText,
    content: [
      'This Privacy Policy may be updated periodically to reflect operational or regulatory changes.',
      '',
      'Continued platform use following policy updates constitutes acceptance of modifications.',
      '',
      'Significant policy changes will be communicated through the platform or Telegram.',
    ],
  },
];

export default function PrivacyPage() {
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
          <div className="mb-16">
            <h1 className="text-3xl md:text-4xl lg:text-5xl text-foreground mb-5 heading-text">
              Privacy Policy
            </h1>
            <p className="text-lg text-muted-foreground professional-text">
              Last updated: January 2025
            </p>
          </div>

          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-accent/30 p-8 border border-border rounded-lg mb-12"
          >
            <p className="text-[15px] text-foreground/90 professional-text leading-relaxed">
              Cryptocoop is committed to protecting user privacy and maintaining data confidentiality. This Privacy Policy outlines our data collection, usage, and protection practices. We operate on principles of data minimization, collecting only information essential for platform operation and user service.
            </p>
          </motion.div>

          {/* Sections */}
          <div className="space-y-12">
            {sections.map((section, index) => {
              const SectionIcon = section.icon;
              return (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  className="border-b border-border pb-12 last:border-0"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <SectionIcon className="w-5 h-5 text-foreground" strokeWidth={1.5} />
                    </div>
                    <h2 className="text-xl md:text-2xl text-foreground heading-text flex-1">
                      {section.title}
                    </h2>
                  </div>
                  <div className="pl-14 space-y-4">
                    {section.content.map((paragraph, pIndex) => (
                      <p
                        key={pIndex}
                        className={`text-[15px] professional-text leading-relaxed ${
                          paragraph === '' ? 'h-2' : 'text-muted-foreground'
                        }`}
                        style={{ whiteSpace: 'pre-line' }}
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-16 bg-gradient-to-br from-primary/10 to-primary/5 p-8 border border-primary/20 rounded-lg text-center"
          >
            <h3 className="text-lg text-foreground heading-text mb-4">
              Privacy Inquiries
            </h3>
            <p className="text-[15px] text-muted-foreground professional-text mb-6 leading-relaxed max-w-2xl mx-auto">
              For questions regarding this Privacy Policy or to exercise your data rights, please contact our privacy team:
            </p>
            <a
              href="mailto:hello@cryptocoop.info"
              className="inline-flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors professional-text font-medium"
            >
              hello@cryptocoop.info
            </a>
            <p className="mt-4 text-sm text-muted-foreground professional-text">
              Typical response time: 24-48 hours
            </p>
          </motion.div>
        </motion.div>
      </section>
      <Footer />
    </main>
  );
}
