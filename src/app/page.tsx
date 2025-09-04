import TaxCalculatorSimple from '@/components/TaxCalculatorSimple'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'TaxGenius.in - Advanced India Tax Calculator | AY 2025-26 | Old vs New Regime',
  description: 'Most comprehensive India tax calculator for AY 2025-26. Compare old vs new tax regime with precise Budget 2025 updates, HRA calculation, 80C deductions, and marginal relief.',
  keywords: [
    'india tax calculator', 
    'income tax calculator AY 2025-26', 
    'tax regime comparison', 
    'budget 2025', 
    'salary tax calculator', 
    'HRA calculator', 
    '80C deductions', 
    'tax planning india', 
    'marginal relief', 
    'rebate 87A'
  ],
  authors: [{ name: 'TaxGenius.in - Advanced Tax Solutions' }],
  openGraph: {
    title: 'TaxGenius.in - Advanced India Tax Calculator AY 2025-26',
    description: 'Comprehensive tax calculator with Budget 2025 updates. Compare regimes, calculate HRA, deductions & get precise tax liability.',
    url: 'https://taxgenius.in',
    siteName: 'TaxGenius.in',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TaxGenius.in - India Tax Calculator AY 2025-26',
    description: 'Advanced tax calculator with Budget 2025 compliance'
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://taxgenius.in'
  }
}

// Structured data for SEO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "TaxGenius.in Tax Calculator",
  "description": "Advanced India tax calculator for AY 2025-26 with old vs new regime comparison",
  "url": "https://taxgenius.in",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Any",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "INR"
  }
}

export default function Home() {
  return (
    <>
      {/* Google AdSense Script */}
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5445129635656696"
     crossOrigin="anonymous"></script>

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <TaxCalculatorSimple />
    </>
  )
}
