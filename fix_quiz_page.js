const fs = require('fs');
const path = 'c:\\Users\\User\\Pictures\\CheryV1\\src\\app\\find-your-chery\\page.tsx';
const content = `'use client'

import { useState } from 'react'
import { ArrowRight, Star, Car } from 'lucide-react'
import Link from 'next/link'
import { vehicles } from '@/lib/data/vehicles'
import { cn } from '@/lib/utils/cn'
import VehicleCard from '@/components/sections/VehicleCard'
import { motion, AnimatePresence } from 'framer-motion'

export default function FindYourCheryPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [showResult, setShowResult] = useState(false)

  const questions = [
    {
      id: 'budget',
      question: 'What is your budget range?',
      options: [
        { value: 'under-300', label: 'Under Rp 300 juta', emoji: '??' },
        { value: '300-500', label: 'Rp 300 - 500 juta', emoji: '??' },
        { value: '500-800', label: 'Rp 500 - 800 juta', emoji: '??' },
        { value: 'above-800', label: 'Above Rp 800 juta', emoji: '??' },
      ],
    },
    {
      id: 'type',
      question: 'What type of vehicle do you prefer?',
      options: [
        { value: 'suv', label: 'SUV - Spacious & Versatile', emoji: '??' },
        { value: 'sedan', label: 'Sedan - Elegant & Comfortable', emoji: '??' },
        { value: 'electric', label: 'Electric - Eco-Friendly', emoji: '?' },
        { value: 'any', label: 'No Preference', emoji: '??' },
      ],
    },
    {
      id: 'seats',
      question: 'How many seats do you need?',
      options: [
        { value: '5', label: '5 Seats', emoji: '???????????' },
        { value: '7', label: '7 Seats', emoji: '??????????????' },
        { value: 'any', label: 'No Preference', emoji: '??' },
      ],
    },
    {
      id: 'usage',
      question: 'What will be your primary usage?',
      options: [
        { value: 'city', label: 'City Commuting', emoji: '???' },
        { value: 'family', label: 'Family Trips', emoji: '???' },
        { value: 'business', label: 'Business Use', emoji: '??' },
        { value: 'adventure', label: 'Adventure & Travel', emoji: '???' },
      ],
    },
    {
      id: 'priority',
      question: 'What is your top priority?',
      options: [
        { value: 'safety', label: 'Safety & Security', emoji: '???' },
        { value: 'performance', label: 'Performance & Power', emoji: '?' },
        { value: 'comfort', label: 'Comfort & Features', emoji: '?' },
        { value: 'value', label: 'Value for Money', emoji: '??' },
      ],
    },
  ]

  const getRecommendation = () => {
    const budget = answers.budget
    const type = answers.type
    const seats = answers.seats
    const usage = answers.usage
    const priority = answers.priority

    let recommended = vehicles

    if (type === 'electric') {
      recommended = recommended.filter(v => v.category === 'ev')
    } else if (type === 'suv') {
      recommended = recommended.filter(v => v.category === 'suv')
    }

    if (seats === '7') {
      recommended = recommended.filter(v => v.specs.seats >= 7)
    }

    if (budget === 'under-300') {
      recommended = recommended.filter(v => v.price < 300000000)
    } else if (budget === '300-500') {
      recommended = recommended.filter(v => v.price >= 300000000 && v.price <= 500000000)
    } else if (budget === '500-800') {
      recommended = recommended.filter(v => v.price >= 500000000 && v.price <= 800000000)
    }

    if (recommended.length === 0) {
      recommended = vehicles.slice(0, 2)
    }

    return recommended
  }

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }))

    setTimeout(() => {
      if (currentStep < questions.length - 1) {
        setCurrentStep(currentStep + 1)
      } else {
        setShowResult(true)
      }
    }, 300)
  }

  const resetQuiz = () => {
    setCurrentStep(0)
    setAnswers({})
    setShowResult(false)
  }

  const recommendations = getRecommendation()
  const progress = ((currentStep + 1) / questions.length) * 100

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/find-your-chery-hero.png"
            alt="Chery vehicles"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-chery-navy/60" />
        </div>
        <div className="container-custom relative z-10 text-center">
          <div className="animate-slide-up">
            <div className="w-20 h-20 bg-chery-red/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Star className="h-10 w-10 text-chery-red" />
            </div>
            <h1 className="font-heading font-bold text-4xl md:text-6xl mb-6 text-white">
              Find Your Chery
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              Answer a few questions and we'll recommend the perfect Chery for your lifestyle
            </p>
          </div>
        </div>
      </section>

      {/* Quiz Section */}
      <AnimatePresence mode="wait">
        {!showResult ? (
          <motion.section
            key="quiz"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.4 }}
            className="relative section-padding overflow-hidden bg-gradient-to-b from-gray-50 via-white to-white"
          >
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -top-24 left-10 h-72 w-72 rounded-full bg-chery-red/10 blur-3xl" />
              <div className="absolute -bottom-24 right-10 h-72 w-72 rounded-full bg-chery-navy/10 blur-3xl" />
            </div>

            <div className="container-custom relative">
              <div className="mx-auto max-w-3xl">
                {/* Stepper */}
                <div className="mb-10">
                  <div className="flex items-center justify-between">
                    {questions.map((q, idx) => (
                      <div key={q.id} className="flex flex-1 flex-col items-center">
                        <div
                          className={cn(
                            'flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-bold transition-all duration-300',
                            idx <= currentStep
                              ? 'border-chery-red bg-chery-red text-white shadow-lg shadow-chery-red/20'
                              : 'border-gray-300 bg-white text-gray-500'
                          )}
                        >
                          {idx < currentStep ? '?' : idx + 1}
                        </div>
                        <span className="mt-2 hidden text-xs font-semibold text-gray-500 md:block">
                          Step {idx + 1}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
                    <div
                      className="h-full rounded-full bg-chery-red transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Question Card */}
                <div className="rounded-3xl border border-gray-200 bg-white/90 p-6 shadow-xl backdrop-blur-md md:p-10">
                  <h2 className="font-heading font-bold text-2xl md:text-3xl text-chery-navy mb-8 text-center">
                    {questions[currentStep].question}
                  </h2>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {questions[currentStep].options.map((option) => {
                      const selected = answers[questions[currentStep].id] === option.value;
                      return (
                        <button
                          key={option.value}
                          onClick={() => handleAnswer(questions[currentStep].id, option.value)}
                          className={cn(
                            'group flex items-center rounded-2xl border-2 px-6 py-5 text-left transition-all duration-300',
                            selected
                              ? 'border-chery-red bg-chery-red/5 shadow-lg shadow-chery-red/10'
                              : 'border-gray-200 bg-white hover:border-chery-red/60 hover:shadow-md'
                          )}
                        >
                          <span className="mr-4 text-3xl transition-transform duration-300 group-hover:scale-110">
                            {option.emoji}
                          </span>
                          <span className="font-semibold text-chery-navy text-lg">
                            {option.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        ) : (
          {/* Results Section */}
          <motion.section
            key="results"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="section-padding bg-white"
          >
            <div className="container-custom">
              <div className="text-center mb-16">
                <div className="w-20 h-20 bg-chery-red/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Star className="h-10 w-10 text-chery-red" />
                </div>
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-chery-navy mb-4">
                  Your Perfect Match
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Based on your preferences, we recommend these Chery vehicles
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {recommendations.map((vehicle, index) => (
                  <motion.div
                    key={vehicle.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <VehicleCard vehicle={vehicle} index={index} />
                  </motion.div>
                ))}
              </div>

              <div className="text-center space-y-4">
                <button
                  onClick={resetQuiz}
                  className="btn-secondary inline-flex items-center text-lg"
                >
                  Retake Quiz
                </button>
                <p className="text-gray-600">
                  Still unsure? <Link href="/contact" className="text-chery-red font-semibold hover:underline">Contact us</Link> for personalized assistance
                </p>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <section className="section-padding bg-chery-navy text-white">
        <div className="container-custom text-center">
          <div className="animate-slide-up">
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
              Ready to Experience Your Recommended Chery?
            </h2>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Book a test drive today and discover why Chery is the perfect choice for you
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary inline-flex items-center text-lg">
                Book Test Drive
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link href="/models" className="btn-secondary bg-white/10 border-white text-white hover:bg-white hover:text-chery-navy text-lg">
                Browse All Models
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
`;

// remove extra escapes
const finalContent = content.replace(/\\n/g, '\n');
fs.writeFileSync(path, finalContent, 'utf8');
console.log('done');
