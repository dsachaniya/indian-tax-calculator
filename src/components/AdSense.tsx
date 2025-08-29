'use client'

import { useEffect, useRef, useState } from 'react'

interface AdSenseProps {
  adSlot: string
  adFormat?: 'auto' | 'rectangle' | 'vertical' | 'horizontal'
  fullWidthResponsive?: boolean
  style?: React.CSSProperties
  className?: string
}

declare global {
  interface Window {
    adsbygoogle: Array<Record<string, unknown>>
  }
}

export default function AdSense({ 
  adSlot, 
  adFormat = 'auto', 
  fullWidthResponsive = true,
  style = { display: 'block' },
  className = ''
}: AdSenseProps) {
  const adRef = useRef<HTMLDivElement>(null)
  const [adError, setAdError] = useState<string | null>(null)

  // Don't load ads in development mode or if using placeholder slots
  const isDevelopment = process.env.NODE_ENV === 'development'
  const isPlaceholderSlot = adSlot.includes('placeholder')

  useEffect(() => {
    // Skip ad loading in development or with placeholder slots
    if (isDevelopment || isPlaceholderSlot) {
      if (isDevelopment) {
        setAdError('Development mode - ads disabled')
      } else {
        setAdError('Placeholder ad slot - replace with real AdSense ID')
      }
      return
    }

    const loadAd = () => {
      try {
        if (typeof window !== 'undefined' && window.adsbygoogle && adRef.current) {
          // Check if container has dimensions
          const rect = adRef.current.getBoundingClientRect()
          if (rect.width === 0) {
            setAdError('Container width is 0 - waiting for layout')
            return
          }

          window.adsbygoogle.push({})
          setAdError(null)
        }
      } catch (error) {
        console.error('AdSense error:', error)
        setAdError(error instanceof Error ? error.message : 'Unknown error')
      }
    }

    // Wait for layout to complete
    const timer = setTimeout(loadAd, 1000)
    return () => clearTimeout(timer)
  }, [isDevelopment, isPlaceholderSlot])

  // Show placeholder only in development, hide completely in production with placeholder slots
  if (isDevelopment || (isPlaceholderSlot && isDevelopment)) {
    return (
      <div className={`adsense-placeholder bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center min-h-[120px] ${className}`}>
        <div className="text-center p-4">
          <div className="text-sm text-gray-500 mb-2">📢 Advertisement Space</div>
          <div className="text-xs text-gray-400">Development Mode</div>
          {isPlaceholderSlot && (
            <div className="text-xs text-blue-500 font-medium mt-1">
              Replace with real AdSense ID for production
            </div>
          )}
        </div>
      </div>
    )
  }

  // Hide ads completely in production if using placeholder slots
  if (isPlaceholderSlot && !isDevelopment) {
    return null
  }

  // Show error state only for real ads that failed to load
  if (adError && !isPlaceholderSlot) {
    return (
      <div className={`adsense-error bg-red-50 border border-red-200 rounded-lg flex items-center justify-center min-h-[120px] ${className}`}>
        <div className="text-center p-4">
          <div className="text-sm text-red-600 mb-2">Ad Loading Error</div>
          <div className="text-xs text-red-400">{adError}</div>
        </div>
      </div>
    )
  }

  return (
    <div ref={adRef} className={`adsense-container ${className}`}>
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client="ca-pub-5445129635656696"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive}
      />
    </div>
  )
}
