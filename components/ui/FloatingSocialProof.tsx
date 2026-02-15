'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Star, ArrowUp, ArrowDown } from 'lucide-react';
import Image from 'next/image';

interface SocialProofComment {
  type: 'twitter' | 'reddit' | 'trustpilot';
  author: string;
  handle?: string;
  avatar?: string;
  text: string;
  source?: string;
  likes?: number;
  upvotes?: number;
  rating?: number;
  timestamp?: string;
  verified?: boolean;
}

interface FloatingSocialProofProps {
  comments: SocialProofComment[];
  position: 'left' | 'right';
}

function getCommentUrl(comment: SocialProofComment): string {
  if (comment.source) return comment.source;

  if (comment.type === 'twitter') {
    if (comment.handle) {
      const handle = comment.handle.replace(/^@/, '');
      const query = `from:${handle} ${comment.text.slice(0, 80)}`;
      return `https://x.com/search?q=${encodeURIComponent(query)}&f=live`;
    }
    return `https://x.com/search?q=${encodeURIComponent(comment.text)}`;
  }

  if (comment.type === 'reddit') {
    return `https://www.reddit.com/user/${encodeURIComponent(comment.author)}`;
  }

  return 'https://www.trustpilot.com/';
}

const TwitterCard = ({ comment }: { comment: SocialProofComment }) => (
  <a
    href={getCommentUrl(comment)}
    target="_blank"
    rel="noopener noreferrer"
    className="block bg-white rounded-2xl p-4 shadow-lg border border-gray-200 max-w-[320px] pointer-events-auto hover:shadow-xl transition-shadow"
  >
    <div className="flex items-start gap-3 mb-3">
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold">
        {comment.author[0]}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1">
          <span className="font-bold text-gray-900 text-sm truncate">@{comment.handle || comment.author}</span>
          {comment.verified && (
            <svg className="w-4 h-4 text-blue-500 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          )}
        </div>
        <span className="text-gray-500 text-sm">{comment.author}</span>
      </div>
      <div className="relative w-5 h-5 flex-shrink-0">
        <Image src="/brands/X.svg" alt="X" fill className="object-contain" />
      </div>
    </div>
    <p className="text-gray-900 text-sm leading-relaxed mb-3">{comment.text}</p>
    <div className="flex items-center gap-4 text-gray-500 text-xs">
      <span>{comment.timestamp}</span>
      <span>· {comment.likes?.toLocaleString()} likes</span>
    </div>
  </a>
);

const RedditCard = ({ comment }: { comment: SocialProofComment }) => (
  <a
    href={getCommentUrl(comment)}
    target="_blank"
    rel="noopener noreferrer"
    className="block bg-white rounded-xl p-4 shadow-lg border border-gray-300 max-w-[340px] pointer-events-auto hover:shadow-xl transition-shadow"
  >
    <div className="flex gap-3">
      <div className="flex flex-col items-center gap-1 pt-1">
        <button className="text-gray-400 hover:text-orange-500 transition-colors">
          <ArrowUp className="w-6 h-6" strokeWidth={2} />
        </button>
        <span className="text-sm font-bold text-gray-700">{comment.upvotes}</span>
        <button className="text-gray-400 hover:text-blue-500 transition-colors">
          <ArrowDown className="w-6 h-6" strokeWidth={2} />
        </button>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-2">
          <div className="relative w-16 h-4">
            <Image src="/brands/Reddit.svg" alt="Reddit" fill className="object-contain object-left" />
          </div>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-bold text-gray-900">r/cryptocurrency</span>
          <span className="text-gray-400">•</span>
          <span className="text-xs text-gray-500">Posted by u/{comment.author}</span>
        </div>
        <p className="text-sm text-gray-900 leading-relaxed">{comment.text}</p>
        <div className="flex items-center gap-3 mt-3 text-xs text-gray-500">
          <MessageSquare className="w-4 h-4" />
          <span>{comment.timestamp}</span>
        </div>
      </div>
    </div>
  </a>
);

const TrustpilotCard = ({ comment }: { comment: SocialProofComment }) => (
  <a
    href={getCommentUrl(comment)}
    target="_blank"
    rel="noopener noreferrer"
    className="block bg-white rounded-xl p-5 shadow-lg border border-gray-200 max-w-[340px] pointer-events-auto hover:shadow-xl transition-shadow"
  >
    <div className="flex items-start justify-between mb-3">
      <div className="flex-1">
        <div className="relative w-24 h-6 mb-3">
          <Image src="/brands/Trustpilot.svg" alt="Trustpilot" fill className="object-contain object-left" />
        </div>
        <div className="flex items-center gap-2 mb-2">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < (comment.rating || 5)
                    ? 'fill-[#00B67A] text-[#00B67A]'
                    : 'fill-gray-300 text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">{comment.timestamp}</span>
        </div>
        <p className="text-sm text-gray-900 leading-relaxed mb-3">{comment.text}</p>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white text-xs font-bold">
            {comment.author[0]}
          </div>
          <span className="text-sm font-medium text-gray-900">{comment.author}</span>
          <svg className="w-4 h-4 text-green-600" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
      </div>
    </div>
  </a>
);

export default function FloatingSocialProof({ comments, position }: FloatingSocialProofProps) {
  const isLeft = position === 'left';

  // Different rotations for each card to make it messy
  const rotations = isLeft 
    ? [-4, 3, -5]
    : [5, -3, 4];

  // More spread out Y positions
  const yPositions = isLeft 
    ? [10, 200, 390]
    : [80, 270, 460];

  return (
    <div className={`absolute top-0 ${isLeft ? 'left-0' : 'right-0'} h-full w-[400px] hidden lg:block`}>
      <AnimatePresence mode="wait">
        {comments.map((comment, index) => {
          const Component = 
            comment.type === 'twitter' ? TwitterCard :
            comment.type === 'reddit' ? RedditCard :
            TrustpilotCard;

          return (
            <motion.div
              key={`${comment.type}-${comment.author}-${index}`}
              initial={{ 
                opacity: 0, 
                x: isLeft ? -100 : 100,
                y: yPositions[index] || 0,
                rotate: rotations[index] || 0
              }}
              animate={{ 
                opacity: 1, 
                x: 0,
                y: [
                  yPositions[index] || 0, 
                  (yPositions[index] || 0) + 20, 
                  yPositions[index] || 0
                ],
                rotate: rotations[index] || 0
              }}
              exit={{ 
                opacity: 0, 
                x: isLeft ? -100 : 100 
              }}
              transition={{
                opacity: { duration: 0.5 },
                x: { duration: 0.5 },
                y: {
                  duration: 4 + (index * 0.7),
                  repeat: Infinity,
                  ease: "easeInOut"
                },
                rotate: { duration: 0.5 }
              }}
              className="absolute"
              style={{
                left: isLeft ? '0px' : undefined,
                right: isLeft ? undefined : '0px',
              }}
            >
              <Component comment={comment} />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
