'use client';

import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'motion/react';

const data = [
  { year: '2020', value: 2 },
  { year: '2021', value: 5 },
  { year: '2022', value: 8 },
  { year: '2023', value: 12 },
  { year: '2024', value: 18 },
  { year: '2025', value: 28 },
  { year: '2026', value: 40 },
];

const W = 360;
const H = 660;
const PAD = { l: 42, r: 20, t: 24, b: 40 };
const PLOT_W = W - PAD.l - PAD.r;
const PLOT_H = H - PAD.t - PAD.b;
const MAX = 44;

const points = data.map((d, i) => ({
  x: PAD.l + (i / (data.length - 1)) * PLOT_W,
  y: PAD.t + PLOT_H - (d.value / MAX) * PLOT_H,
  ...d,
}));

const linePath = points
  .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x},${p.y}`)
  .join(' ');

const areaPath = `${linePath} L ${points[points.length - 1].x},${PAD.t + PLOT_H} L ${points[0].x},${PAD.t + PLOT_H} Z`;

export function MobileGrowthScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  /*
   * Timeline (mapped to scrollYProgress 0→1):
   *   0.00 – 0.08  Dark bg fades in
   *   0.06 – 0.14  Header text fades in
   *   0.10 – 0.80  Line draws across chart (the main experience)
   *   0.78 – 0.86  Final "$40M" badge appears
   *   0.86 – 0.94  Everything fades out
   *   0.94 – 1.00  Scroll buffer
   */

  const bgOpacity = useTransform(scrollYProgress, [0, 0.08, 0.86, 0.94], [0, 1, 1, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0.03, 0.09], [0, 1]);
  const headerY = useTransform(scrollYProgress, [0.03, 0.09], [30, 0]);
  const headerScale = useTransform(scrollYProgress, [0.03, 0.09], [0.9, 1]);
  const contentOpacity = useTransform(scrollYProgress, [0.06, 0.12, 0.86, 0.94], [0, 1, 1, 0]);
  const drawProgress = useTransform(scrollYProgress, [0.12, 0.8], [0, 1]);
  const badgeOpacity = useTransform(scrollYProgress, [0.78, 0.86, 0.86, 0.94], [0, 1, 1, 0]);
  const badgeY = useTransform(scrollYProgress, [0.78, 0.86], [20, 0]);

  const activeIdx = useTransform(() => {
    const p = drawProgress.get();
    if (p <= 0) return 0;
    return Math.min(Math.floor(p * data.length), data.length - 1);
  });

  const displayValue = useTransform(() => {
    const i = activeIdx.get();
    return `$${data[i].value}M`;
  });

  const displayYear = useTransform(() => {
    const i = activeIdx.get();
    return data[i].year;
  });

  const clipPath = useTransform(() => {
    const p = drawProgress.get();
    return `inset(0 ${Math.round((1 - p) * 100)}% 0 0)`;
  });

  return (
    <div
      ref={containerRef}
      className="relative md:hidden"
      style={{ height: '400vh' }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* ── Dark background ── */}
        <motion.div
          className="absolute inset-0 bg-[#0b1011]"
          style={{ opacity: bgOpacity }}
        />

        {/* ── Header (animates independently with spring) ── */}
        <motion.div
          className="absolute top-0 left-0 right-0 z-10 pt-20 px-6 pb-3"
          style={{
            opacity: headerOpacity,
            y: headerY,
            scale: headerScale,
          }}
        >
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#8df0cc]/60 professional-text mb-2">
            Scaling through execution
          </p>
          <div className="flex items-baseline gap-3">
            <motion.p className="heading-text text-5xl text-white leading-none">
              {displayValue}
            </motion.p>
            <motion.p className="text-lg professional-text text-[#8df0cc]/80">
              {displayYear}
            </motion.p>
          </div>
          <p className="text-[10px] tracking-[0.15em] uppercase text-[#6b7280]/60 professional-text mt-2">
            Annual turnover · 2020 — 2026
          </p>
        </motion.div>

        {/* ── Chart + badge content ── */}
        <motion.div
          className="absolute inset-0 flex flex-col"
          style={{ opacity: contentOpacity }}
        >
          {/* Spacer for header */}
          <div className="flex-shrink-0" style={{ height: '130px' }} />

          {/* Chart */}
          <div className="flex-1 px-1 min-h-0">
            <svg
              viewBox={`0 0 ${W} ${H}`}
              className="w-full h-full"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <linearGradient
                  id="mGrad"
                  x1="0"
                  x2="0"
                  y1="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#8df0cc" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#8df0cc" stopOpacity="0.02" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Grid */}
              {[0, 10, 20, 30, 40].map((v) => {
                const y = PAD.t + PLOT_H - (v / MAX) * PLOT_H;
                return (
                  <g key={v}>
                    <line
                      x1={PAD.l}
                      y1={y}
                      x2={W - PAD.r}
                      y2={y}
                      stroke="#1d2628"
                      strokeWidth="0.5"
                    />
                    <text
                      x={PAD.l - 8}
                      y={y + 4}
                      fill="#3a4f52"
                      fontSize="10"
                      textAnchor="end"
                    >
                      ${v}M
                    </text>
                  </g>
                );
              })}

              {/* Area fill (clipped to progress) */}
              <motion.path
                d={areaPath}
                fill="url(#mGrad)"
                style={{ clipPath }}
              />

              {/* Line glow (behind) */}
              <motion.path
                d={linePath}
                fill="none"
                stroke="#8df0cc"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.15"
                filter="url(#glow)"
                style={{ pathLength: drawProgress }}
              />
              {/* Line (pathLength driven by scroll) */}
              <motion.path
                d={linePath}
                fill="none"
                stroke="#8df0cc"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ pathLength: drawProgress }}
              />

              {/* Points */}
              {points.map((pt, i) => (
                <Dot
                  key={i}
                  cx={pt.x}
                  cy={pt.y}
                  year={pt.year}
                  value={pt.value}
                  idx={i}
                  activeIdx={activeIdx}
                />
              ))}
            </svg>
          </div>

          {/* Bottom badge */}
          <motion.div
            className="flex-shrink-0 mx-4 mb-4 rounded-lg border border-[#8df0cc]/15 bg-[#8df0cc]/5 py-2.5 px-4 flex items-center justify-between"
            style={{ opacity: badgeOpacity, y: badgeY }}
          >
            <div>
              <p className="text-[9px] tracking-[0.2em] uppercase text-[#8df0cc]/50 professional-text">
                2026 Projected
              </p>
              <p className="heading-text text-lg text-white mt-0.5">
                $40M annual turnover
              </p>
            </div>
            <div className="w-7 h-7 rounded-full bg-[#8df0cc]/10 flex items-center justify-center">
              <span className="text-[#8df0cc] text-xs">↗</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

/* ── Individual data point ── */

function Dot({
  cx,
  cy,
  year,
  value,
  idx,
  activeIdx,
}: {
  cx: number;
  cy: number;
  year: string;
  value: number;
  idx: number;
  activeIdx: MotionValue<number>;
}) {
  const visible = useTransform(() => (activeIdx.get() >= idx ? 1 : 0));
  const current = useTransform(() => (activeIdx.get() === idx ? 1 : 0));
  const r = useTransform(() => (activeIdx.get() === idx ? 7 : 4));

  return (
    <g>
      {/* Vertical guide (current only) */}
      <motion.line
        x1={cx}
        y1={PAD.t}
        x2={cx}
        y2={PAD.t + PLOT_H}
        stroke="#8df0cc"
        strokeWidth="0.5"
        style={{ opacity: useTransform(() => activeIdx.get() === idx ? 0.12 : 0) }}
      />
      {/* Outer ring */}
      <motion.circle
        cx={cx}
        cy={cy}
        fill="#0b1011"
        stroke="#8df0cc"
        strokeWidth="1.5"
        style={{ r, opacity: visible }}
      />
      {/* Inner glow (current) */}
      <motion.circle
        cx={cx}
        cy={cy}
        r="3.5"
        fill="#8df0cc"
        style={{ opacity: current }}
      />
      {/* Year */}
      <motion.text
        x={cx}
        y={PAD.t + PLOT_H + 20}
        fill="#8df0cc"
        fontSize="11"
        textAnchor="middle"
        fontWeight="500"
        style={{ opacity: visible }}
      >
        {year}
      </motion.text>
      {/* Value above dot */}
      <motion.text
        x={cx}
        y={cy - 14}
        fill="white"
        fontSize="12"
        textAnchor="middle"
        fontWeight="600"
        style={{ opacity: current }}
      >
        ${value}M
      </motion.text>
    </g>
  );
}
