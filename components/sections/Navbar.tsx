'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';

const navLinks = [
  { name: 'About', href: '/about' },
  { name: 'Business', href: '/business' },
  { name: 'Investors', href: '/investors' },
];

const moreLinks = [
  { name: 'Support', href: '/support' },
  { name: 'Affiliates', href: '/affiliates' },
  { name: 'Press', href: '/press' },
  { name: 'Investor Panel', href: '/login' },
  { name: 'Wallet Status', href: 'https://cryptocoop.betteruptime.com/' },
  { name: 'Supported Countries', href: '/supported' },
  { name: 'Terms', href: '/terms' },
  { name: 'Privacy', href: '/privacy' },
];

// CSS spring easings generated via Motion MCP
const SPRING_ITEMS = 'linear(0, 0.6796, 1.0326, 1.0275, 1.0011, 0.9981, 0.9997, 1)';
const SPRING_CTA = 'linear(0, 0.2459, 0.6526, 0.9468, 1.0764, 1.0915, 1.0585, 1.0219, 0.9993, 0.9914, 0.9921, 0.9957, 0.9988, 1.0004, 1)';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  // Use passive event listener for better scroll performance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
    setIsMoreOpen(false);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled && !isMobileMenuOpen
            ? 'bg-white/80 backdrop-blur-xl border-b border-border/50'
            : isMobileMenuOpen
            ? 'bg-white'
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group relative z-50" onClick={closeMobileMenu}>
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

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors professional-text"
                >
                  {link.name}
                </Link>
              ))}
              <motion.a
                href="https://t.me/TheCryptoCoopBot"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-foreground text-background px-5 py-2 rounded-md text-sm professional-text font-medium inline-flex items-center gap-2 transition-opacity hover:opacity-90"
              >
                Open Exchange
                <ArrowRight className="w-4 h-4" />
              </motion.a>
            </div>

            {/* Mobile Menu Toggle - Animated Hamburger */}
            <button
              className="md:hidden relative z-50 w-10 h-10 flex items-center justify-center"
              onClick={() => setIsMobileMenuOpen(prev => !prev)}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <span
                  className="block h-[2px] w-6 bg-foreground rounded-full origin-center transition-all duration-300"
                  style={{
                    transitionTimingFunction: SPRING_ITEMS,
                    transform: isMobileMenuOpen
                      ? 'translateY(9px) rotate(45deg)'
                      : 'translateY(0) rotate(0)',
                  }}
                />
                <span
                  className="block h-[2px] w-6 bg-foreground rounded-full transition-all duration-200"
                  style={{
                    opacity: isMobileMenuOpen ? 0 : 1,
                    transform: isMobileMenuOpen ? 'scaleX(0)' : 'scaleX(1)',
                  }}
                />
                <span
                  className="block h-[2px] w-6 bg-foreground rounded-full origin-center transition-all duration-300"
                  style={{
                    transitionTimingFunction: SPRING_ITEMS,
                    transform: isMobileMenuOpen
                      ? 'translateY(-9px) rotate(-45deg)'
                      : 'translateY(0) rotate(0)',
                  }}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Full-Screen Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Background */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-white"
            />

            {/* Menu Content */}
            <div className="relative z-10 flex flex-col h-full pt-24 pb-10 px-8 overflow-y-auto">
              {/* Main Nav Links */}
              <nav className="flex-1 flex flex-col justify-center gap-0">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -32 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.08 + index * 0.07,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                  >
                    <Link
                      href={link.href}
                      className="block text-[3.25rem] leading-[1.15] font-semibold text-foreground py-3 tracking-[-0.03em] transition-colors hover:text-primary active:text-primary/80"
                      style={{ fontFamily: 'var(--font-space-grotesk)' }}
                      onClick={closeMobileMenu}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Divider */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                exit={{ scaleX: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="h-px bg-border origin-left mb-6"
              />

              {/* More Button + Expandable Links */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.4, delay: 0.32 }}
                className="mb-6"
              >
                <button
                  onClick={() => setIsMoreOpen(prev => !prev)}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground professional-text font-medium transition-colors py-2"
                >
                  <span>More</span>
                  <motion.div
                    animate={{ rotate: isMoreOpen ? 180 : 0 }}
                    transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isMoreOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-wrap gap-x-5 gap-y-2 pt-3 pb-1">
                        {moreLinks.map((link, index) => (
                          <motion.div
                            key={link.name}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{
                              duration: 0.2,
                              delay: index * 0.03,
                              ease: [0.25, 0.46, 0.45, 0.94],
                            }}
                          >
                            {link.href.startsWith('http') ? (
                              <a
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[13px] text-muted-foreground hover:text-foreground professional-text transition-colors"
                                onClick={closeMobileMenu}
                              >
                                {link.name}
                              </a>
                            ) : (
                              <Link
                                href={link.href}
                                className="text-[13px] text-muted-foreground hover:text-foreground professional-text transition-colors"
                                onClick={closeMobileMenu}
                              >
                                {link.name}
                              </Link>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{
                  duration: 0.45,
                  delay: 0.35,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <a
                  href="https://t.me/TheCryptoCoopBot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 bg-foreground text-background w-full py-4 rounded-xl text-lg professional-text font-medium transition-all active:scale-[0.98]"
                  style={{
                    transitionTimingFunction: SPRING_CTA,
                    transitionDuration: '450ms',
                  }}
                  onClick={closeMobileMenu}
                >
                  Open Exchange
                  <ArrowRight className="w-5 h-5" />
                </a>
              </motion.div>

              {/* Footer tagline */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.45 }}
                className="text-center text-xs text-muted-foreground professional-text mt-5"
              >
                Cryptocoop &mdash; Crypto Exchange
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
