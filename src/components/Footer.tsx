'use client'

import Link from 'next/link'
import { Calculator, Receipt, Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-blue-400" />
              <span className="text-lg font-bold text-white">TaxGenius.in</span>
            </div>
            <p className="text-sm text-gray-400">
              Your trusted companion for accurate tax calculations and financial planning in India.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Tax Calculators</h3>
            <div className="space-y-2">
              <Link href="/" className="flex items-center gap-2 text-sm hover:text-blue-400 transition-colors">
                <Calculator className="w-4 h-4" />
                Income Tax Calculator
              </Link>
              <Link href="/gst-section-14-time-of-supply/" className="flex items-center gap-2 text-sm hover:text-green-400 transition-colors">
                <Receipt className="w-4 h-4" />
                GST Section 14 Calculator
              </Link>
            </div>
          </div>

          {/* Important Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Important</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <p>• Tax Year: AY 2025-26</p>
              <p>• Updated with Budget 2025</p>
              <p>• GST reforms from Sept 22, 2025</p>
              <p className="text-xs">
                <strong>Disclaimer:</strong> This calculator is for estimation purposes only. 
                Please consult a tax professional for accurate advice.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            © 2025 TaxGenius.in. Made with <Heart className="w-4 h-4 inline text-red-500" /> for India.
          </p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <span className="text-xs text-gray-500">Powered by Next.js</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
