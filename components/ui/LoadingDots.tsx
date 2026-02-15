'use client';

import { motion } from 'framer-motion';

export default function LoadingDots({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className="w-2 h-2 bg-foreground rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: index * 0.15,
          }}
        />
      ))}
    </div>
  );
}
