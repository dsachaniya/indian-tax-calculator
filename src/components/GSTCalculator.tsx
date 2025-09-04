'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Calculator, Receipt, Calendar, IndianRupee, ArrowLeft, Info } from 'lucide-react'
import Link from 'next/link'
import { ContentAd } from './AdComponents'
import Footer from './Footer'

interface GSTResult {
  gstAmount: number
  totalAmount: number
  applicableRate: number
  rateType: 'old' | 'new'
  eventCount: number
}

export default function GSTCalculator() {
  const [inputs, setInputs] = useState({
    type: '',
    amount: '',
    supplyDate: '',
    invoiceDate: '',
    paymentDate: ''
  })
  
  const [result, setResult] = useState<GSTResult | null>(null)

  const calculateGST = (type: string, amount: number, supplyDate: string, invoiceDate: string, paymentDate: string): GSTResult => {
    // Define GST rates based on type
    const currentRates = {
      "goods": { "old": 0.18, "new": 0.05 },
      "services": { "old": 0.18, "new": 0.12 }
    }

    // Define the rate change date
    const rateChangeDate = new Date("2025-09-22")

    // Convert input dates to Date objects
    const supply = new Date(supplyDate)
    const invoice = new Date(invoiceDate)
    const payment = new Date(paymentDate)

    // Function to count events occurring before the rate change date
    function countEventsBefore(date: Date) {
      let count = 0
      if (supply < date) count++
      if (invoice < date) count++
      if (payment < date) count++
      return count
    }

    const eventCount = countEventsBefore(rateChangeDate)

    // Determine GST rate based on the number of events before the rate change date
    let applicableRate: number
    let rateType: 'old' | 'new'
    
    if (eventCount >= 2) {
      applicableRate = currentRates[type as keyof typeof currentRates].old
      rateType = 'old'
    } else {
      applicableRate = currentRates[type as keyof typeof currentRates].new
      rateType = 'new'
    }

    // Compute the GST value
    const gstAmount = amount * applicableRate

    return {
      gstAmount,
      totalAmount: amount + gstAmount,
      applicableRate,
      rateType,
      eventCount
    }
  }

  const handleCalculate = () => {
    if (!inputs.type || !inputs.amount || !inputs.supplyDate || !inputs.invoiceDate || !inputs.paymentDate) {
      alert('Please fill all fields')
      return
    }

    const result = calculateGST(
      inputs.type,
      parseFloat(inputs.amount),
      inputs.supplyDate,
      inputs.invoiceDate,
      inputs.paymentDate
    )
    
    setResult(result)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2
    }).format(amount)
  }

  const formatPercentage = (rate: number) => {
    return `${(rate * 100).toFixed(0)}%`
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-lg border-b border-gray-200"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <Calculator className="w-6 h-6 text-green-600" />
                GST Section 14 - Time of Supply Calculator
              </h1>
              <p className="text-gray-600 mt-1">Calculate GST based on Section 14 Time of Supply rules with new rate reforms (Effective Sept 22, 2025)</p>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Receipt className="w-5 h-5 text-green-600" />
                  Transaction Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="type">Transaction Type</Label>
                    <Select value={inputs.type} onValueChange={(value: string) => setInputs(prev => ({ ...prev, type: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select transaction type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="goods">Goods</SelectItem>
                        <SelectItem value="services">Services</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="amount">Amount (₹)</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="Enter amount"
                      value={inputs.amount}
                      onChange={(e) => setInputs(prev => ({ ...prev, amount: e.target.value }))}
                    />
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Important Dates
                    </h3>
                    
                    <div>
                      <Label htmlFor="supplyDate">Supply Date</Label>
                      <Input
                        id="supplyDate"
                        type="date"
                        value={inputs.supplyDate}
                        onChange={(e) => setInputs(prev => ({ ...prev, supplyDate: e.target.value }))}
                      />
                    </div>

                    <div>
                      <Label htmlFor="invoiceDate">Invoice Date</Label>
                      <Input
                        id="invoiceDate"
                        type="date"
                        value={inputs.invoiceDate}
                        onChange={(e) => setInputs(prev => ({ ...prev, invoiceDate: e.target.value }))}
                      />
                    </div>

                    <div>
                      <Label htmlFor="paymentDate">Payment Date</Label>
                      <Input
                        id="paymentDate"
                        type="date"
                        value={inputs.paymentDate}
                        onChange={(e) => setInputs(prev => ({ ...prev, paymentDate: e.target.value }))}
                      />
                    </div>
                  </div>
                </div>

                <Button onClick={handleCalculate} className="w-full bg-green-600 hover:bg-green-700">
                  <Calculator className="w-4 h-4 mr-2" />
                  Calculate GST
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Content Advertisement */}
          <ContentAd />

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            {result && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <IndianRupee className="w-5 h-5 text-green-600" />
                    GST Calculation Results
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className={`p-4 rounded-lg ${result.rateType === 'new' ? 'bg-green-50 border border-green-200' : 'bg-orange-50 border border-orange-200'}`}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold">Applied Rate:</span>
                        <span className={`font-bold text-lg ${result.rateType === 'new' ? 'text-green-700' : 'text-orange-700'}`}>
                          {formatPercentage(result.applicableRate)}
                        </span>
                      </div>
                      <div className={`text-sm ${result.rateType === 'new' ? 'text-green-600' : 'text-orange-600'}`}>
                        {result.rateType === 'new' ? 'New Rate (Post Sept 22, 2025)' : 'Old Rate (Pre Sept 22, 2025)'}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Events before reform date: {result.eventCount}/3
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className={`p-2 rounded text-center ${new Date(inputs.supplyDate) < new Date("2025-09-22") ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'}`}>
                        Supply: {formatDate(inputs.supplyDate)}
                      </div>
                      <div className={`p-2 rounded text-center ${new Date(inputs.invoiceDate) < new Date("2025-09-22") ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'}`}>
                        Invoice: {formatDate(inputs.invoiceDate)}
                      </div>
                      <div className={`p-2 rounded text-center ${new Date(inputs.paymentDate) < new Date("2025-09-22") ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'}`}>
                        Payment: {formatDate(inputs.paymentDate)}
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Base Amount:</span>
                        <span className="font-semibold">{formatCurrency(parseFloat(inputs.amount))}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span>GST Amount ({formatPercentage(result.applicableRate)}):</span>
                        <span className="font-semibold text-blue-600">{formatCurrency(result.gstAmount)}</span>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total Amount:</span>
                        <span className="text-green-600">{formatCurrency(result.totalAmount)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Information Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="w-5 h-5 text-blue-600" />
                  GST Section 14 - Time of Supply & Rate Reform
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-blue-700">GST Section 14 - Time of Supply:</h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Section 14 of CGST Act determines when GST liability arises based on three key events.
                    </p>
                    <ul className="text-sm space-y-1 ml-4 text-gray-600">
                      <li>• Time of supply for goods/services</li>
                      <li>• Invoice issuance requirements</li>
                      <li>• Payment receipt timing</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-green-700">New Rates (From Sept 22, 2025):</h4>
                    <ul className="text-sm space-y-1 ml-4">
                      <li>• Goods: 5% (Reduced from 18%)</li>
                      <li>• Services: 12% (Reduced from 18%)</li>
                    </ul>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="font-semibold text-gray-700">Rate Application Logic:</h4>
                    <p className="text-sm text-gray-600">
                      If 2 or more events (Supply, Invoice, Payment) occur before Sept 22, 2025, 
                      old rates (18%) apply as per Section 14 provisions. Otherwise, new rates apply.
                    </p>
                  </div>

                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-xs text-blue-700">
                      <strong>Legal Note:</strong> This calculator implements Section 14 time of supply rules 
                      with hypothetical rate reforms. Consult official GST provisions and tax experts for compliance.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  )
}
