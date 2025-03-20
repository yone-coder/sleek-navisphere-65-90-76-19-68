
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)
  const [orientation, setOrientation] = React.useState<'portrait' | 'landscape'>('portrait')

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
      setOrientation(window.innerHeight > window.innerWidth ? 'portrait' : 'landscape')
    }
    
    // Initial check
    handleResize()
    
    // Add event listeners
    mql.addEventListener("change", handleResize)
    window.addEventListener("resize", handleResize)
    window.addEventListener("orientationchange", handleResize)
    
    return () => {
      mql.removeEventListener("change", handleResize)
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("orientationchange", handleResize)
    }
  }, [])

  return {
    isMobile: !!isMobile,
    orientation,
    isPortrait: orientation === 'portrait',
    isLandscape: orientation === 'landscape'
  }
}
