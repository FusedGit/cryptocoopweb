'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, ReactNode } from 'react';

interface InfoTooltipProps {
  children: ReactNode;
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export default function InfoTooltip({ 
  children, 
  content, 
  position = 'top' 
}: InfoTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  const positionStyles = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: position === 'top' ? 5 : -5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: position === 'top' ? 5 : -5 }}
            transition={{ duration: 0.15 }}
            className={`absolute ${positionStyles[position]} z-50 pointer-events-none`}
          >
            <div className="bg-foreground text-background text-xs px-3 py-2 rounded-lg whitespace-nowrap elevated-shadow professional-text">
              {content}
              {/* Arrow */}
              <div
                className={`absolute w-2 h-2 bg-foreground transform rotate-45 ${
                  position === 'top'
                    ? 'top-full left-1/2 -translate-x-1/2 -mt-1'
                    : position === 'bottom'
                    ? 'bottom-full left-1/2 -translate-x-1/2 -mb-1'
                    : position === 'left'
                    ? 'left-full top-1/2 -translate-y-1/2 -ml-1'
                    : 'right-full top-1/2 -translate-y-1/2 -mr-1'
                }`}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
