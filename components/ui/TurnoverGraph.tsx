'use client';

import { AnimateNumber, Cursor } from 'motion-plus/react';
import { AnimatePresence, motion, MotionConfig } from 'motion/react';
import { useState } from 'react';

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

export function TurnoverGraph() {
  const points = turnoverData.map((d, i) => ({
    x: PADDING_X + (i / (turnoverData.length - 1)) * PLOT_WIDTH,
    y: PADDING_Y + PLOT_HEIGHT - (d.value / maxValue) * PLOT_HEIGHT,
    value: d.value,
    year: d.year,
  }));

  const pathD = points.reduce(buildPath, '');
  const areaPath = `${pathD} L ${points[points.length - 1].x},${PADDING_Y + PLOT_HEIGHT} L ${points[0].x},${PADDING_Y + PLOT_HEIGHT} Z`;

  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);
  const [percentageChange, setPercentageChange] = useState<number | null>(
    null
  );

  const startHover = (index: number) => {
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
    setHoveredPoint(null);
    setPercentageChange(null);
  };

  const gridLines = [0, 10, 20, 30, 40];

  return (
    <div
      className="relative w-full rounded-2xl border border-[#1d2628] overflow-hidden"
      style={{ backgroundColor: '#0b1011' }}
      onPointerLeave={endHover}
    >
      {/* Header */}
      <div className="flex items-baseline justify-between px-6 pt-6 pb-2 md:px-8 md:pt-8">
        <div>
          <p className="text-[#6b7280] professional-text text-xs tracking-[0.15em] uppercase">
            Annual Turnover
          </p>
          <p className="heading-text text-3xl md:text-4xl text-white mt-1">
            $
            {hoveredPoint !== null
              ? `${turnoverData[hoveredPoint].value}M`
              : '40M'}
          </p>
        </div>
        {hoveredPoint !== null && (
          <p className="text-sm professional-text text-[#6b7280]">
            {turnoverData[hoveredPoint].year}
          </p>
        )}
      </div>

      {/* SVG Chart */}
      <div className="w-full px-2 md:px-4 pb-4">
        <svg
          viewBox={`0 0 ${GRAPH_WIDTH} ${GRAPH_HEIGHT}`}
          className="w-full h-auto"
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
            const y = PADDING_Y + PLOT_HEIGHT - (val / maxValue) * PLOT_HEIGHT;
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
          {points.map((p, i) => (
            <text
              key={i}
              x={p.x}
              y={GRAPH_HEIGHT - 8}
              fill={
                hoveredPoint === i ? '#8df0cc' : '#4b5563'
              }
              fontSize="12"
              textAnchor="middle"
              fontFamily="inherit"
              style={{ transition: 'fill 0.2s' }}
            >
              {turnoverData[i].year}
            </text>
          ))}

          {/* Area fill */}
          <motion.path
            d={areaPath}
            fill="url(#turnoverGradient)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
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
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.8, ease: 'easeInOut' }}
          />

          {/* Hover column + vertical line */}
          {hoveredPoint !== null && (
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

          {/* Interactive points */}
          <motion.g
            initial="hidden"
            animate="visible"
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
                {/* Hit area */}
                <rect
                  x={
                    point.x -
                    PLOT_WIDTH / turnoverData.length / 2
                  }
                  y={0}
                  width={PLOT_WIDTH / turnoverData.length}
                  height={GRAPH_HEIGHT}
                  fill="transparent"
                  onPointerEnter={() => startHover(index)}
                  style={{ cursor: 'pointer' }}
                />
                {/* Dot */}
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
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                />
              </g>
            ))}
          </motion.g>

          {/* Projected label on last point */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
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

      {/* Cursor tooltip */}
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
    </div>
  );
}
