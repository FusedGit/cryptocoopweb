'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Menu, X } from 'lucide-react';

const navLinks = [
  // { name: 'News', href: 'https://t.me/cryptocoop_news' }, // Hidden for now
  { name: 'Support', href: 'https://t.me/cryptocoop2024' },
  { name: 'Wallet Status', href: 'https://cryptocoop.betteruptime.com/' },
  { name: 'Investors', href: '/investors' },
  { name: 'Law Enforcement', href: '/law-enforcement' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md border-b-4 border-primary py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <motion.div 
            whileHover={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 0.5 }}
            className="w-12 h-12 bg-black border-3 border-black flex items-center justify-center text-white overflow-hidden p-2 sketchy-shadow"
            style={{ borderRadius: '40% 60% 50% 50% / 60% 40% 60% 40%' }}
          >
            <Image 
              src="/Logo.svg" 
              alt="Cryptocoop Logo" 
              width={28} 
              height={28} 
              className="invert"
            />
          </motion.div>
          <span className="text-xl font-black text-foreground doodle-text">Cryptocoop</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-bold text-foreground hover:text-primary transition-colors doodle-text"
            >
              {link.name}
            </Link>
          ))}
          <motion.a
            href="https://t.me/TheCryptoCoopBot"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, rotate: 2 }}
            className="bg-primary text-white px-6 py-2.5 font-black text-sm doodle-text sketchy-shadow inline-block"
            style={{ borderRadius: '40% 60% 45% 55% / 60% 40% 55% 45%', border: '3px solid black' }}
          >
            <Send className="w-4 h-4 inline mr-2" />
            Open Exchange
          </motion.a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-foreground p-2 font-black"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-yellow-50 overflow-hidden"
          >
            <div className="px-4 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-lg font-black text-foreground hover:text-primary doodle-text"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <motion.a
                href="https://t.me/TheCryptoCoopBot"
                target="_blank"
                rel="noopener noreferrer"
                whileTap={{ scale: 0.95 }}
                className="bg-primary text-white px-6 py-4 font-black text-lg doodle-text w-full sketchy-shadow inline-block text-center"
                style={{ borderRadius: '35% 65% 70% 30% / 55% 45% 55% 45%', border: '3px solid black' }}
              >
                <Send className="w-5 h-5 inline mr-2" />
                Open Exchange
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}



