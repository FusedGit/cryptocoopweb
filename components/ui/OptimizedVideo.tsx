'use client';

import { useEffect, useRef, useState } from 'react';

interface OptimizedVideoProps {
  src: string;
  poster?: string;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  preload?: 'none' | 'metadata' | 'auto';
  priority?: boolean;
  onLoadStart?: () => void;
  onCanPlay?: () => void;
  style?: React.CSSProperties;
}

/**
 * OptimizedVideo Component
 * 
 * High-performance video component with:
 * - Instant display using poster image
 * - Aggressive preloading for priority videos
 * - Progressive loading for non-priority videos
 * - Mobile-optimized playback
 * - Automatic error handling and retry
 */
export default function OptimizedVideo({
  src,
  poster,
  className = '',
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
  preload = 'auto',
  priority = false,
  onLoadStart,
  onCanPlay,
  style,
}: OptimizedVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // If priority video, load immediately
    if (priority) {
      setIsInView(true);
      return;
    }

    const video = videoRef.current;
    if (!video) return;

    // Create Intersection Observer for lazy loading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect(); // Stop observing once loaded
          }
        });
      },
      {
        rootMargin: '50px', // Start loading 50px before entering viewport
        threshold: 0.01,
      }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, [priority]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isInView) return;

    const handleLoadStart = () => {
      onLoadStart?.();
    };

    const handleCanPlay = () => {
      onCanPlay?.();
      
      // Attempt to play if autoPlay is enabled
      if (autoPlay) {
        const playPromise = video.play();
        
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            // Auto-play was prevented, this is normal on some browsers/contexts
            console.log('Autoplay prevented:', error);
          });
        }
      }
    };

    const handleError = () => {
      setHasError(true);
      console.error('Video loading error:', src);
    };

    video.addEventListener('loadstart', handleLoadStart);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('loadstart', handleLoadStart);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
    };
  }, [isInView, autoPlay, onLoadStart, onCanPlay, src]);

  // Retry loading on error
  useEffect(() => {
    if (hasError && videoRef.current) {
      const retryTimer = setTimeout(() => {
        setHasError(false);
        videoRef.current?.load();
      }, 2000);

      return () => clearTimeout(retryTimer);
    }
  }, [hasError]);

  return (
    <video
      ref={videoRef}
      className={className}
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
      playsInline={playsInline}
      preload={preload}
      poster={poster}
      style={style}
      // Only set src when in view to enable lazy loading
      {...(isInView && { src })}
    >
      <source src={isInView ? src : undefined} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}
