import { ComponentPropsWithoutRef, CSSProperties, FC } from "react"

import { cn } from "@/lib/utils"

export interface AnimatedShinyTextProps extends ComponentPropsWithoutRef<"span"> {
  shimmerWidth?: number
}

export const AnimatedShinyText: FC<AnimatedShinyTextProps> = ({
  children,
  className,
  shimmerWidth = 100,
  ...props
}) => {
  return (
    <span
      style={
        {
          "--shiny-width": `${shimmerWidth}px`,
          animation: "shiny-text 8s infinite",
          backgroundSize: `${shimmerWidth}px 100%`,
          backgroundPosition: "0 0",
          backgroundRepeat: "no-repeat",
        } as CSSProperties
      }
      className={cn(
        "mx-auto max-w-md text-neutral-600/70 dark:text-neutral-400/70",
        // Shine gradient
        "bg-gradient-to-r from-transparent via-black/80 via-50% to-transparent dark:via-white/80",
        "bg-clip-text",
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
