'use client';

import { motion } from 'framer-motion';
import { MessageSquare, Star, ArrowUp, ArrowDown, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export interface Testimonial {
  username: string;
  platform: string;
  date: string;
  upvotes?: string;
  retweets?: string;
  rating?: string;
  complaint: string;
  source: string;
  verified: boolean;
}

interface InfiniteTestimonialScrollProps {
  testimonials: Testimonial[];
}

function cleanHandle(username: string): string {
  return username.replace(/^@/, '').trim();
}

function resolveSourceUrl(testimonial: Testimonial): string {
  const source = testimonial.source?.trim() || '';
  const platform = testimonial.platform.toLowerCase();

  if (source === 'https://twitter.com' || source === 'https://x.com') {
    const handle = cleanHandle(testimonial.username);
    const query = `from:${handle} ${testimonial.complaint.slice(0, 80)}`;
    return `https://x.com/search?q=${encodeURIComponent(query)}&f=live`;
  }

  if (source.startsWith('https://reddit.com/r/') || source.startsWith('https://www.reddit.com/r/')) {
    return `https://www.reddit.com/user/${encodeURIComponent(cleanHandle(testimonial.username))}`;
  }

  if (platform.includes('twitter') || platform.includes('x')) {
    if (source) return source;
    const handle = cleanHandle(testimonial.username);
    const query = `from:${handle} ${testimonial.complaint.slice(0, 80)}`;
    return `https://x.com/search?q=${encodeURIComponent(query)}&f=live`;
  }

  return source;
}

const TwitterCard = ({ testimonial }: { testimonial: Testimonial }) => {
  const [isHovered, setIsHovered] = useState(false);
  const sourceUrl = resolveSourceUrl(testimonial);
  const cleanUsername = cleanHandle(testimonial.username);

  return (
    <motion.a
      href={sourceUrl}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.2 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="block bg-white rounded-2xl p-5 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow cursor-pointer w-[380px] flex-shrink-0"
    >
      <div className="flex items-start gap-3 mb-3">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
          {testimonial.username[0].toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1">
            <span className="font-bold text-gray-900 text-sm truncate">@{cleanUsername}</span>
            {testimonial.verified && (
              <svg className="w-4 h-4 text-blue-500 flex-shrink-0" viewBox="0 0 22 22" fill="currentColor">
                <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"/>
              </svg>
            )}
          </div>
          <span className="text-gray-500 text-xs">{testimonial.username}</span>
        </div>
        <div className="relative w-5 h-5 flex-shrink-0">
          <Image src="/brands/X.svg" alt="X" fill className="object-contain" />
        </div>
      </div>
      <p className="text-gray-900 text-sm leading-relaxed mb-3 line-clamp-4">
        {testimonial.complaint}
      </p>
      <div className="flex items-center justify-between text-gray-500 text-xs">
        <span>{testimonial.date}</span>
        {testimonial.retweets && (
          <span className="font-medium">🔄 {testimonial.retweets} retweets</span>
        )}
      </div>
      {isHovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-3 flex items-center gap-1 text-blue-600 text-sm font-medium"
        >
          <span>View on X</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </motion.div>
      )}
    </motion.a>
  );
};

const RedditCard = ({ testimonial }: { testimonial: Testimonial }) => {
  const [isHovered, setIsHovered] = useState(false);
  const sourceUrl = resolveSourceUrl(testimonial);
  const cleanUsername = cleanHandle(testimonial.username);

  return (
    <motion.a
      href={sourceUrl}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.2 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="block bg-white rounded-xl p-5 shadow-lg border border-gray-300 hover:shadow-xl transition-shadow cursor-pointer w-[380px] flex-shrink-0"
    >
      <div className="flex gap-3">
        <div className="flex flex-col items-center gap-1 pt-1">
          <button className="text-gray-400 pointer-events-none">
            <ArrowUp className="w-6 h-6" strokeWidth={2} />
          </button>
          <span className="text-sm font-bold text-orange-500">{testimonial.upvotes}</span>
          <button className="text-gray-400 pointer-events-none">
            <ArrowDown className="w-6 h-6" strokeWidth={2} />
          </button>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <div className="relative w-16 h-4">
              <Image src="/brands/Reddit.svg" alt="Reddit" fill className="object-contain object-left" />
            </div>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold text-gray-900">r/cryptocurrency</span>
            <span className="text-gray-400">•</span>
            <span className="text-xs text-gray-500">u/{cleanUsername}</span>
          </div>
          <p className="text-sm text-gray-900 leading-relaxed mb-3 line-clamp-4">
            {testimonial.complaint}
          </p>
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <MessageSquare className="w-4 h-4" />
            <span>{testimonial.date}</span>
          </div>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-3 flex items-center gap-1 text-orange-600 text-sm font-medium"
            >
              <span>View on Reddit</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </motion.div>
          )}
        </div>
      </div>
    </motion.a>
  );
};

const TrustpilotCard = ({ testimonial }: { testimonial: Testimonial }) => {
  const [isHovered, setIsHovered] = useState(false);
  const rating = testimonial.rating ? parseInt(testimonial.rating.split('/')[0]) : 1;
  const sourceUrl = resolveSourceUrl(testimonial);

  return (
    <motion.a
      href={sourceUrl}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.2 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="block bg-white rounded-xl p-5 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow cursor-pointer w-[380px] flex-shrink-0"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="relative w-24 h-6 mb-3">
            <Image src="/brands/Trustpilot.svg" alt="Trustpilot" fill className="object-contain object-left" />
          </div>
          <div className="flex items-center gap-2 mb-3">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < rating
                      ? 'fill-[#00B67A] text-[#00B67A]'
                      : 'fill-gray-300 text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500">{testimonial.date}</span>
          </div>
          <p className="text-sm text-gray-900 leading-relaxed mb-3 line-clamp-4">
            {testimonial.complaint}
          </p>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white text-xs font-bold">
              {testimonial.username[0].toUpperCase()}
            </div>
            <span className="text-sm font-medium text-gray-900">{testimonial.username}</span>
            {testimonial.verified && (
              <svg className="w-4 h-4 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            )}
          </div>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-3 flex items-center gap-1 text-green-600 text-sm font-medium"
            >
              <span>View on Trustpilot</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </motion.div>
          )}
        </div>
      </div>
    </motion.a>
  );
};

const getCardComponent = (platform: string) => {
  if (platform.toLowerCase().includes('twitter') || platform.toLowerCase().includes('x')) {
    return TwitterCard;
  }
  if (platform.toLowerCase().includes('reddit')) {
    return RedditCard;
  }
  if (platform.toLowerCase().includes('trustpilot')) {
    return TrustpilotCard;
  }
  return TwitterCard; // fallback
};

export default function InfiniteTestimonialScroll({ testimonials }: InfiniteTestimonialScrollProps) {
  // Duplicate testimonials to create seamless loop
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <div className="relative overflow-hidden py-8">
      {/* Gradient overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      
      {/* Scrolling container */}
      <motion.div
        className="flex gap-6"
        animate={{
          x: [0, -testimonials.length * (380 + 24)], // 380px card width + 24px gap
        }}
        transition={{
          x: {
            duration: testimonials.length * 8, // 8 seconds per card
            repeat: Infinity,
            ease: 'linear',
          },
        }}
      >
        {duplicatedTestimonials.map((testimonial, index) => {
          const CardComponent = getCardComponent(testimonial.platform);
          return (
            <div key={index}>
              <CardComponent testimonial={testimonial} />
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
