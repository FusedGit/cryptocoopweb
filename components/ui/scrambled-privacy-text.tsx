"use client";

import { ScrambleText } from "motion-plus/react";
import { stagger } from "motion/react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ScrambledPrivacyTextProps {
  className?: string;
  text?: string;
  intervalMs?: number;
}

export function ScrambledPrivacyText({
  className,
  text = "privacy",
  intervalMs = 5000,
}: ScrambledPrivacyTextProps) {
  const [active, setActive] = useState(true);

  useEffect(() => {
    const cycle = setInterval(() => {
      setActive(false);
      requestAnimationFrame(() => setActive(true));
    }, intervalMs);
    return () => clearInterval(cycle);
  }, [intervalMs]);

  return (
    // Invisible span locks the layout width to "privacy".
    // clip-path on ScrambleText clips horizontal overflow (wider block chars)
    // without creating a BFC — so no baseline shift and "y" descender is safe.
    <span className="relative inline-block">
      <span className="invisible select-none" aria-hidden="true">
        {text}
      </span>
      <ScrambleText
        as="span"
        className={cn(
          "absolute left-0 top-0 w-full whitespace-nowrap",
          // Clip sides flush with "privacy" width; extend bottom 0.3em so "y"
          // descender is never cut off.
          "[clip-path:inset(0_0_-0.3em_0)]",
          className
        )}
        active={active}
        delay={stagger(0.1, { from: "center" })}
        duration={1.8}
        interval={0.18}
        chars="░▒▓█▀▄▌▐▖▗▘▝"
      >
        {text}
      </ScrambleText>
    </span>
  );
}
