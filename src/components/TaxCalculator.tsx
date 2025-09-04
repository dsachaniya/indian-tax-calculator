'use client'

import { useState, useCallback, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Calculator, TrendingUp, DollarSign, FileText, Sparkles, Code, Smartphone, Rocket, Shield } from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Checkbox } from '@/components/ui/checkbox'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

import { 
  TaxInputs, 
  calculateOldRegimeTax, 
  calculateNewRegimeTax, 
  formatCurrency,
  TaxResults
} from '@/lib/taxCalculationsNew'

const TaxCalculator = () => {
  const [inputs, setInputs] = useState<TaxInputs>({
    annualSalary: 1100000,
    basicPlusDA: 550000, // Added basic + DA field (estimated as 50% of annual salary)
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
    section80G: 0, // Donations to approved institutions
    section80TTA: 0, // Savings Bank Interest
    section80TTB: 0, // Savings/FD Interest (Senior citizens)
    isMetro: true
  })

  const [isCalculated, setIsCalculated] = useState(false)

  // Memoized calculations for performance
  const { oldRegimeResults, newRegimeResults, comparison } = useMemo(() => {
    const oldResults = calculateOldRegimeTax(inputs)
    const newResults = calculateNewRegimeTax(inputs)
    const taxDifference = oldResults.totalTax - newResults.totalTax
    const recommendedRegime = taxDifference > 0 ? 'New Regime' : 'Old Regime'
    const annualSavings = Math.abs(taxDifference)
    const savingsPercentage = ((annualSavings / oldResults.grossIncome) * 100).toFixed(2)

    return {
      oldRegimeResults: oldResults,
      newRegimeResults: newResults,
      comparison: {
        taxDifference,
        recommendedRegime,
        annualSavings,
        savingsPercentage
      }
    }
  }, [inputs])

  const handleInputChange = useCallback((field: keyof TaxInputs, value: string | boolean) => {
    setInputs(prev => ({
      ...prev,
      [field]: typeof value === 'boolean' ? value : parseFloat(value) || 0
    }))
    setIsCalculated(true)
  }, [])

  const techBadges = [
    { icon: Code, label: 'Next.js + TypeScript' },
    { icon: Smartphone, label: 'Responsive Design' },
    { icon: Rocket, label: 'Real-time Calculation' },
    { icon: Shield, label: 'Budget 2025 Compliant' }
  ]

  const futureFeatures = [
    { icon: FileText, label: 'PDF Export' },
    { icon: TrendingUp, label: 'Tax Planning Tips' },
    { icon: DollarSign, label: 'Investment Suggestions' }
  ]

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        {/* Header Section */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-50"
        >
          <div className="container mx-auto px-4 py-6">
            <div className="text-center space-y-4">
              <motion.div 
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-center gap-3"
              >
                <Calculator className="h-8 w-8 text-blue-600" />
                <h1 className="text-4xl font-bold text-gray-900">TaxGenius.in</h1>
              </motion.div>
              
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Advanced India Tax Calculator for AY 2025-26 | Comprehensive Old vs New Regime Analysis
              </p>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-full inline-flex items-center gap-2"
              >
                <Sparkles className="h-5 w-5" />
                <span className="font-semibold">Enhanced with Precise Tax Rules:</span>
                <span className="text-blue-100">
                  Complete Section 80C, HRA calculation, rebate 87A, and all Budget 2025 updates
                </span>
              </motion.div>

              {/* Tech Stack Badges */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="flex flex-wrap justify-center gap-3 mt-6"
              >
                {techBadges.map((badge, index) => (
                  <Badge key={index} variant="secondary" className="px-4 py-2 text-sm">
                    <badge.icon className="h-4 w-4 mr-2" />
                    {badge.label}
                  </Badge>
                ))}
              </motion.div>

              {/* Future Features */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 mt-6"
              >
                <h4 className="text-lg font-semibold text-blue-800 mb-3 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Coming Soon
                </h4>
                <div className="flex flex-wrap justify-center gap-2">
                  {futureFeatures.map((feature, index) => (
                    <Badge key={index} variant="outline" className="text-blue-700 border-blue-300">
                      <feature.icon className="h-3 w-3 mr-1" />
                      {feature.label}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.header>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Input Section */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1"
            >
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Enter Your Details
                  </CardTitle>
                  <CardDescription>
                    Provide your salary and investment details for accurate tax calculation
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Basic Information */}
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="annualSalary">Annual Salary (₹)</Label>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Input
                            id="annualSalary"
                            type="number"
                            value={inputs.annualSalary}
                            onChange={(e) => handleInputChange('annualSalary', e.target.value)}
                            placeholder="e.g., 1200000"
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Total annual salary including all components (Basic + DA + HRA + Allowances)</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>

                    <div>
                      <Label htmlFor="basicPlusDA">Basic Salary + DA (₹)</Label>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Input
                            id="basicPlusDA"
                            type="number"
                            value={inputs.basicPlusDA}
                            onChange={(e) => handleInputChange('basicPlusDA', e.target.value)}
                            placeholder="e.g., 600000"
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Basic salary plus Dearness Allowance (if retirement benefit) for HRA calculation</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="hra">HRA Received (₹)</Label>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Input
                              id="hra"
                              type="number"
                              value={inputs.hra}
                              onChange={(e) => handleInputChange('hra', e.target.value)}
                              placeholder="e.g., 240000"
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>House Rent Allowance received from employer</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>

                      <div>
                        <Label htmlFor="rentPaid">Rent Paid (₹)</Label>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Input
                              id="rentPaid"
                              type="number"
                              value={inputs.rentPaid}
                              onChange={(e) => handleInputChange('rentPaid', e.target.value)}
                              placeholder="e.g., 180000"
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Actual rent paid for accommodation (required for HRA exemption)</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="isMetro"
                        checked={inputs.isMetro}
                        onCheckedChange={(checked) => handleInputChange('isMetro', !!checked)}
                      />
                      <Label htmlFor="isMetro" className="text-sm">
                        Living in Metro City? (affects HRA calculation)
                      </Label>
                    </div>
                  </div>

                  <Separator />

                  {/* Investment & Deductions */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900">Section 80C Investments</h4>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="providentFund">Provident Fund (₹)</Label>
                        <Input
                          id="providentFund"
                          type="number"
                          value={inputs.providentFund}
                          onChange={(e) => handleInputChange('providentFund', e.target.value)}
                          placeholder="e.g., 60000"
                        />
                      </div>

                      <div>
                        <Label htmlFor="lifeInsurance">Life Insurance (₹)</Label>
                        <Input
                          id="lifeInsurance"
                          type="number"
                          value={inputs.lifeInsurance}
                          onChange={(e) => handleInputChange('lifeInsurance', e.target.value)}
                          placeholder="e.g., 30000"
                        />
                      </div>

                      <div>
                        <Label htmlFor="elss">ELSS Investment (₹)</Label>
                        <Input
                          id="elss"
                          type="number"
                          value={inputs.elss}
                          onChange={(e) => handleInputChange('elss', e.target.value)}
                          placeholder="e.g., 60000"
                        />
                      </div>

                      <div>
                        <Label htmlFor="nps">NPS Contribution (₹)</Label>
                        <Input
                          id="nps"
                          type="number"
                          value={inputs.nps}
                          onChange={(e) => handleInputChange('nps', e.target.value)}
                          placeholder="e.g., 50000"
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
                          onChange={(e) => handleInputChange('homeLoanInterest', e.target.value)}
                          placeholder="e.g., 180000"
                        />
                      </div>

                      <div>
                        <Label htmlFor="medicalInsurance">Medical Insurance (₹)</Label>
                        <Input
                          id="medicalInsurance"
                          type="number"
                          value={inputs.medicalInsurance}
                          onChange={(e) => handleInputChange('medicalInsurance', e.target.value)}
                          placeholder="e.g., 25000"
                        />
                      </div>

                      <div>
                        <Label htmlFor="educationLoan">Education Loan Interest (₹)</Label>
                        <Input
                          id="educationLoan"
                          type="number"
                          value={inputs.educationLoan}
                          onChange={(e) => handleInputChange('educationLoan', e.target.value)}
                          placeholder="e.g., 40000"
                        />
                      </div>

                      <div>
                        <Label htmlFor="employerNPS">Employer NPS (₹)</Label>
                        <Input
                          id="employerNPS"
                          type="number"
                          value={inputs.employerNPS}
                          onChange={(e) => handleInputChange('employerNPS', e.target.value)}
                          placeholder="e.g., 50000"
                        />
                      </div>

                      <div>
                        <Label htmlFor="section80G">80G: Donations (₹)</Label>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Input
                              id="section80G"
                              type="number"
                              value={inputs.section80G}
                              onChange={(e) => handleInputChange('section80G', e.target.value)}
                              placeholder="Donations to approved institutions"
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Donations to approved institutions (50%/100% depending on approval)</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>

                      <div>
                        <Label htmlFor="section80TTA">80TTA: Savings Interest (₹)</Label>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Input
                              id="section80TTA"
                              type="number"
                              value={inputs.section80TTA}
                              onChange={(e) => handleInputChange('section80TTA', e.target.value)}
                              placeholder="Max ₹10,000 (Non-senior citizens)"
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Savings Bank Interest (Max ₹10,000, Non-senior citizens)</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>

                      <div>
                        <Label htmlFor="section80TTB">80TTB: Savings/FD Interest (₹)</Label>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Input
                              id="section80TTB"
                              type="number"
                              value={inputs.section80TTB}
                              onChange={(e) => handleInputChange('section80TTB', e.target.value)}
                              placeholder="Max ₹50,000 (Senior citizens)"
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Savings/FD Interest (Max ₹50,000, Senior citizens only)</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Results Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* Comparison Summary */}
              {isCalculated && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-green-800">
                        <TrendingUp className="h-6 w-6" />
                        Tax Comparison Summary
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-sm text-gray-600">Recommended Regime</p>
                          <p className="text-2xl font-bold text-green-700">{comparison.recommendedRegime}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Annual Savings</p>
                          <p className="text-2xl font-bold text-blue-700">{formatCurrency(comparison.annualSavings)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Savings %</p>
                          <p className="text-2xl font-bold text-purple-700">{comparison.savingsPercentage}%</p>
                        </div>
                      </div>
                      
                      {newRegimeResults.rebateApplied && (
                        <motion.div
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.5 }}
                          className="mt-4 p-4 bg-green-100 border border-green-300 rounded-lg"
                        >
                          <p className="text-green-800 font-semibold flex items-center gap-2">
                            <Sparkles className="h-5 w-5" />
                            🎉 You qualify for complete tax rebate under new regime!
                          </p>
                        </motion.div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Tax Regime Comparison Cards */}
              <div className="grid md:grid-cols-2 gap-6">
                <TaxRegimeCard
                  title="Old Tax Regime"
                  results={oldRegimeResults}
                  isRecommended={comparison.recommendedRegime === 'Old Regime'}
                  color="orange"
                />
                <TaxRegimeCard
                  title="New Tax Regime"
                  results={newRegimeResults}
                  isRecommended={comparison.recommendedRegime === 'New Regime'}
                  color="blue"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}

interface TaxRegimeCardProps {
  title: string
  results: TaxResults
  isRecommended: boolean
  color: 'orange' | 'blue'
}

const TaxRegimeCard = ({ title, results, isRecommended, color }: TaxRegimeCardProps) => {
  const colorClasses = {
    orange: {
      border: 'border-orange-200',
      bg: 'from-orange-50 to-red-50',
      header: 'text-orange-800',
      badge: 'bg-orange-100 text-orange-800',
    },
    blue: {
      border: 'border-blue-200',
      bg: 'from-blue-50 to-indigo-50',
      header: 'text-blue-800',
      badge: 'bg-blue-100 text-blue-800',
    }
  }

  const classes = colorClasses[color]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.02 }}
      className={`relative ${isRecommended ? 'ring-2 ring-green-400' : ''}`}
    >
      <Card className={`bg-gradient-to-br ${classes.bg} ${classes.border} relative overflow-hidden`}>
        {isRecommended && (
          <div className="absolute top-4 right-4">
            <Badge variant="default" className="bg-green-500 text-white">
              Recommended
            </Badge>
          </div>
        )}
        
        <CardHeader>
          <CardTitle className={`${classes.header} text-xl`}>{title}</CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Gross Income:</span>
              <span className="font-semibold">{formatCurrency(results.grossIncome)}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Total Deductions:</span>
              <span className="font-semibold">{formatCurrency(results.totalDeductions)}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Taxable Income:</span>
              <span className="font-semibold">{formatCurrency(results.taxableIncome)}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Income Tax:</span>
              <span className="font-semibold">{formatCurrency(results.incomeTax)}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Cess (4%):</span>
              <span className="font-semibold">{formatCurrency(results.cess)}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Effective Rate:</span>
              <span className="font-semibold">{results.effectiveRate}%</span>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <div className="flex justify-between text-lg font-bold">
              <span className="text-gray-900">Total Tax:</span>
              <span className={classes.header}>{formatCurrency(results.totalTax)}</span>
            </div>
            
            <div className="flex justify-between text-lg font-bold">
              <span className="text-gray-900">Net Income:</span>
              <span className="text-green-700">{formatCurrency(results.netIncome)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default TaxCalculator
