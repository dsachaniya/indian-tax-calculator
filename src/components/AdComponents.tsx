'use client'

import AdSense from './AdSense'

// Header Banner Ad (728x90 or responsive)
export function HeaderBannerAd() {
  return (
    <div className="w-full flex justify-center py-4 bg-gray-50 border-b">
      <AdSense
        adSlot="8204149767" // Replace with your actual ad slot
        adFormat="auto"
        className="max-w-4xl"
        style={{ display: 'block', textAlign: 'center' }}
      />
    </div>
  )
}

// Sidebar Ad (300x250 or 300x600)
export function SidebarAd() {
  return (
    <div className="w-full max-w-xs mx-auto py-4">
      <div className="bg-gray-50 p-4 rounded-lg border">
        <p className="text-xs text-gray-500 mb-2 text-center">Advertisement</p>
        <AdSense
          adSlot="8367515880" // Replace with your actual ad slot
          adFormat="rectangle"
          style={{ display: 'block', width: '300px', height: '250px' }}
        />
      </div>
    </div>
  )
}

// Content Ad (Responsive)
export function ContentAd() {
  return (
    <div className="w-full py-6 my-8 bg-gray-50 rounded-lg border">
      <p className="text-xs text-gray-500 mb-4 text-center">Advertisement</p>
      <div className="max-w-4xl mx-auto px-4">
        <AdSense
          adSlot="5741352547" // Replace with your actual ad slot
          adFormat="auto"
          style={{ display: 'block' }}
        />
      </div>
    </div>
  )
}

// Footer Ad (728x90)
export function FooterAd() {
  return (
    <div className="w-full flex justify-center py-4 bg-gray-100 border-t mt-8">
      <div className="max-w-4xl w-full text-center">
        <p className="text-xs text-gray-500 mb-2">Advertisement</p>
        <AdSense
          adSlot="8814523859" // Replace with your actual ad slot
          adFormat="horizontal"
          style={{ display: 'block' }}
        />
      </div>
    </div>
  )
}

// Mobile Banner Ad (320x50)
export function MobileBannerAd() {
  return (
    <div className="md:hidden w-full flex justify-center py-2 bg-blue-50 border">
      <AdSense
        adSlot="ca-pub-5445129635656696" // Replace with your actual ad slot
        adFormat="auto"
        style={{ display: 'block', width: '320px', height: '50px' }}
      />
    </div>
  )
}
