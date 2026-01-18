'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Send, Twitter, Linkedin, Github } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';

const footerLinks: { title: string; links: { name: string; href: string }[] }[] = [
  {
    title: 'Resources',
    links: [
      { name: 'Press', href: '#' },
      { name: 'Roadmap', href: '#' },
    ]
  },
  {
    title: 'Legal',
    links: [
      { name: 'Law Enforcement', href: '#' },
    ]
  },
  {
    title: 'Status',
    links: [
      { name: 'Wallet Status', href: '#' },
    ]
  }
];

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-white to-cyan-50 pt-20 pb-10 relative overflow-hidden">
      {/* Doodle decorations */}
      <div className="absolute top-10 right-10 w-32 h-32 border-4 border-cyan-300 opacity-20" 
           style={{ borderRadius: '40% 60% 50% 50% / 60% 40% 60% 40%' }} />
      <motion.div 
        className="absolute bottom-20 left-10 text-3xl"
        animate={{ rotate: 360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      >
        💎
      </motion.div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-black flex items-center justify-center text-white p-2 overflow-hidden"
                   style={{ borderRadius: '40% 60% 50% 50% / 60% 40% 60% 40%', border: '3px solid black' }}>
                <Image 
                  src="/Logo.svg" 
                  alt="Cryptocoop Logo" 
                  width={24} 
                  height={24} 
                  className="invert"
                />
              </div>
              <span className="text-xl font-black text-foreground doodle-text">Cryptocoop</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mb-8 doodle-text font-semibold">
              TG Wallet Inc. operates the Cryptocoop Exchange mini app. We are committed to financial privacy, zero-KYC trading, and unrestricted global access. 🚀
            </p>
            <div className="flex gap-4">
              <motion.div whileHover={{ scale: 1.1, rotate: 5 }}>
                <Link href="#" className="w-12 h-12 bg-cyan-100 flex items-center justify-center text-cyan-600 hover:bg-cyan-200 transition-colors"
                      style={{ borderRadius: '40% 60% 50% 50% / 60% 40% 60% 40%', border: '3px solid #22d3ee' }}>
                  <Twitter className="w-5 h-5" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1, rotate: -5 }}>
                <Link href="#" className="w-12 h-12 bg-cyan-100 flex items-center justify-center text-cyan-600 hover:bg-cyan-200 transition-colors"
                      style={{ borderRadius: '50% 40% 60% 50% / 40% 50% 50% 60%', border: '3px solid #22d3ee' }}>
                  <Linkedin className="w-5 h-5" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1, rotate: 5 }}>
                <Link href="#" className="w-12 h-12 bg-cyan-100 flex items-center justify-center text-cyan-600 hover:bg-cyan-200 transition-colors"
                      style={{ borderRadius: '40% 60% 50% 50% / 60% 40% 60% 40%', border: '3px solid #22d3ee' }}>
                  <Github className="w-5 h-5" />
                </Link>
              </motion.div>
            </div>
          </div>

          {footerLinks.map((column) => (
            <div key={column.title}>
              <h4 className="font-black text-foreground mb-6 text-sm doodle-text">{column.title}</h4>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors doodle-text font-semibold">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground doodle-text font-bold">
          <div>© 2025 Cryptocoop. All rights reserved. Made with ❤️</div>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-primary transition-colors">Terms of Use</Link>
            <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}


