"use client";

import {
  animate,
  easeIn,
  mix,
  motion,
  progress,
  useMotionValue,
  useTransform,
  wrap,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { AlertTriangle, Clock, Ban, Database, X, Heart, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ExchangeData {
  name: string;
  slug: string;
  logo: string;
  symbolLogo?: string;
  isTextLogo?: boolean;
  incidents: {
    type: string;
    count: string;
    label: string;
  }[];
  quote: string;
  trustScore: string;
}

interface CardStackProps {
  exchanges: ExchangeData[];
  maxRotate?: number;
  onCardChange?: (index: number) => void;
}

const iconMap = {
  frozen: Ban,
  time: Clock,
  breach: Database,
  complaints: AlertTriangle,
  ban: Ban,
};

export default function ExchangeCardStack({
  exchanges,
  maxRotate = 5,
  onCardChange,
}: CardStackProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipedRight, setSwipedRight] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(500);

  useEffect(() => {
    if (!ref.current) return;
    setWidth(ref.current.offsetWidth);
  }, []);

  useEffect(() => {
    onCardChange?.(currentIndex);
  }, [currentIndex, onCardChange]);

  const allSwiped = currentIndex >= exchanges.length;

  return (
    <div className="flex flex-col items-center">
      <div className="exchange-stack" ref={ref}>
        {!allSwiped ? (
          <>
            {exchanges.map((exchange, index) => {
              return (
                <StackCard
                  {...exchange}
                  minDistance={width * 0.4}
                  maxRotate={maxRotate}
                  key={exchange.slug}
                  index={index}
                  currentIndex={currentIndex}
                  totalCards={exchanges.length}
                  setNextCard={(direction) => {
                    if (direction === "right") {
                      setSwipedRight((prev) => prev + 1);
                    }
                    setCurrentIndex(
                      wrap(0, exchanges.length, currentIndex + 1)
                    );
                  }}
                />
              );
            })}
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center h-full text-center p-8"
          >
            <div className="text-6xl mb-4">🚫</div>
            <h3 className="text-2xl font-bold text-foreground mb-4 heading-text">
              Would you trust any of them?
            </h3>
            <p className="text-muted-foreground professional-text mb-2">
              You swiped right on {swipedRight} out of {exchanges.length} exchanges
            </p>
            <p className="text-lg text-foreground font-medium professional-text">
              With CryptoCoop, there's nothing to worry about.
              <br />
              Zero frozen accounts. Ever.
            </p>
          </motion.div>
        )}
      </div>

      <style>{`
        .exchange-stack {
          position: relative;
          width: 420px;
          height: 600px;
          max-width: 90vw;
          margin: 20px auto 0 auto;
        }

        @media (max-width: 768px) {
          .exchange-stack {
            width: 320px;
            height: 520px;
          }
        }
      `}</style>
    </div>
  );
}

interface StackCardProps extends ExchangeData {
  index: number;
  totalCards: number;
  currentIndex: number;
  maxRotate: number;
  minDistance?: number;
  minSpeed?: number;
  setNextCard: (direction: "left" | "right") => void;
}

function StackCard({
  name,
  slug,
  logo,
  symbolLogo,
  isTextLogo = false,
  incidents,
  quote,
  trustScore,
  index,
  currentIndex,
  totalCards,
  maxRotate,
  setNextCard,
  minDistance = 200,
  minSpeed = 50,
}: StackCardProps) {
  const baseRotation = mix(0, maxRotate, Math.sin(index));
  const x = useMotionValue(0);
  const rotate = useTransform(
    x,
    [0, 400],
    [baseRotation, baseRotation + 10],
    { clamp: false }
  );
  const zIndex = totalCards - wrap(totalCards, 0, index - currentIndex + 1);

  const onDragEnd = () => {
    const distance = x.get();
    const speed = Math.abs(x.getVelocity());

    if (Math.abs(distance) > minDistance || speed > minSpeed) {
      const direction = distance > 0 ? "right" : "left";
      setNextCard(direction);

      animate(x, 0, {
        type: "spring",
        stiffness: 600,
        damping: 50,
      });
    } else {
      animate(x, 0, {
        type: "spring",
        stiffness: 300,
        damping: 50,
      });
    }
  };

  const opacity = progress(totalCards * 0.25, totalCards * 0.75, zIndex);
  const progressInStack = progress(0, totalCards - 1, zIndex);
  const scale = mix(0.85, 1, easeIn(progressInStack));

  // Show/hide swipe indicators
  const showLeft = useTransform(x, [-100, -50, 0], [1, 0.5, 0]);
  const showRight = useTransform(x, [0, 50, 100], [0, 0.5, 1]);

  return (
    <motion.div
      className="exchange-card"
      style={{
        zIndex,
        rotate,
        x,
      }}
      initial={{ opacity: 0, scale: 0.3 }}
      animate={{ opacity, scale }}
      whileTap={index === currentIndex ? { scale: 0.98 } : {}}
      transition={{
        type: "spring",
        stiffness: 600,
        damping: 30,
      }}
      drag={index === currentIndex ? "x" : false}
      onDragEnd={onDragEnd}
    >
      {/* Swipe Indicators */}
      <motion.div
        className="swipe-indicator swipe-left"
        style={{ opacity: showLeft }}
      >
        <X className="w-12 h-12" strokeWidth={3} />
      </motion.div>
      <motion.div
        className="swipe-indicator swipe-right"
        style={{ opacity: showRight }}
      >
        <Heart className="w-12 h-12" strokeWidth={3} />
      </motion.div>

      {/* Card Content */}
      <div className="card-inner">
        {/* Top Left Corner */}
        <div className="card-corner corner-top-left">
          {symbolLogo && (
            <div className={`corner-logo icon-logo ${slug === 'cryptocom' ? 'crypto-symbol' : ''}`}>
              <Image
                src={symbolLogo}
                alt={name}
                fill
                className="object-contain"
                onPointerDown={(e) => e.preventDefault()}
              />
            </div>
          )}
        </div>

        {/* Bottom Right Corner */}
        <div className="card-corner corner-bottom-right">
          {symbolLogo && (
            <div className={`corner-logo icon-logo rotate-180 ${slug === 'cryptocom' ? 'crypto-symbol' : ''}`}>
              <Image
                src={symbolLogo}
                alt={name}
                fill
                className="object-contain"
                onPointerDown={(e) => e.preventDefault()}
              />
            </div>
          )}
        </div>

        {/* Center Content */}
        <div className="card-content">
          {/* Main Logo/Name and Rating */}
          <div className="card-title-section">
            {logo && (
              <div className={`main-logo ${isTextLogo ? 'w-44 h-14' : 'w-16 h-16'} ${slug === 'cryptocom' ? 'cryptocom-main-logo' : ''}`}>
                <Image
                  src={logo}
                  alt={name}
                  fill
                  className="object-contain"
                  onPointerDown={(e) => e.preventDefault()}
                />
              </div>
            )}
            {!isTextLogo && (
              <h3 className="text-2xl font-black text-gray-900 heading-text mt-2">
                {name}
              </h3>
            )}
            <div className="card-rating-badge">
              <span className="text-sm font-bold text-white">{trustScore}</span>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="stats-grid">
            {incidents.map((incident, idx) => {
              const Icon = iconMap[incident.type as keyof typeof iconMap];
              return (
                <div key={idx} className="stat-card">
                  <div className="stat-icon">
                    <Icon className="w-4 h-4 text-white" strokeWidth={2.5} />
                  </div>
                  <div className="stat-value">{incident.count}</div>
                  <div className="stat-label">{incident.label}</div>
                </div>
              );
            })}
          </div>

          {/* View More Link */}
          <Link 
            href={`/incidents/${slug}`}
            className="card-link"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
          >
            <span>View more cases like this</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <style>{`
        .exchange-card {
          position: absolute;
          top: 50%;
          left: 50%;
          translate: -50% -50%;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
          border: 3px solid #1a1a1a;
          border-radius: 32px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05) inset;
          will-change: transform, opacity;
          cursor: grab;
          overflow: hidden;
          user-select: none;
        }

        .exchange-card::before {
          content: '';
          position: absolute;
          inset: 8px;
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 26px;
          pointer-events: none;
        }

        .exchange-card:active {
          cursor: grabbing;
        }

        .card-inner {
          width: 100%;
          height: 100%;
          padding: 16px;
          position: relative;
        }

        .card-corner {
          position: absolute;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }

        .corner-top-left {
          top: 16px;
          left: 16px;
        }

        .corner-bottom-right {
          bottom: 16px;
          right: 16px;
        }

        .corner-logo {
          position: relative;
          background: white;
          border-radius: 12px;
          padding: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          width: 40px;
          height: 40px;
        }

        .corner-logo img {
          border-radius: 14px;
        }

        .corner-logo.crypto-symbol {
          filter: brightness(0);
        }

        .card-rating-badge {
          margin-top: 8px;
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
          padding: 6px 14px;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
          border: 2px solid white;
        }

        .card-content {
          display: flex;
          flex-direction: column;
          height: 100%;
          padding: 50px 16px 50px 16px;
        }

        .card-title-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 16px;
          padding-bottom: 16px;
          border-bottom: 2px dashed #e5e7eb;
        }

        .main-logo {
          position: relative;
          background: transparent;
          border: none;
          box-shadow: none;
          padding: 0;
        }

        .cryptocom-main-logo {
          filter: brightness(0);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
          margin-bottom: 16px;
        }

        .stat-card {
          background: linear-gradient(135deg, #fee 0%, #fef2f2 100%);
          border: 2px solid #fecaca;
          border-radius: 10px;
          padding: 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          box-shadow: 0 2px 8px rgba(239, 68, 68, 0.1);
        }

        .stat-icon {
          width: 28px;
          height: 28px;
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
          border-radius: 7px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 6px;
          box-shadow: 0 2px 8px rgba(239, 68, 68, 0.3);
        }

        .stat-value {
          font-size: 16px;
          font-weight: 900;
          color: #dc2626;
          margin-bottom: 3px;
          line-height: 1;
        }

        .stat-label {
          font-size: 9px;
          color: #374151;
          line-height: 1.2;
        }

        .card-link {
          background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
          color: white;
          border-radius: 10px;
          padding: 12px 16px;
          text-decoration: none;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: auto;
          margin-bottom: 30px;
          font-size: 13px;
          font-weight: 600;
          transition: all 0.2s ease;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .card-link:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
        }

        .card-link:active {
          transform: translateY(0);
        }

        .swipe-indicator {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          padding: 20px;
          border-radius: 24px;
          pointer-events: none;
          z-index: 10;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          border: 3px solid white;
        }

        .swipe-left {
          left: 50px;
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
          color: white;
        }

        .swipe-right {
          right: 50px;
          background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
          color: white;
        }
      `}</style>
    </motion.div>
  );
}
