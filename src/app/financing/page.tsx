'use client'

import { useState } from 'react'
import { Calculator, ArrowRight, Info, Check } from 'lucide-react'
import Link from 'next/link'
import { vehicles } from '@/lib/data/vehicles'
import { cn } from '@/lib/utils/cn'

export default function FinancingPage() {
  const [selectedVehicle, setSelectedVehicle] = useState(vehicles[0])
  const [downPayment, setDownPayment] = useState(20)
  const [tenure, setTenure] = useState(48)
  const [interestRate] = useState(5.5)

  const calculateFinancing = () => {
    const costPrice = selectedVehicle.price
    const downPaymentAmount = costPrice * (downPayment / 100)
    
    // Persentase Margin = Annual Flat Margin Rate * (Tenure in Years)
    const marginRatePercentage = (interestRate / 100) * (tenure / 12)
    const totalMargin = costPrice * marginRatePercentage
    
    const totalSellingPrice = costPrice + totalMargin
    const remainingDebt = totalSellingPrice - downPaymentAmount
    const monthlyInstallment = remainingDebt / tenure

    return {
      downPaymentAmount,
      totalMargin,
      totalSellingPrice,
      remainingDebt,
      monthlyInstallment,
    }
  }

  const {
    downPaymentAmount,
    totalMargin,
    totalSellingPrice,
    remainingDebt,
    monthlyInstallment,
  } = calculateFinancing()

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(value)
  }

  return (
    <main className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-chery-navy to-chery-navy/90 text-white py-20">
        <div className="container-custom">
          <div className="text-center max-w-4xl mx-auto animate-slide-up">
            <div className="w-20 h-20 bg-chery-red/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calculator className="h-10 w-10 text-chery-red" />
            </div>
            <h1 className="font-heading font-bold text-4xl md:text-6xl mb-6">
              Financing Calculator
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Plan your purchase with our easy-to-use financing simulator. Calculate your monthly payments and find the best option for your budget.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Input Panel */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 animate-slide-up">
              <h2 className="font-heading font-bold text-2xl md:text-3xl text-chery-navy mb-8">
                Calculate Your Payment
              </h2>

              {/* Vehicle Selection */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Select Vehicle
                </label>
                <select
                  value={selectedVehicle.id}
                  onChange={(e) => {
                    const vehicle = vehicles.find(v => v.id === e.target.value)
                    if (vehicle) setSelectedVehicle(vehicle)
                  }}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-chery-red focus:outline-none transition-colors"
                >
                  {vehicles.map((vehicle) => (
                    <option key={vehicle.id} value={vehicle.id}>
                      {vehicle.name} - {formatCurrency(vehicle.price)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Down Payment Slider */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-semibold text-gray-700">
                    Down Payment
                  </label>
                  <span className="text-chery-red font-bold text-lg">
                    {downPayment}%
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="50"
                  step="5"
                  value={downPayment}
                  onChange={(e) => setDownPayment(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-chery-red"
                />
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-500">10%</span>
                  <span className="text-sm text-gray-600">
                    {formatCurrency(downPaymentAmount)}
                  </span>
                  <span className="text-xs text-gray-500">50%</span>
                </div>
              </div>

              {/* Tenure Selection */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Loan Tenure
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[12, 24, 36, 48, 60].map((months) => (
                    <button
                      key={months}
                      onClick={() => setTenure(months)}
                      className={cn(
                        'py-3 rounded-lg font-semibold transition-all duration-300',
                        tenure === months
                          ? 'bg-chery-red text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      )}
                    >
                      {months} mo
                    </button>
                  ))}
                </div>
              </div>

              {/* Flat Margin Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start space-x-3">
                <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-semibold text-blue-900 mb-1">
                    Flat Margin Rate: {interestRate}% per year
                  </p>
                  <p className="text-blue-700">
                    Calculated using flat margin principles. Actual rates and availability may vary based on your selected partner.
                  </p>
                </div>
              </div>
            </div>

            {/* Result Panel */}
            <div className="bg-gradient-to-br from-chery-red to-chery-navy rounded-3xl shadow-2xl p-8 md:p-10 text-white animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <h2 className="font-heading font-bold text-2xl md:text-3xl mb-8">
                Your Estimate
              </h2>

              {/* Vehicle Info */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-6">
                <p className="text-sm text-gray-200 mb-2">Selected Vehicle</p>
                <p className="font-heading font-bold text-xl mb-1">
                  {selectedVehicle.name}
                </p>
                <p className="text-2xl font-bold text-white">
                  {formatCurrency(selectedVehicle.price)}
                </p>
              </div>

              {/* Breakdown */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-between py-3 border-b border-white/20">
                  <span className="text-gray-200">Cost Price (Harga Perolehan)</span>
                  <span className="font-semibold">{formatCurrency(selectedVehicle.price)}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-white/20">
                  <span className="text-gray-200">Total Margin (Finance Charges)</span>
                  <span className="font-semibold text-yellow-300">
                    +{formatCurrency(totalMargin)} ({(interestRate * (tenure / 12)).toFixed(1)}%)
                  </span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-white/20">
                  <span className="text-gray-200">Total Selling Price (Harga Jual Total)</span>
                  <span className="font-semibold">{formatCurrency(totalSellingPrice)}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-white/20">
                  <span className="text-gray-200">Down Payment (Uang Muka - {downPayment}%)</span>
                  <span className="font-semibold text-green-300">
                    -{formatCurrency(downPaymentAmount)}
                  </span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-white/20">
                  <span className="text-gray-200">Financed Balance (Sisa Piutang)</span>
                  <span className="font-semibold text-blue-300">
                    {formatCurrency(remainingDebt)}
                  </span>
                </div>
              </div>

              {/* Monthly Payment */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8">
                <p className="text-sm text-gray-200 mb-2">Monthly Installment (Cicilan per Bulan)</p>
                <p className="font-heading font-bold text-4xl text-white mb-2">
                  {formatCurrency(monthlyInstallment)}
                </p>
                <p className="text-sm text-gray-200">
                  per month for {tenure} months
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3">
                <Link
                  href={`/contact?model=${selectedVehicle.slug}`}
                  className="w-full bg-white text-chery-red hover:bg-gray-100 font-semibold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center"
                >
                  Apply for Financing
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <a
                  href="https://wa.me/6281234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-transparent border-2 border-white text-white hover:bg-white hover:text-chery-red font-semibold py-4 px-6 rounded-lg transition-all duration-300 inline-flex items-center justify-center"
                >
                  Chat with Advisor
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-chery-navy mb-4">
              Why Finance with Chery?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We make owning a Chery easy and affordable with flexible financing options
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Competitive Rates',
                description: 'Starting from 3.5% per year with leading banks',
              },
              {
                title: 'Flexible Tenure',
                description: 'Choose from 12 to 60 months repayment period',
              },
              {
                title: 'Low Down Payment',
                description: 'Starting from only 10-20% down payment',
              },
              {
                title: 'Fast Approval',
                description: 'Get approved within 24-48 hours',
              },
            ].map((benefit, index) => (
              <div
                key={benefit.title}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow text-center animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 bg-chery-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="h-7 w-7 text-chery-red" />
                </div>
                <h3 className="font-heading font-bold text-lg mb-2 text-chery-navy">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Banks */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-chery-navy mb-4">
              Our Financing Partners
            </h2>
            <p className="text-lg text-gray-600">
              We work with Indonesia's leading banks to offer you the best rates
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {['BCA', 'Mandiri', 'BNI', 'CIMB Niaga', 'Maybank', 'UOB', 'HSBC', 'Standard Chartered'].map((bank, index) => (
              <div
                key={bank}
                className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow flex items-center justify-center animate-scale-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <p className="font-heading font-bold text-xl text-gray-400">
                  {bank}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-chery-navy text-white">
        <div className="container-custom text-center">
          <div className="animate-slide-up">
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
              Ready to Make It Yours?
            </h2>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Get pre-approved today and drive home your dream Chery sooner
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary inline-flex items-center text-lg">
                Start Application
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <a href="tel:+622112345678" className="btn-secondary bg-white/10 border-white text-white hover:bg-white hover:text-chery-navy inline-flex items-center text-lg">
                Call for Details
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}