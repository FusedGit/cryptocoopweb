'use client';

import { AnimateNumber, Cursor } from 'motion-plus/react';
import {
  AnimatePresence,
  motion,
  MotionConfig,
  useInView,
  type MotionValue,
} from 'motion/react';
import { useState, useMemo, useEffect, useRef } from 'react';

const turnoverData = [
  { year: '2020', value: 2 },
  { year: '2021', value: 5 },
  { year: '2022', value: 8 },
  { year: '2023', value: 12 },
  { year: '2024', value: 18 },
  { year: '2025', value: 28 },
  { year: '2026', value: 40 },
];

const GRAPH_WIDTH = 800;
const GRAPH_HEIGHT = 360;
const PADDING_X = 60;
const PADDING_Y = 40;
const PLOT_WIDTH = GRAPH_WIDTH - PADDING_X * 2;
const PLOT_HEIGHT = GRAPH_HEIGHT - PADDING_Y * 2;

const maxValue = 45;

function buildPath(
  path: string,
  point: { x: number; y: number },
  i: number
) {
  if (i === 0) return `M ${point.x},${point.y}`;
  return `${path} L ${point.x},${point.y}`;
}

const gridLines = [0, 10, 20, 30, 40];

interface TurnoverGraphProps {
  scrollProgress?: MotionValue<number>;
}

export function TurnoverGraph({ scrollProgress }: TurnoverGraphProps) {
  const graphRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(graphRef, { once: true, margin: '-100px' });

  const points = useMemo(
    () =>
      turnoverData.map((d, i) => ({
        x: PADDING_X + (i / (turnoverData.length - 1)) * PLOT_WIDTH,
        y: PADDING_Y + PLOT_HEIGHT - (d.value / maxValue) * PLOT_HEIGHT,
        value: d.value,
        year: d.year,
      })),
    []
  );

  const pathD = useMemo(() => points.reduce(buildPath, ''), [points]);
  const areaPath = useMemo(
    () =>
      `${pathD} L ${points[points.length - 1].x},${PADDING_Y + PLOT_HEIGHT} L ${points[0].x},${PADDING_Y + PLOT_HEIGHT} Z`,
    [pathD, points]
  );

  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);
  const [percentageChange, setPercentageChange] = useState<number | null>(
    null
  );

  const [scrollPathLength, setScrollPathLength] = useState(0);
  const [scrollActiveIndex, setScrollActiveIndex] = useState(-1);
  const [scrollDisplayValue, setScrollDisplayValue] = useState(0);
  const [showProjected, setShowProjected] = useState(false);

  const isScrollDriven = !!scrollProgress;

  useEffect(() => {
    if (!scrollProgress) return;

    const unsubscribe = scrollProgress.on('change', (v: number) => {
      setScrollPathLength(Math.min(v * 1.3, 1));

      const dataProgress = Math.min(v * 1.2, 1);
      const idx = Math.min(
        Math.floor(dataProgress * turnoverData.length),
        turnoverData.length - 1
      );
      setScrollActiveIndex(idx);
      setScrollDisplayValue(turnoverData[idx].value);
      setShowProjected(v > 0.85);
    });

    return unsubscribe;
  }, [scrollProgress]);

  const startHover = (index: number) => {
    if (isScrollDriven) return;
    setHoveredPoint(index);
    if (index > 0) {
      const current = turnoverData[index].value;
      const previous = turnoverData[index - 1].value;
      setPercentageChange(((current - previous) / previous) * 100);
    } else {
      setPercentageChange(null);
    }
  };

  const endHover = () => {
    if (isScrollDriven) return;
    setHoveredPoint(null);
    setPercentageChange(null);
  };

  const displayValue = isScrollDriven
    ? `$${scrollDisplayValue}M`
    : hoveredPoint !== null
      ? `$${turnoverData[hoveredPoint].value}M`
      : '$40M';

  const displayYear = isScrollDriven
    ? scrollActiveIndex >= 0
      ? turnoverData[scrollActiveIndex].year
      : ''
    : hoveredPoint !== null
      ? turnoverData[hoveredPoint].year
      : '';

  return (
    <div
      ref={graphRef}
      className={
        isScrollDriven
          ? 'relative w-full flex-1 flex flex-col min-h-0'
          : 'relative w-full rounded-2xl border border-[#1d2628] overflow-hidden'
      }
      style={{ backgroundColor: isScrollDriven ? 'transparent' : '#0b1011' }}
      onPointerLeave={endHover}
    >
      {/* Header */}
      <div
        className={
          isScrollDriven
            ? 'flex items-baseline justify-between px-5 pb-1'
            : 'flex items-baseline justify-between px-6 pt-6 pb-2 md:px-8 md:pt-8'
        }
      >
        <div>
          <p className="text-[#6b7280] professional-text text-xs tracking-[0.15em] uppercase">
            Annual Turnover
          </p>
          <p
            className={
              isScrollDriven
                ? 'heading-text text-4xl text-white mt-1'
                : 'heading-text text-3xl md:text-4xl text-white mt-1'
            }
          >
            {displayValue}
          </p>
        </div>
        {displayYear && (
          <p className="text-sm professional-text text-[#6b7280]">
            {displayYear}
          </p>
        )}
      </div>

      {/* SVG Chart */}
      <div
        className={
          isScrollDriven
            ? 'w-full flex-1 min-h-0 px-1'
            : 'w-full px-2 md:px-4 pb-4'
        }
      >
        <svg
          viewBox={`0 0 ${GRAPH_WIDTH} ${GRAPH_HEIGHT}`}
          className={isScrollDriven ? 'w-full h-full' : 'w-full h-auto'}
          preserveAspectRatio={isScrollDriven ? 'xMidYMid meet' : undefined}
          style={{ overflow: 'visible' }}
        >
          <defs>
            <linearGradient
              id="turnoverGradient"
              x1="0"
              x2="0"
              y1="0"
              y2="1"
            >
              <stop offset="0%" stopColor="#8df0cc" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#8df0cc" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Grid lines + Y labels */}
          {gridLines.map((val) => {
            const y =
              PADDING_Y + PLOT_HEIGHT - (val / maxValue) * PLOT_HEIGHT;
            return (
              <g key={val}>
                <line
                  x1={PADDING_X}
                  y1={y}
                  x2={GRAPH_WIDTH - PADDING_X}
                  y2={y}
                  stroke="#1d2628"
                  strokeWidth="1"
                  strokeDasharray="4,4"
                />
                <text
                  x={PADDING_X - 12}
                  y={y + 4}
                  fill="#4b5563"
                  fontSize="12"
                  textAnchor="end"
                  fontFamily="inherit"
                >
                  ${val}M
                </text>
              </g>
            );
          })}

          {/* X-axis year labels */}
          {points.map((p, i) => {
            const isActive = isScrollDriven
              ? i <= scrollActiveIndex
              : hoveredPoint === i;
            return (
              <text
                key={i}
                x={p.x}
                y={GRAPH_HEIGHT - 8}
                fill={isActive ? '#8df0cc' : '#4b5563'}
                fontSize="12"
                textAnchor="middle"
                fontFamily="inherit"
                style={{ transition: 'fill 0.3s' }}
              >
                {turnoverData[i].year}
              </text>
            );
          })}

          {/* Area fill */}
          <motion.path
            d={areaPath}
            fill="url(#turnoverGradient)"
            initial={{ opacity: 0 }}
            animate={{
              opacity: isScrollDriven
                ? scrollPathLength > 0.1
                  ? 1
                  : 0
                : isInView
                  ? 1
                  : 0,
            }}
            transition={
              isScrollDriven ? { duration: 0.3 } : { duration: 1, delay: 1.2 }
            }
            style={
              isScrollDriven
                ? {
                    clipPath: `inset(0 ${100 - scrollPathLength * 100}% 0 0)`,
                  }
                : undefined
            }
          />

          {/* Main line */}
          <motion.path
            d={pathD}
            fill="none"
            stroke="#8df0cc"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{
              pathLength: isScrollDriven
                ? scrollPathLength
                : isInView
                  ? 1
                  : 0,
            }}
            transition={
              isScrollDriven
                ? { duration: 0.15, ease: 'linear' }
                : { duration: 1.8, ease: 'easeInOut' }
            }
          />

          {/* Hover column + vertical line (non-scroll mode) */}
          {!isScrollDriven && hoveredPoint !== null && (
            <motion.line
              x1={points[hoveredPoint].x}
              y1={PADDING_Y}
              x2={points[hoveredPoint].x}
              y2={PADDING_Y + PLOT_HEIGHT}
              stroke="#8df0cc"
              strokeWidth="1"
              strokeOpacity="0.3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />
          )}

          {/* Scroll-driven active vertical line */}
          {isScrollDriven && scrollActiveIndex >= 0 && (
            <line
              x1={points[scrollActiveIndex].x}
              y1={PADDING_Y}
              x2={points[scrollActiveIndex].x}
              y2={PADDING_Y + PLOT_HEIGHT}
              stroke="#8df0cc"
              strokeWidth="1"
              strokeOpacity="0.2"
            />
          )}

          {/* Points */}
          {isScrollDriven ? (
            <g>
              {points.map((point, index) => (
                <g key={index}>
                  <motion.circle
                    cx={point.x}
                    cy={point.y}
                    r="5"
                    fill={
                      index === scrollActiveIndex ? '#8df0cc' : '#0b1011'
                    }
                    stroke="#8df0cc"
                    strokeWidth="2"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: index <= scrollActiveIndex ? 1 : 0,
                      opacity: index <= scrollActiveIndex ? 1 : 0,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 400,
                      damping: 25,
                    }}
                  />
                </g>
              ))}
            </g>
          ) : (
            <motion.g
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={{
                visible: {
                  transition: {
                    delayChildren: 0.3,
                    staggerChildren: 1.8 / turnoverData.length,
                  },
                },
              }}
            >
              {points.map((point, index) => (
                <g key={index}>
                  <rect
                    x={point.x - PLOT_WIDTH / turnoverData.length / 2}
                    y={0}
                    width={PLOT_WIDTH / turnoverData.length}
                    height={GRAPH_HEIGHT}
                    fill="transparent"
                    onPointerEnter={() => startHover(index)}
                    style={{ cursor: 'pointer' }}
                  />
                  <motion.circle
                    cx={point.x}
                    cy={point.y}
                    r="5"
                    fill="#0b1011"
                    stroke="#8df0cc"
                    strokeWidth="2"
                    animate={
                      hoveredPoint === index
                        ? { scale: 1.6, fill: '#8df0cc' }
                        : { scale: 1, fill: '#0b1011' }
                    }
                    variants={{
                      hidden: { scale: 0, opacity: 0 },
                      visible: { scale: 1, opacity: 1 },
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 20,
                    }}
                  />
                </g>
              ))}
            </motion.g>
          )}

          {/* Projected label on last point */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{
              opacity: isScrollDriven
                ? showProjected
                  ? 1
                  : 0
                : isInView
                  ? 1
                  : 0,
            }}
            transition={isScrollDriven ? { duration: 0.3 } : { delay: 2 }}
          >
            <rect
              x={points[points.length - 1].x - 36}
              y={points[points.length - 1].y - 30}
              width={72}
              height={20}
              rx={10}
              fill="#8df0cc"
              fillOpacity={0.15}
            />
            <text
              x={points[points.length - 1].x}
              y={points[points.length - 1].y - 17}
              fill="#8df0cc"
              fontSize="10"
              textAnchor="middle"
              fontFamily="inherit"
              fontWeight="500"
            >
              PROJECTED
            </text>
          </motion.g>
        </svg>
      </div>

      {/* Cursor tooltip (desktop only, non-scroll mode) */}
      {!isScrollDriven && (
        <AnimatePresence>
          {percentageChange !== null && (
            <Cursor
              follow
              initial={{ opacity: 0, scale: 0.5 }}
              offset={{ x: 20, y: 20 }}
              key="cursor"
            >
              <div
                className="flex items-center gap-2 rounded-full px-3 py-1.5"
                style={{
                  backgroundColor: '#0b1011',
                  border: '1px solid rgba(141,240,204,0.2)',
                }}
              >
                <MotionConfig
                  transition={{
                    type: 'spring',
                    visualDuration: 0.6,
                    bounce: 0.2,
                  }}
                >
                  <motion.div
                    initial={false}
                    animate={{
                      rotate: percentageChange < 0 ? 180 : 0,
                      color:
                        percentageChange < 0 ? '#ff0088' : '#8df0cc',
                    }}
                    className="text-lg font-bold leading-none"
                  >
                    ↑
                  </motion.div>
                  <AnimateNumber
                    initial={false}
                    animate={{
                      color:
                        percentageChange < 0 ? '#ff0088' : '#8df0cc',
                    }}
                    className="text-lg heading-text leading-none"
                    format={{
                      notation: 'compact',
                      compactDisplay: 'short',
                    }}
                    suffix="%"
                  >
                    {percentageChange}
                  </AnimateNumber>
                </MotionConfig>
              </div>
            </Cursor>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
