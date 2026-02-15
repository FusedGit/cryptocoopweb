'use client';

import { motion } from 'framer-motion';
import { Shield, Check } from 'lucide-react';

export default function SecurityBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="inline-flex items-center gap-2 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-full px-4 py-2"
    >
      <div className="relative">
        <Shield className="w-4 h-4 text-green-600" />
        <motion.div
          className="absolute -top-1 -right-1"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        >
          <div className="bg-green-600 rounded-full p-0.5">
            <Check className="w-2 h-2 text-white" strokeWidth={3} />
          </div>
        </motion.div>
      </div>
      <div className="flex flex-col">
        <span className="text-xs font-bold text-green-900">Verified Secure</span>
        <span className="text-[10px] text-green-700">256-bit encryption</span>
      </div>
    </motion.div>
  );
}
