import TaxCalculator from '@/components/TaxCalculatorNew'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'TaxGenius.in - Advanced India Tax Calculator | AY 2025-26 | Old vs New Regime',
  description: 'Most comprehensive India tax calculator for AY 2025-26. Compare old vs new tax regime with precise Budget 2025 updates, HRA calculation, 80C deductions, and marginal relief. Built with Next.js and modern technologies.',
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
    images: [
      {
        url: 'https://taxgenius.in/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'TaxGenius.in Tax Calculator'
      }
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TaxGenius.in - India Tax Calculator AY 2025-26',
    description: 'Advanced tax calculator with Budget 2025 compliance',
    images: ['https://taxgenius.in/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

// Structured data for rich snippets
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'TaxGenius.in - Indian Tax Calculator',
  url: 'https://taxgenius.in',
  description: 'Advanced Indian Income Tax Calculator for Assessment Year 2025-26 with Budget 2025 compliance',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web Browser',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'INR',
  },
  creator: {
    '@type': 'Organization',
    name: 'TaxGenius.in',
  },
  featureList: [
    'Income Tax Calculation for AY 2025-26',
    'Old vs New Tax Regime Comparison',
    'HRA Calculator with Metro/Non-Metro Support',
    'Section 80C, 80D, 80E Deductions',
    'Rebate 87A and Marginal Relief',
    'Surcharge and Health & Education Cess',
    'Budget 2025 Compliance',
  ],
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="container mx-auto px-4 py-6">
          {/* Hero Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              🇮🇳 Tax Calculator India
            </h1>
            <p className="text-xl text-gray-600 mb-2">
              Assessment Year 2025-26 • Budget 2025 Compliant
            </p>
            <p className="text-sm text-gray-500 max-w-2xl mx-auto">
              Compare Old vs New Tax Regime • Calculate HRA & All Deductions • Government Verified Rules
            </p>
          </div>
          
          <TaxCalculator />
          
          {/* SEO Content Section */}
          <div className="mt-12 max-w-6xl mx-auto">
            <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                India Tax Calculator for AY 2025-26
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="mr-2">📊</span> Tax Calculation Features
                  </h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2 mt-1">✓</span>
                      <span>Old vs New Tax Regime comparison with detailed breakdown</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2 mt-1">✓</span>
                      <span>HRA calculation with metro/non-metro city differentiation</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2 mt-1">✓</span>
                      <span>All Chapter VIA deductions (80C, 80D, 80E, 80G, etc.)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2 mt-1">✓</span>
                      <span>Rebate 87A implementation with marginal relief</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2 mt-1">✓</span>
                      <span>Surcharge and 4% Health & Education Cess</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="mr-2">�</span> Key Benefits
                  </h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2 mt-1">⚡</span>
                      <span>Fast and accurate tax calculations</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2 mt-1">🎨</span>
                      <span>Easy-to-use interface for all users</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2 mt-1">📱</span>
                      <span>Works perfectly on mobile and desktop</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2 mt-1">🔒</span>
                      <span>100% free and secure - no data stored</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2 mt-1">�</span>
                      <span>Updated with latest government tax rules</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
                <h4 className="font-semibold text-blue-900 mb-3 text-lg">
                  📈 Understanding Tax Regimes for AY 2025-26
                </h4>
                <p className="text-blue-800 text-sm leading-relaxed">
                  The Indian Income Tax Act provides two tax calculation methods: <strong>Old Tax Regime</strong> 
                  (with traditional deductions and exemptions) and <strong>New Tax Regime</strong> (with lower tax 
                  rates but limited deductions). Our calculator analyzes your complete financial profile 
                  to recommend the regime that minimizes your tax liability, potentially saving you thousands of rupees annually.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
