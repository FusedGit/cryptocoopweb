'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Shield, Mail } from 'lucide-react';

export default function LawEnforcementPage() {
  return (
    <main className="min-h-screen w-full bg-gradient-to-b from-yellow-50 via-white to-cyan-50">
      {/* Back Button */}
      <div className="container mx-auto px-4 pt-24">
        <Link href="/" className="inline-flex items-center gap-2 text-foreground hover:text-primary font-bold doodle-text mb-8">
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>
      </div>

      <section className="container mx-auto px-4 py-12 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-4 doodle-text">
              Law Enforcement Requests
            </h1>
            <p className="text-xl text-muted-foreground font-semibold doodle-text">
              Information for law enforcement and regulatory agencies
            </p>
          </div>

          {/* Content Sections */}
          <div className="space-y-8">
            {/* Section 1 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 border-4 border-black"
            >
              <h2 className="text-2xl font-black text-foreground mb-4 doodle-text">
                I am a law enforcement officer and would like to contact Cryptocoop for cooperation on a case
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed font-semibold">
                Cryptocoop will carefully review each law enforcement request and cooperate on a case-by-case basis to disclose information, in accordance with our internal policies and applicable laws. All communications and requests must be fully verified.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed font-semibold mt-4">
                Please note that <span className="text-orange-600 font-black">Cryptocoop does not store user information for trades</span>. We operate as a peer-to-peer platform that facilitates connections between buyers and sellers without maintaining transaction databases or user profiles beyond basic account information.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed font-semibold mt-4">
                All law enforcement requests should be sent to: <a href="https://t.me/cryptocoop2024" target="_blank" rel="noopener noreferrer" className="text-primary font-black hover:underline">@cryptocoop2024</a>
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed font-semibold mt-4">
                To ensure accurate review of your request, we kindly ask that all submissions be made <span className="font-black">in English</span>. This will help us handle your inquiry efficiently and without errors.
              </p>
            </motion.div>

            {/* Section 2 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white p-8 border-4 border-black"
            >
              <h2 className="text-2xl font-black text-foreground mb-4 doodle-text">
                A law enforcement officer working on my case would like to contact Cryptocoop
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed font-semibold">
                Please ask your officer to send an official request to: <a href="https://t.me/cryptocoop2024" target="_blank" rel="noopener noreferrer" className="text-primary font-black hover:underline">@cryptocoop2024</a>
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed font-semibold mt-4">
                Kindly share these instructions with your officer.
              </p>
            </motion.div>

            {/* Section 3 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white p-8 border-4 border-black"
            >
              <h2 className="text-2xl font-black text-foreground mb-4 doodle-text">
                I am a regulatory agency representative and would like to contact Cryptocoop
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed font-semibold">
                All requests from regulatory agencies should be sent to: <a href="https://t.me/cryptocoop2024" target="_blank" rel="noopener noreferrer" className="text-primary font-black hover:underline">@cryptocoop2024</a>
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed font-semibold mt-4">
                To ensure accurate review of your request, we kindly ask that all submissions be made <span className="font-black">in English</span>. This will help us handle your inquiry efficiently and without errors.
              </p>
            </motion.div>

            {/* Important Note */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-yellow-100 p-8 border-4 border-orange-500"
            >
              <h3 className="text-xl font-black text-orange-600 mb-3 doodle-text flex items-center gap-2">
                <Shield className="w-6 h-6" />
                Important Information
              </h3>
              <p className="text-lg text-foreground leading-relaxed font-semibold">
                Cryptocoop operates as a decentralized peer-to-peer platform. We do not hold, store, or control user funds. All transactions occur directly between users. We maintain minimal user data in compliance with our privacy-first approach.
              </p>
              <p className="text-lg text-foreground leading-relaxed font-semibold mt-3">
                Each request will be reviewed individually and handled according to applicable laws and our Terms of Service.
              </p>
            </motion.div>
          </div>

          {/* Contact Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-12 text-center"
          >
            <a 
              href="https://t.me/cryptocoop2024"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-primary text-white px-8 py-4 font-black text-lg doodle-text sketchy-shadow border-4 border-black hover:scale-105 transition-transform"
            >
              <Mail className="w-6 h-6" />
              Contact via Telegram
            </a>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}
