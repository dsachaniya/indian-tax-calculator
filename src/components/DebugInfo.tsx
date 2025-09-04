'use client'

export default function DebugInfo() {
  if (typeof window !== 'undefined') {
    console.log('🔍 Debug Info:', {
      url: window.location.href,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      basePath: process.env.NODE_ENV
    })
  }
  
  return (
    <div className="hidden">
      {/* Debug info - hidden from UI but helps with debugging */}
      <span data-debug="deployment-check">{new Date().toISOString()}</span>
    </div>
  )
}
