'use client'

import Image from 'next/image'

interface CryptoIconProps {
  symbol: string
  size?: number
  className?: string
}

export function CryptoIcon({ symbol, size = 24, className = '' }: CryptoIconProps) {
  const iconPath = `/cryptoicons/${symbol.toLowerCase()}.svg`
  
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <Image
        src={iconPath}
        alt={symbol}
        width={size}
        height={size}
        className="rounded-full"
        onError={(e) => {
          // Fallback if icon doesn't exist
          const target = e.target as HTMLImageElement
          target.style.display = 'none'
          const parent = target.parentElement
          if (parent) {
            parent.innerHTML = `<div class="w-full h-full rounded-full bg-muted flex items-center justify-center text-xs font-bold">${symbol.slice(0, 2)}</div>`
          }
        }}
      />
    </div>
  )
}
