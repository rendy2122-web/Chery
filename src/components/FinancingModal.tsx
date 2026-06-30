'use client'

import { useState, useEffect } from 'react'
import { X, Calculator, TrendingUp, Calendar, DollarSign } from 'lucide-react'

export default function FinancingModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [price, setPrice] = useState('')
  const [downPayment, setDownPayment] = useState('20')
  const [tenor, setTenor] = useState('36')
  const [interestRate] = useState(5.5)
  const [monthlyPayment, setMonthlyPayment] = useState(0)
  const [animateIn, setAnimateIn] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      setTimeout(() => setAnimateIn(true), 10)
    } else {
      document.body.style.overflow = 'unset'
      setAnimateIn(false)
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    if (price && downPayment && tenor) {
      const priceNum = parseFloat(price)
      const dpPercent = parseFloat(downPayment)
      const tenorMonths = parseInt(tenor)
      
      if (priceNum > 0 && dpPercent >= 0 && tenorMonths > 0) {
        const dpAmount = priceNum * (dpPercent / 100)
        const loanAmount = priceNum - dpAmount
        const monthlyRate = interestRate / 100 / 12
        const monthly = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, tenorMonths)) / (Math.pow(1 + monthlyRate, tenorMonths) - 1)
        setMonthlyPayment(monthly)
      }
    } else {
      setMonthlyPayment(0)
    }
  }, [price, downPayment, tenor, interestRate])

  if (!isOpen) return null

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with blur */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div 
        className={`relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl shadow-2xl max-w-lg w-full p-8 border border-gray-700/50 transform transition-all duration-500 ${
          animateIn ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-200 hover:rotate-90"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-8">
          <div className="w-14 h-14 bg-gradient-to-br from-chery-red to-chery-red-dark rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-chery-red/50">
            <Calculator className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-3xl font-heading font-bold text-white mb-2">
            Financing Calculator
          </h2>
          <p className="text-gray-400 text-sm">
            Calculate your monthly installment
          </p>
        </div>

        {/* Form */}
        <div className="space-y-6">
          {/* Vehicle Price */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
              <DollarSign className="w-4 h-4 text-chery-red" />
              Vehicle Price
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">Rp</span>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="300,000,000"
                className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-chery-red/50 focus:border-chery-red transition-all"
              />
            </div>
          </div>

          {/* Down Payment Slider */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
              <TrendingUp className="w-4 h-4 text-chery-red" />
              Down Payment: <span className="text-chery-red font-bold">{downPayment}%</span>
            </label>
            <div className="relative">
              <input
                type="range"
                min="10"
                max="50"
                step="5"
                value={downPayment}
                onChange={(e) => setDownPayment(e.target.value)}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-chery-red"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>10%</span>
                <span>50%</span>
              </div>
            </div>
          </div>

          {/* Tenor Select */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
              <Calendar className="w-4 h-4 text-chery-red" />
              Loan Tenor
            </label>
            <select
              value={tenor}
              onChange={(e) => setTenor(e.target.value)}
              className="w-full px-4 py-3.5 bg-white/5 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-chery-red/50 focus:border-chery-red transition-all appearance-none cursor-pointer"
            >
              <option value="12" className="bg-gray-800">12 Months</option>
              <option value="24" className="bg-gray-800">24 Months</option>
              <option value="36" className="bg-gray-800">36 Months</option>
              <option value="48" className="bg-gray-800">48 Months</option>
              <option value="60" className="bg-gray-800">60 Months</option>
            </select>
          </div>

          {/* Results Card */}
          {price && (
            <div className="bg-gradient-to-br from-chery-red/10 to-chery-red/5 rounded-2xl p-6 border border-chery-red/20 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Interest Rate:</span>
                <span className="font-semibold text-white">{interestRate}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Down Payment:</span>
                <span className="font-semibold text-white">
                  {formatCurrency(parseFloat(price) * parseFloat(downPayment) / 100)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Loan Amount:</span>
                <span className="font-semibold text-white">
                  {formatCurrency(parseFloat(price) * (1 - parseFloat(downPayment) / 100))}
                </span>
              </div>
              {monthlyPayment > 0 && (
                <div className="flex justify-between items-center pt-3 border-t border-chery-red/20">
                  <span className="font-semibold text-white">Monthly Payment:</span>
                  <span className="font-bold text-2xl text-chery-red">
                    {formatCurrency(monthlyPayment)}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* CTA Button */}
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-chery-red to-chery-red-dark text-white py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-chery-red/50 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Close Calculator
          </button>
        </div>
      </div>
    </div>
  )
}