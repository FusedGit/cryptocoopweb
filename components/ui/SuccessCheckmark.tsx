'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export default function SuccessCheckmark() {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      className="flex items-center justify-center"
    >
      <motion.div
        className="relative"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        {/* Outer circle */}
        <motion.div
          className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
        >
          {/* Inner checkmark */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
          >
            <Check className="w-8 h-8 text-white" strokeWidth={3} />
          </motion.div>
        </motion.div>

        {/* Ripple effect */}
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-green-500"
          initial={{ scale: 1, opacity: 1 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      </motion.div>
    </motion.div>
  );
}
