'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Info, Shield, Scale, AlertCircle, FileText } from 'lucide-react';
import Navbar from '@/components/sections/Navbar';
import Footer from '@/components/sections/Footer';

const sections = [
  {
    title: '1. Service Overview',
    icon: Info,
    content: [
      'Cryptocoop operates as a cryptocurrency exchange platform facilitating digital asset transactions. All trades are processed by our team to ensure quality and security.',
      'While we maintain consistent service availability, operational parameters including processing times and cryptocurrency availability may vary based on market conditions and operational capacity.',
    ],
  },
  {
    title: '2. Account Access',
    icon: Shield,
    content: [
      'Access to Cryptocoop services is provided through Telegram authentication. Users authenticate using Telegram credentials, and we access only information shared through Telegram\'s authentication system.',
      'We operate with data minimization principles, collecting only essential information required for trade execution and platform operation.',
      'We reserve the right to request additional verification or decline service if we identify potentially irregular activity patterns.',
    ],
  },
  {
    title: '3. Service Discretion',
    icon: Scale,
    content: [
      'Cryptocoop maintains discretion to accept or decline transaction requests based on operational assessment, including but not limited to:',
      '• Unusual activity patterns',
      '• Market volatility conditions',
      '• Liquidity constraints',
      '• Technical limitations',
      '• Platform policy adherence',
      '',
      'Declined transactions incur no fees. Users receive notification of decisions through the platform.',
    ],
  },
  {
    title: '4. Processing Standards',
    icon: AlertCircle,
    content: [
      'Transaction processing operates on a best-effort basis. We cannot guarantee:',
      '• Specific processing timeframes',
      '• Exact completion schedules',
      '• Availability of particular assets',
      '• Execution at predetermined rates',
      '',
      'Transactions are processed sequentially following internal review procedures. Expedited processing is not available.',
    ],
  },
  {
    title: '5. User Obligations',
    icon: Shield,
    content: [
      'Users maintain responsibility for:',
      '• Verification of transaction details prior to confirmation',
      '• Accuracy of payment information provided',
      '• Security of authentication credentials',
      '• Adherence to provided instructions',
      '• Understanding cryptocurrency trading risks',
      '',
      'Cryptocoop liability excludes:',
      '• User-initiated errors in transaction details',
      '• Market price fluctuations post-acceptance',
      '• Third-party payment system issues',
      '• Losses attributable to user actions',
    ],
  },
  {
    title: '6. Dispute Resolution',
    icon: Scale,
    content: [
      'Cryptocoop operates in accordance with Telegram\'s Terms of Service regarding transaction disputes.',
      '',
      'Resolution Framework:',
      '• All services and digital products are delivered as specified',
      '• Unfulfilled transactions result in complete fund repatriation',
      '• Disputes are addressed directly through Cryptocoop support channels',
      '• Support access available via platform interface',
      '',
      'Platform Relationship:',
      'Telegram maintains no mediation obligation for disputes between users and Cryptocoop. All conflicts require independent resolution between involved parties.',
      '',
      'Refund Protocol:',
      'Transaction disputes resulting in refunds are processed by Cryptocoop. We maintain conservative practices regarding irreversible digital asset sales.',
      '',
      'Compliance Framework:',
      'Failure to address legitimate disputes may result in platform sanctions including account restrictions or service termination, as determined by Telegram at their discretion.',
    ],
  },
  {
    title: '7. Terms Modifications',
    icon: FileText,
    content: [
      'Cryptocoop reserves the right to modify these Terms of Service without advance notice.',
      '',
      'Continued platform use following modifications constitutes acceptance of revised terms.',
      '',
      'Users are advised to review terms periodically for updates.',
    ],
  },
  {
    title: '8. Limitation of Liability',
    icon: AlertCircle,
    content: [
      'Cryptocoop provides services on an "as-is" basis. We make no warranties regarding:',
      '• Uninterrupted service availability',
      '• Error-free operation',
      '• Specific transaction outcomes',
      '• Market conditions or asset performance',
      '',
      'Users acknowledge cryptocurrency trading involves inherent risks including price volatility, technological risks, and regulatory uncertainty.',
    ],
  },
  {
    title: '9. Governing Law',
    icon: Scale,
    content: [
      'These terms are governed by the laws of the United Kingdom and applicable international regulations.',
      '',
      'Users agree to resolve disputes through good-faith negotiation. Unresolved disputes may be subject to arbitration or legal proceedings as appropriate.',
    ],
  },
];

export default function TermsPage() {
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
              Terms of Service
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
              These Terms of Service govern your use of Cryptocoop's cryptocurrency exchange platform. By accessing or using our services, you acknowledge that you have read, understood, and agree to be bound by these terms. If you do not agree to these terms, please discontinue use of the platform.
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

          {/* Footer Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-16 bg-card p-8 border border-border rounded-lg text-center"
          >
            <p className="text-sm text-muted-foreground professional-text mb-4">
              For questions regarding these Terms of Service, please contact our legal team:
            </p>
            <a
              href="mailto:hello@cryptocoop.info"
              className="inline-flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors professional-text font-medium"
            >
              hello@cryptocoop.info
            </a>
          </motion.div>
        </motion.div>
      </section>
      <Footer />
    </main>
  );
}
