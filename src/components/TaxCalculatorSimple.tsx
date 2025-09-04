'use client'

import { useState, useMemo } from 'react'
import { Calculator, Receipt } from 'lucide-react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import { TaxInputs, calculateOldRegimeTax, calculateNewRegimeTax, formatCurrency } from '@/lib/taxCalculationsNew'
import { ContentAd, HeaderBannerAd } from './AdComponents'
import Footer from './Footer'

export default function TaxCalculatorSimple() {
  const [inputs, setInputs] = useState<TaxInputs>({
    annualSalary: 1100000,
    hra: 220000,
    rentPaid: 180000,
    providentFund: 60000,
    lifeInsurance: 30000,
    elss: 60000,
    homeLoanInterest: 180000,
    medicalInsurance: 25000,
    educationLoan: 40000,
    nps: 50000,
    professionalTax: 2500,
    employerNPS: 50000,
    agniveerCorpus: 0,
    isMetro: true,
  })

  const results = useMemo(() => {
    const oldRegime = calculateOldRegimeTax(inputs)
    const newRegime = calculateNewRegimeTax(inputs)
    
    return { oldRegime, newRegime }
  }, [inputs])

  const updateInput = (field: keyof TaxInputs, value: number | boolean) => {
    setInputs(prev => ({ ...prev, [field]: value }))
  }

  const taxDifference = results.oldRegime.totalTax - results.newRegime.totalTax
  const recommendedRegime = taxDifference > 0 ? 'New Regime' : 'Old Regime'
  const annualSavings = Math.abs(taxDifference)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header Section */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Calculator className="h-6 w-6 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-900">TaxGenius.in</h1>
            </div>
            
            <p className="text-lg text-gray-600 mb-4">
              India Tax Calculator for AY 2025-26 | Old vs New Regime Comparison
            </p>

            {/* Navigation Buttons */}
            <div className="flex flex-wrap justify-center gap-3">
              <Button 
                variant="default" 
                className="gap-2 bg-blue-600 hover:bg-blue-700"
              >
                <Calculator className="w-4 h-4" />
                Income Tax Calculator
              </Button>
              
              <Link href="/gst-section-14-time-of-supply/">
                <Button 
                  variant="outline" 
                  className="gap-2 border-green-600 text-green-600 hover:bg-green-50"
                >
                  <Receipt className="w-4 h-4" />
                  GST Section 14 Calculator
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Header Banner Advertisement */}
      <HeaderBannerAd />

      {/* Main Calculator Section */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div>
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-blue-600" />
                  Enter Your Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Basic Income Fields */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="annualSalary" className="text-sm font-medium">Annual Salary (₹)</Label>
                    <Input
                      id="annualSalary"
                      type="number"
                      placeholder="e.g., 1200000"
                      value={inputs.annualSalary}
                      onChange={(e) => updateInput('annualSalary', parseFloat(e.target.value) || 0)}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="hra">HRA Received (₹)</Label>
                      <Input
                        id="hra"
                        type="number"
                        value={inputs.hra}
                        onChange={(e) => updateInput('hra', parseFloat(e.target.value) || 0)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="rentPaid">Rent Paid (₹)</Label>
                      <Input
                        id="rentPaid"
                        type="number"
                        value={inputs.rentPaid}
                        onChange={(e) => updateInput('rentPaid', parseFloat(e.target.value) || 0)}
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="isMetro"
                      checked={inputs.isMetro}
                      onCheckedChange={(checked) => updateInput('isMetro', !!checked)}
                    />
                    <Label htmlFor="isMetro" className="text-sm">
                      Living in Metro City?
                    </Label>
                  </div>
                </div>

                <Separator />

                {/* 80C Investments */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Section 80C Investments</h4>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="providentFund">Provident Fund (₹)</Label>
                      <Input
                        id="providentFund"
                        type="number"
                        value={inputs.providentFund}
                        onChange={(e) => updateInput('providentFund', parseFloat(e.target.value) || 0)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="lifeInsurance">Life Insurance (₹)</Label>
                      <Input
                        id="lifeInsurance"
                        type="number"
                        value={inputs.lifeInsurance}
                        onChange={(e) => updateInput('lifeInsurance', parseFloat(e.target.value) || 0)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="elss">ELSS Investment (₹)</Label>
                      <Input
                        id="elss"
                        type="number"
                        value={inputs.elss}
                        onChange={(e) => updateInput('elss', parseFloat(e.target.value) || 0)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="nps">NPS Contribution (₹)</Label>
                      <Input
                        id="nps"
                        type="number"
                        value={inputs.nps}
                        onChange={(e) => updateInput('nps', parseFloat(e.target.value) || 0)}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Other Deductions */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Other Deductions</h4>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="homeLoanInterest">Home Loan Interest (₹)</Label>
                      <Input
                        id="homeLoanInterest"
                        type="number"
                        value={inputs.homeLoanInterest}
                        onChange={(e) => updateInput('homeLoanInterest', parseFloat(e.target.value) || 0)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="medicalInsurance">Medical Insurance (₹)</Label>
                      <Input
                        id="medicalInsurance"
                        type="number"
                        value={inputs.medicalInsurance}
                        onChange={(e) => updateInput('medicalInsurance', parseFloat(e.target.value) || 0)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {/* Comparison Summary */}
            <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-800">
                  Tax Comparison Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-sm text-gray-600">Recommended Regime</p>
                    <p className="text-2xl font-bold text-green-700">{recommendedRegime}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Annual Savings</p>
                    <p className="text-2xl font-bold text-blue-700">{formatCurrency(annualSavings)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Tax Difference</p>
                    <p className="text-2xl font-bold text-purple-700">{formatCurrency(Math.abs(taxDifference))}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Content Advertisement */}
            <ContentAd />

            {/* Tax Regime Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Old Regime */}
              <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
                <CardHeader>
                  <CardTitle className="text-orange-800">Old Tax Regime</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Gross Income:</span>
                      <span className="font-semibold">{formatCurrency(results.oldRegime.grossIncome)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Deductions:</span>
                      <span className="font-semibold">{formatCurrency(results.oldRegime.totalDeductions)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Taxable Income:</span>
                      <span className="font-semibold">{formatCurrency(results.oldRegime.taxableIncome)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Income Tax:</span>
                      <span className="font-semibold">{formatCurrency(results.oldRegime.incomeTax)}</span>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total Tax:</span>
                      <span className="text-orange-800">{formatCurrency(results.oldRegime.totalTax)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold">
                      <span>Net Income:</span>
                      <span className="text-green-700">{formatCurrency(results.oldRegime.netIncome)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* New Regime */}
              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-blue-800">New Tax Regime</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Gross Income:</span>
                      <span className="font-semibold">{formatCurrency(results.newRegime.grossIncome)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Deductions:</span>
                      <span className="font-semibold">{formatCurrency(results.newRegime.totalDeductions)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Taxable Income:</span>
                      <span className="font-semibold">{formatCurrency(results.newRegime.taxableIncome)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Income Tax:</span>
                      <span className="font-semibold">{formatCurrency(results.newRegime.incomeTax)}</span>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total Tax:</span>
                      <span className="text-blue-800">{formatCurrency(results.newRegime.totalTax)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold">
                      <span>Net Income:</span>
                      <span className="text-green-700">{formatCurrency(results.newRegime.netIncome)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  )
}
