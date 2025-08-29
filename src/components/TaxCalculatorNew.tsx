'use client'

import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Calculator, Info, History, Star, Edit, BarChart3, Scale, Target, Save, AlertTriangle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { TaxInputs, calculateOldRegimeTax, calculateNewRegimeTax, formatCurrency } from '@/lib/taxCalculationsNew'
import { HeaderBannerAd, ContentAd, FooterAd, MobileBannerAd } from './AdComponents'

export default function TaxCalculator() {
  const [inputs, setInputs] = useState<TaxInputs>({
    annualSalary: 0,
    hra: 0,
    rentPaid: 0,
    providentFund: 0,
    lifeInsurance: 0,
    elss: 0,
    homeLoanInterest: 0,
    medicalInsurance: 0,
    educationLoan: 0,
    nps: 0,
    professionalTax: 0,
    employerNPS: 0,
    agniveerCorpus: 0,
    isMetro: false,
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
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        {/* Simplified Header Section */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-lg border-b border-gray-200"
        >
          <div className="container mx-auto px-4 py-4">
            <div className="text-center">
              <motion.div 
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="flex items-center justify-center gap-3 mb-2"
              >
                <Calculator className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">TaxGenius.in</h1>
              </motion.div>
              
              <p className="text-base sm:text-lg text-gray-600 px-2">
                India Tax Calculator for AY 2025-26 | Old vs New Regime Comparison
              </p>
            </div>
          </div>
        </motion.header>

        {/* Header Banner Ad */}
        <HeaderBannerAd />
        
        {/* Mobile Banner Ad */}
        <MobileBannerAd />

        {/* Important Disclaimer */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="container mx-auto px-4 py-3 sm:py-4"
        >
          <Alert variant="warning" className="mb-3 sm:mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="text-xs sm:text-sm">
              <strong>Important Disclaimer:</strong> This calculator provides basic tax estimates for informational purposes only. 
              Tax calculations can be complex and depend on various factors not covered here. For accurate tax planning and filing, 
              please consult a qualified Chartered Accountant (CA) or visit official Income Tax Department resources at{' '}
              <a href="https://www.incometax.gov.in" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                incometax.gov.in
              </a>
            </AlertDescription>
          </Alert>
        </motion.div>

        {/* Main Calculator Section */}
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
            {/* Input Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Edit className="w-5 h-5 text-blue-600" />
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
                        value={inputs.annualSalary || ''}
                        onChange={(e) => updateInput('annualSalary', Number(e.target.value))}
                        className="mt-1"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="hra" className="text-sm font-medium">HRA Received (₹)</Label>
                        <Input
                          id="hra"
                          type="number"
                          placeholder="e.g., 240000"
                          value={inputs.hra || ''}
                          onChange={(e) => updateInput('hra', Number(e.target.value))}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="rentPaid" className="text-sm font-medium">Rent Paid (₹)</Label>
                        <Input
                          id="rentPaid"
                          type="number"
                          placeholder="e.g., 180000"
                          value={inputs.rentPaid || ''}
                          onChange={(e) => updateInput('rentPaid', Number(e.target.value))}
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="providentFund" className="text-sm font-medium">Provident Fund (₹)</Label>
                      <Input
                        id="providentFund"
                        type="number"
                        placeholder="e.g., 60000"
                        value={inputs.providentFund || ''}
                        onChange={(e) => updateInput('providentFund', Number(e.target.value))}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="lifeInsurance" className="text-sm font-medium">Life Insurance Premium (₹)</Label>
                      <Input
                        id="lifeInsurance"
                        type="number"
                        placeholder="e.g., 25000"
                        value={inputs.lifeInsurance || ''}
                        onChange={(e) => updateInput('lifeInsurance', Number(e.target.value))}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="elss" className="text-sm font-medium">ELSS Investment (₹)</Label>
                      <Input
                        id="elss"
                        type="number"
                        placeholder="e.g., 50000"
                        value={inputs.elss || ''}
                        onChange={(e) => updateInput('elss', Number(e.target.value))}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="homeLoanInterest" className="text-sm font-medium">Home Loan Interest (₹)</Label>
                      <Input
                        id="homeLoanInterest"
                        type="number"
                        placeholder="e.g., 200000"
                        value={inputs.homeLoanInterest || ''}
                        onChange={(e) => updateInput('homeLoanInterest', Number(e.target.value))}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="medicalInsurance" className="text-sm font-medium">Medical Insurance Premium (₹)</Label>
                      <Input
                        id="medicalInsurance"
                        type="number"
                        placeholder="e.g., 25000"
                        value={inputs.medicalInsurance || ''}
                        onChange={(e) => updateInput('medicalInsurance', Number(e.target.value))}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="educationLoan" className="text-sm font-medium">Education Loan Interest (₹)</Label>
                      <Input
                        id="educationLoan"
                        type="number"
                        placeholder="e.g., 40000"
                        value={inputs.educationLoan || ''}
                        onChange={(e) => updateInput('educationLoan', Number(e.target.value))}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="nps" className="text-sm font-medium">NPS Contribution (₹)</Label>
                      <Input
                        id="nps"
                        type="number"
                        placeholder="e.g., 50000"
                        value={inputs.nps || ''}
                        onChange={(e) => updateInput('nps', Number(e.target.value))}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <Separator />

                  {/* Advanced Options */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      Advanced Options
                    </h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="professionalTax" className="text-sm font-medium">Professional Tax (₹)</Label>
                        <Input
                          id="professionalTax"
                          type="number"
                          placeholder="e.g., 2500"
                          value={inputs.professionalTax || ''}
                          onChange={(e) => updateInput('professionalTax', Number(e.target.value))}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="employerNPS" className="text-sm font-medium">Employer NPS Contribution (₹)</Label>
                        <Input
                          id="employerNPS"
                          type="number"
                          placeholder="e.g., 50000"
                          value={inputs.employerNPS || ''}
                          onChange={(e) => updateInput('employerNPS', Number(e.target.value))}
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="agniveerCorpus" className="text-sm font-medium">Agniveer Corpus Fund (₹)</Label>
                      <Input
                        id="agniveerCorpus"
                        type="number"
                        placeholder="e.g., 25000"
                        value={inputs.agniveerCorpus || ''}
                        onChange={(e) => updateInput('agniveerCorpus', Number(e.target.value))}
                        className="mt-1"
                      />
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
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="w-4 h-4 text-gray-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Affects HRA calculation (50% vs 40% of basic salary)</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                      <Calculator className="w-4 h-4 mr-2" />
                      Calculate Tax
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Save className="w-4 h-4 mr-2" />
                      Save Calculation
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Results Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-green-600" />
                    Tax Comparison Results
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:gap-6">
                    {/* Old Regime Results */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="border-2 border-orange-200 rounded-lg p-4 sm:p-6 bg-gradient-to-r from-orange-50 to-red-50"
                    >
                      <h3 className="flex items-center gap-2 font-semibold text-orange-800 mb-4 text-base sm:text-lg">
                        <History className="w-4 h-4 sm:w-5 sm:h-5" />
                        Old Tax Regime
                      </h3>
                      <div className="space-y-2 sm:space-y-3">
                        <div className="flex justify-between text-xs sm:text-sm">
                          <span>Gross Income:</span>
                          <span className="font-semibold">{formatCurrency(results.oldRegime.grossIncome)}</span>
                        </div>
                        <div className="flex justify-between text-xs sm:text-sm">
                          <span>Total Deductions:</span>
                          <span className="font-semibold text-green-600">{formatCurrency(results.oldRegime.totalDeductions)}</span>
                        </div>
                        <div className="flex justify-between text-xs sm:text-sm">
                          <span>Taxable Income:</span>
                          <span className="font-semibold">{formatCurrency(results.oldRegime.taxableIncome)}</span>
                        </div>
                        <div className="flex justify-between text-xs sm:text-sm">
                          <span>Income Tax:</span>
                          <span className="font-semibold">{formatCurrency(results.oldRegime.incomeTax)}</span>
                        </div>
                        <div className="flex justify-between text-xs sm:text-sm">
                          <span>Cess (4%):</span>
                          <span className="font-semibold">{formatCurrency(results.oldRegime.cess)}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-bold text-base sm:text-lg">
                          <span>Total Tax:</span>
                          <span className="text-red-600">{formatCurrency(results.oldRegime.totalTax)}</span>
                        </div>
                        <div className="flex justify-between font-bold text-base sm:text-lg">
                          <span>Net Income:</span>
                          <span className="text-green-600">{formatCurrency(results.oldRegime.netIncome)}</span>
                        </div>
                      </div>
                    </motion.div>

                    {/* New Regime Results */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="border-2 border-blue-200 rounded-lg p-4 sm:p-6 bg-gradient-to-r from-blue-50 to-indigo-50"
                    >
                      <h3 className="flex items-center gap-2 font-semibold text-blue-800 mb-4 text-base sm:text-lg">
                        <Star className="w-4 h-4 sm:w-5 sm:h-5" />
                        New Tax Regime
                      </h3>
                      <div className="space-y-2 sm:space-y-3">
                        <div className="flex justify-between text-xs sm:text-sm">
                          <span>Gross Income:</span>
                          <span className="font-semibold">{formatCurrency(results.newRegime.grossIncome)}</span>
                        </div>
                        <div className="flex justify-between text-xs sm:text-sm">
                          <span>Total Deductions:</span>
                          <span className="font-semibold text-green-600">{formatCurrency(results.newRegime.totalDeductions)}</span>
                        </div>
                        <div className="flex justify-between text-xs sm:text-sm">
                          <span>Taxable Income:</span>
                          <span className="font-semibold">{formatCurrency(results.newRegime.taxableIncome)}</span>
                        </div>
                        <div className="flex justify-between text-xs sm:text-sm">
                          <span>Income Tax:</span>
                          <span className="font-semibold">{formatCurrency(results.newRegime.incomeTax)}</span>
                        </div>
                        <div className="flex justify-between text-xs sm:text-sm">
                          <span>Cess (4%):</span>
                          <span className="font-semibold">{formatCurrency(results.newRegime.cess)}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-bold text-base sm:text-lg">
                          <span>Total Tax:</span>
                          <span className="text-red-600">{formatCurrency(results.newRegime.totalTax)}</span>
                        </div>
                        <div className="flex justify-between font-bold text-base sm:text-lg">
                          <span>Net Income:</span>
                          <span className="text-green-600">{formatCurrency(results.newRegime.netIncome)}</span>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>

              {/* Comparison Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Scale className="w-5 h-5 text-purple-600" />
                    Comparison Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                    <div className="p-3 sm:p-4 bg-gray-50 rounded-lg">
                      <div className="text-lg sm:text-2xl font-bold text-gray-800">
                        {formatCurrency(annualSavings)}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600">Tax Difference</div>
                    </div>
                    <div className="p-3 sm:p-4 bg-green-50 rounded-lg">
                      <div className="text-lg sm:text-2xl font-bold text-green-800">
                        {recommendedRegime}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600">Recommended</div>
                    </div>
                    <div className="p-3 sm:p-4 bg-blue-50 rounded-lg">
                      <div className="text-lg sm:text-2xl font-bold text-blue-800">
                        {formatCurrency(annualSavings)}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600">Annual Savings</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Content Ad */}
        <ContentAd />

        {/* Information Cards */}
        <div className="container mx-auto px-4 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="w-5 h-5 text-blue-600" />
                  Old Tax Regime
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-xs sm:text-sm">
                  <li>• Standard deduction: ₹50,000</li>
                  <li>• HRA exemption available</li>
                  <li>• 80C deduction up to ₹1.5 lakh</li>
                  <li>• Home loan interest deduction</li>
                  <li>• Medical insurance deduction</li>
                  <li>• Education loan interest deduction</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-purple-600" />
                  New Tax Regime (Budget 2025)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-xs sm:text-sm">
                  <li>• Standard deduction: ₹75,000</li>
                  <li>• No tax up to ₹3 lakh income</li>
                  <li>• Marginal relief for ₹12-12.75 lakh income</li>
                  <li>• Effectively no tax up to ₹12.75 lakh for salaried</li>
                  <li>• Revised tax slabs with lower rates</li>
                  <li>• Simplified structure with minimal deductions</li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
        
        {/* Bottom Disclaimer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="container mx-auto px-4 py-4 sm:py-6"
        >
          <Card className="bg-gray-50 border-gray-200">
            <CardContent className="pt-4 sm:pt-6">
              <div className="text-center space-y-2 sm:space-y-3">
                <div className="flex items-center justify-center gap-2 text-orange-600">
                  <Info className="h-4 w-4 sm:h-5 sm:w-5" />
                  <h3 className="font-semibold text-sm sm:text-base">Professional Advice Recommended</h3>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 max-w-4xl mx-auto leading-relaxed px-2">
                  This tax calculator is designed to provide basic estimates based on standard tax rules for AY 2025-26. 
                  However, tax situations can be highly individual and complex. Factors such as capital gains, business income, 
                  multiple properties, international income, or specific deductions may significantly impact your actual tax liability. 
                  <strong className="text-gray-800"> We strongly recommend consulting with a qualified Chartered Accountant (CA) or tax professional</strong> 
                  {' '}for personalized advice, accurate calculations, and proper tax planning strategies.
                </p>
                <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-2 sm:gap-4 text-xs text-gray-500 mt-3 sm:mt-4">
                  <span>• For official tax information: incometax.gov.in</span>
                  <span>• Find a CA near you: icai.org</span>
                  <span>• Tax filing portal: incometaxindiaefiling.gov.in</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Footer Ad */}
        <FooterAd />
      </div>
    </TooltipProvider>
  )
}
