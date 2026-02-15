'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
// Direct imports to avoid barrel file (React Best Practice 2.1 - CRITICAL)
import Twitter from 'lucide-react/dist/esm/icons/twitter';
import Linkedin from 'lucide-react/dist/esm/icons/linkedin';
import { AnimatedLink } from '@/components/ui/animated-link';

const footerLinks: { title: string; links: { name: string; href: string }[] }[] = [
  {
    title: 'Resources',
    links: [
      { name: 'Support', href: '/support' },
      { name: 'Affiliates', href: '/affiliates' },
      { name: 'Press', href: '/press' },
    ]
  },
  {
    title: 'Status',
    links: [
      { name: 'Wallet Status', href: 'https://cryptocoop.betteruptime.com/' },
      { name: 'Supported Countries', href: '/supported' },
    ]
  },
  {
    title: 'Company',
    links: [
      { name: 'About', href: '/about' },
      { name: 'Business Solutions', href: '/business' },
      { name: 'Investors', href: '/investors' },
      { name: 'Investor Panel', href: '/investors/login' },
    ]
  }
];

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border pt-20 pb-10 relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-6">
              <div className="w-8 h-8 bg-foreground rounded flex items-center justify-center overflow-hidden">
                <Image 
                  src="/Logo.svg" 
                  alt="Cryptocoop" 
                  width={20} 
                  height={20} 
                  className="invert"
                />
              </div>
              <span className="text-lg font-medium text-foreground professional-text tracking-tight">
                Cryptocoop
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mb-6 professional-text">
              Cryptocoop is a global cryptocurrency exchange committed to financial privacy and secure digital asset trading.
            </p>
            
            {/* QR Code */}
            <div className="mb-6">
              <p className="text-xs text-muted-foreground professional-text mb-3">Scan to open exchange</p>
              <div className="inline-block bg-white p-2 rounded-lg border border-border refined-shadow">
                <Image 
                  src="/qrapp.png" 
                  alt="Scan to open Cryptocoop" 
                  width={120} 
                  height={120} 
                  className="rounded-md"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  href="#" 
                  className="w-10 h-10 bg-accent/50 rounded flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-accent transition-colors"
                >
                  <Twitter className="w-4 h-4" strokeWidth={1.5} />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  href="#" 
                  className="w-10 h-10 bg-accent/50 rounded flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-accent transition-colors"
                >
                  <Linkedin className="w-4 h-4" strokeWidth={1.5} />
                </Link>
              </motion.div>
            </div>
          </div>

          {footerLinks.map((column) => (
            <div key={column.title}>
              <h4 className="font-medium text-foreground mb-5 text-sm professional-text">
                {column.title}
              </h4>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <AnimatedLink 
                      href={link.href}
                      external={link.href.startsWith('http')}
                      className="text-sm text-muted-foreground hover:text-foreground professional-text"
                    >
                      {link.name}
                    </AnimatedLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground professional-text">
          <div>© 2026 Cryptocoop. All rights reserved.</div>
          <div className="flex gap-6">
            <AnimatedLink 
              href="/terms"
              className="hover:text-foreground"
            >
              Terms of Service
            </AnimatedLink>
            <AnimatedLink 
              href="/privacy"
              className="hover:text-foreground"
            >
              Privacy Policy
            </AnimatedLink>
          </div>
        </div>
      </div>
    </footer>
  );
}


