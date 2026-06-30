'use client'

import { useState, useEffect } from 'react'
import { ArrowRight, ArrowLeft, Star, Car, CheckCircle2, RefreshCw, Sparkles, Trophy, Zap, Shield, Heart, DollarSign } from 'lucide-react'
import Link from 'next/link'
import { vehicles } from '@/lib/data/vehicles'
import { cn } from '@/lib/utils/cn'
import VehicleCard from '@/components/sections/VehicleCard'
import { motion, AnimatePresence } from 'framer-motion'

// ── Types ──────────────────────────────────────────────────────────────────
type QuizState = 'quiz' | 'loading' | 'results'
type Direction = 1 | -1

// ── Loading messages ───────────────────────────────────────────────────────
const loadingMessages = [
  { text: 'Analyzing your preferences...', icon: '🔍' },
  { text: 'Scanning Chery lineup...', icon: '🚗' },
  { text: 'Calculating compatibility...', icon: '⚙️' },
  { text: 'Finding your perfect match...', icon: '✨' },
]

// ── Priority icons ─────────────────────────────────────────────────────────
const priorityIconMap: Record<string, React.ReactNode> = {
  safety:      <Shield className="h-5 w-5" />,
  performance: <Zap className="h-5 w-5" />,
  comfort:     <Heart className="h-5 w-5" />,
  value:       <DollarSign className="h-5 w-5" />,
}

// ── Variants ───────────────────────────────────────────────────────────────
const slideVariants = {
  enterRight:  { opacity: 0, x: 80 },
  enterLeft:   { opacity: 0, x: -80 },
  center:      { opacity: 1, x: 0 },
  exitRight:   { opacity: 0, x: 80 },
  exitLeft:    { opacity: 0, x: -80 },
}

// ─────────────────────────────────────────────────────────────────────────────
export default function FindYourCheryPage() {
  const [currentStep, setCurrentStep]     = useState(0)
  const [answers, setAnswers]             = useState<Record<string, string>>({})
  const [quizState, setQuizState]         = useState<QuizState>('quiz')
  const [direction, setDirection]         = useState<Direction>(1)
  const [loadingMsgIdx, setLoadingMsgIdx] = useState(0)

  // Cycle loading messages
  useEffect(() => {
    if (quizState !== 'loading') return
    const id = setInterval(() => {
      setLoadingMsgIdx(prev => (prev + 1) % loadingMessages.length)
    }, 700)
    const timer = setTimeout(() => {
      setQuizState('results')
    }, 3000)
    return () => { clearInterval(id); clearTimeout(timer) }
  }, [quizState])

  const questions = [
    {
      id: 'budget',
      question: 'What is your budget range?',
      subtitle: 'Select the range that feels comfortable for you',
      options: [
        { value: 'under-300', label: 'Under Rp 300 juta',   emoji: '💰', desc: 'Smart & affordable choice' },
        { value: '300-500',   label: 'Rp 300 – 500 juta',   emoji: '💵', desc: 'Great value, great features' },
        { value: '500-800',   label: 'Rp 500 – 800 juta',   emoji: '💎', desc: 'Premium experience' },
        { value: 'above-800', label: 'Above Rp 800 juta',   emoji: '👑', desc: 'Top of the lineup' },
      ],
    },
    {
      id: 'type',
      question: 'What type of vehicle do you prefer?',
      subtitle: 'Choose the body style that suits your personality',
      options: [
        { value: 'suv',     label: 'SUV',      emoji: '🚙', desc: 'Spacious & versatile for any road' },
        { value: 'sedan',   label: 'Sedan',    emoji: '🚗', desc: 'Elegant, refined & comfortable' },
        { value: 'electric',label: 'Electric', emoji: '⚡', desc: 'Eco-friendly & future-ready' },
        { value: 'any',     label: 'Open to anything', emoji: '🤔', desc: 'Surprise me with the best option!' },
      ],
    },
    {
      id: 'seats',
      question: 'How many seats do you need?',
      subtitle: 'Think about who usually rides with you',
      options: [
        { value: '5',   label: '5 Seats',            emoji: '👨‍👩‍👧', desc: 'Perfect for individuals & couples' },
        { value: '7',   label: '7 Seats',            emoji: '👨‍👩‍👧‍👦', desc: 'Ideal for families & groups' },
        { value: 'any', label: 'No preference',      emoji: '🤷', desc: 'Any capacity works for me' },
      ],
    },
    {
      id: 'usage',
      question: 'What is your primary usage?',
      subtitle: 'How will you spend most of your time in this car?',
      options: [
        { value: 'city',      label: 'City Commuting',     emoji: '🏙️', desc: 'Daily drives through busy streets' },
        { value: 'family',    label: 'Family Trips',       emoji: '🏖️', desc: 'Weekend getaways & school runs' },
        { value: 'business',  label: 'Business Use',       emoji: '💼', desc: 'Professional image & comfort' },
        { value: 'adventure', label: 'Adventure & Travel', emoji: '🏔️', desc: 'Off the beaten path, always ready' },
      ],
    },
    {
      id: 'priority',
      question: 'What is your top priority?',
      subtitle: 'This helps us find your perfect match',
      options: [
        { value: 'safety',      label: 'Safety & Security',    emoji: '🛡️', desc: 'Advanced ADAS & 5-star safety' },
        { value: 'performance', label: 'Performance & Power',  emoji: '⚡', desc: 'Turbocharged thrills on demand' },
        { value: 'comfort',     label: 'Comfort & Features',   emoji: '✨', desc: 'Luxury cabin & cutting-edge tech' },
        { value: 'value',       label: 'Value for Money',      emoji: '💯', desc: 'Maximum features per rupiah' },
      ],
    },
  ]

  const getRecommendation = () => {
    let recommended = [...vehicles]
    const { budget, type, seats } = answers

    if (type === 'electric') recommended = recommended.filter(v => v.category === 'ev')
    else if (type === 'suv') recommended = recommended.filter(v => v.category === 'suv')

    if (seats === '7') recommended = recommended.filter(v => v.specs.seats >= 7)

    if (budget === 'under-300')    recommended = recommended.filter(v => v.price < 300_000_000)
    else if (budget === '300-500') recommended = recommended.filter(v => v.price >= 300_000_000 && v.price <= 500_000_000)
    else if (budget === '500-800') recommended = recommended.filter(v => v.price >= 500_000_000 && v.price <= 800_000_000)

    if (recommended.length === 0) recommended = vehicles.slice(0, 3)
    return recommended.slice(0, 3)
  }

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }))
    setDirection(1)
    setTimeout(() => {
      if (currentStep < questions.length - 1) {
        setCurrentStep(prev => prev + 1)
      } else {
        setQuizState('loading')
      }
    }, 280)
  }

  const handleBack = () => {
    if (currentStep === 0) return
    setDirection(-1)
    setTimeout(() => setCurrentStep(prev => prev - 1), 50)
  }

  const resetQuiz = () => {
    setDirection(-1)
    setCurrentStep(0)
    setAnswers({})
    setLoadingMsgIdx(0)
    setQuizState('quiz')
  }

  const recommendations = getRecommendation()
  const progress = ((currentStep + 1) / questions.length) * 100

  // ── Render Loading Screen ─────────────────────────────────────────────
  const LoadingScreen = () => (
    <motion.section
      key="loading"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="section-padding flex items-center justify-center bg-gradient-to-br from-[#0a0a1a] via-[#12102a] to-[#0a0a1a] min-h-[60vh]"
    >
      <div className="text-center px-4">
        {/* Spinning ring */}
        <div className="relative mx-auto mb-10 h-28 w-28">
          <svg className="absolute inset-0 animate-spin" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="44" stroke="rgba(196,30,58,0.15)" strokeWidth="8" />
            <circle
              cx="50" cy="50" r="44"
              stroke="url(#redGrad)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray="138 138"
              strokeDashoffset="100"
            />
            <defs>
              <linearGradient id="redGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C41E3A" />
                <stop offset="100%" stopColor="#E84A5F" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <Car className="h-12 w-12 text-chery-red animate-pulse" />
          </div>
        </div>

        {/* Message */}
        <AnimatePresence mode="wait">
          <motion.div
            key={loadingMsgIdx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-4xl mb-4 block">{loadingMessages[loadingMsgIdx].icon}</span>
            <p className="text-white text-xl font-semibold">{loadingMessages[loadingMsgIdx].text}</p>
          </motion.div>
        </AnimatePresence>

        <p className="mt-4 text-gray-400 text-sm">Analyzing your preferences from {Object.keys(answers).length} answers...</p>

        {/* Dots */}
        <div className="mt-8 flex justify-center gap-2">
          {[0,1,2].map(i => (
            <motion.div
              key={i}
              className="h-2 w-2 rounded-full bg-chery-red"
              animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
            />
          ))}
        </div>
      </div>
    </motion.section>
  )

  // ── Render Results ────────────────────────────────────────────────────
  const ResultsScreen = () => (
    <motion.section
      key="results"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="section-padding bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-chery-red/10 text-chery-red rounded-full px-4 py-2 text-sm font-semibold mb-6">
            <Sparkles className="h-4 w-4" />
            DNA Match Complete
          </div>
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-chery-navy mb-4">
            Your Perfect Match
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Based on your {Object.keys(answers).length} answers, here are our top recommendations handpicked for you.
          </p>
        </motion.div>

        {/* Vehicle Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-14">
          {recommendations.map((vehicle, index) => (
            <motion.div
              key={vehicle.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
              className="relative"
            >
              {index === 0 && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 bg-gradient-to-r from-chery-red to-rose-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg shadow-chery-red/30 whitespace-nowrap">
                  <Trophy className="h-3.5 w-3.5" />
                  Best Match
                </div>
              )}
              <VehicleCard vehicle={vehicle} index={index} />
            </motion.div>
          ))}
        </div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center space-y-4"
        >
          <button
            onClick={resetQuiz}
            className="inline-flex items-center gap-2 btn-secondary text-base"
          >
            <RefreshCw className="h-4 w-4" />
            Retake Quiz
          </button>
          <p className="text-gray-500 text-sm">
            Still unsure?{' '}
            <Link href="/contact" className="text-chery-red font-semibold hover:underline">
              Chat with our expert
            </Link>
          </p>
        </motion.div>
      </div>
    </motion.section>
  )

  // ── Render Quiz ───────────────────────────────────────────────────────
  const QuizScreen = () => (
    <motion.section
      key="quiz"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative section-padding overflow-hidden bg-gradient-to-b from-gray-50 via-white to-white"
    >
      {/* Background blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 left-0 h-96 w-96 rounded-full bg-chery-red/8 blur-3xl" />
        <div className="absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-chery-navy/8 blur-3xl" />
      </div>

      <div className="container-custom relative">
        <div className="mx-auto max-w-2xl">

          {/* ── Stepper ── */}
          <div className="mb-10">
            {/* Step circles + connectors */}
            <div className="flex items-center mb-5">
              {questions.map((q, idx) => (
                <div key={q.id} className="flex items-center flex-1 last:flex-none">
                  {/* Circle */}
                  <motion.div
                    animate={{
                      scale: idx === currentStep ? 1.15 : 1,
                      backgroundColor:
                        idx < currentStep ? '#C41E3A' :
                        idx === currentStep ? '#C41E3A' : '#E5E7EB',
                    }}
                    transition={{ duration: 0.25 }}
                    className={cn(
                      'relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold shadow-sm transition-shadow duration-300',
                      idx <= currentStep ? 'text-white shadow-chery-red/30' : 'text-gray-400'
                    )}
                    style={{
                      boxShadow: idx === currentStep ? '0 0 0 4px rgba(196,30,58,0.18)' : undefined
                    }}
                  >
                    {idx < currentStep
                      ? <CheckCircle2 className="h-5 w-5" />
                      : <span>{idx + 1}</span>
                    }
                  </motion.div>

                  {/* Connector */}
                  {idx < questions.length - 1 && (
                    <div className="relative h-1 flex-1 mx-1 rounded-full bg-gray-200 overflow-hidden">
                      <motion.div
                        className="absolute inset-y-0 left-0 rounded-full bg-chery-red"
                        animate={{ width: idx < currentStep ? '100%' : '0%' }}
                        transition={{ duration: 0.4 }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Progress label */}
            <div className="flex items-center justify-between text-sm font-medium">
              <span className="text-gray-500">Step {currentStep + 1} of {questions.length}</span>
              <span className="text-chery-red font-semibold">{Math.round(progress)}% Complete</span>
            </div>
          </div>

          {/* ── Question Card ── */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentStep}
              custom={direction}
              variants={slideVariants}
              initial={direction === 1 ? 'enterRight' : 'enterLeft'}
              animate="center"
              exit={direction === 1 ? 'exitLeft' : 'exitRight'}
              transition={{ duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="rounded-3xl border border-gray-100 bg-white/95 p-6 shadow-2xl backdrop-blur-sm md:p-10"
              style={{ boxShadow: '0 20px 60px -12px rgba(196,30,58,0.08), 0 8px 32px -8px rgba(0,0,0,0.08)' }}
            >
              {/* Question title */}
              <div className="mb-2 text-center">
                <span className="text-xs font-bold uppercase tracking-widest text-chery-red/70">
                  Question {currentStep + 1}
                </span>
              </div>
              <h2 className="font-heading font-bold text-2xl md:text-3xl text-chery-navy mb-2 text-center leading-tight">
                {questions[currentStep].question}
              </h2>
              <p className="text-center text-gray-400 text-sm mb-8">
                {questions[currentStep].subtitle}
              </p>

              {/* Options */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {questions[currentStep].options.map((option, optIdx) => {
                  const selected = answers[questions[currentStep].id] === option.value
                  return (
                    <motion.button
                      key={option.value}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: optIdx * 0.06 }}
                      onClick={() => handleAnswer(questions[currentStep].id, option.value)}
                      className={cn(
                        'group relative overflow-hidden rounded-2xl border-2 px-5 py-4 text-left transition-all duration-250 focus:outline-none focus:ring-2 focus:ring-chery-red/40',
                        selected
                          ? 'border-chery-red bg-chery-red/5 shadow-md shadow-chery-red/10'
                          : 'border-gray-200 bg-white hover:border-chery-red/50 hover:shadow-md hover:bg-red-50/40'
                      )}
                    >
                      {/* Selected glow layer */}
                      {selected && (
                        <motion.div
                          layoutId="selectedGlow"
                          className="absolute inset-0 rounded-2xl bg-chery-red/5"
                          initial={false}
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                      )}

                      <div className="relative flex items-center gap-4">
                        {/* Emoji */}
                        <span
                          className={cn(
                            'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl transition-all duration-250',
                            selected
                              ? 'bg-chery-red/15 scale-110'
                              : 'bg-gray-100 group-hover:bg-chery-red/10 group-hover:scale-105'
                          )}
                        >
                          {option.emoji}
                        </span>

                        {/* Text */}
                        <div className="flex-1 min-w-0">
                          <p className={cn(
                            'font-semibold text-base transition-colors duration-200',
                            selected ? 'text-chery-red' : 'text-chery-navy group-hover:text-chery-red'
                          )}>
                            {option.label}
                          </p>
                          <p className="text-xs text-gray-400 mt-0.5 truncate">{option.desc}</p>
                        </div>

                        {/* Checkmark */}
                        <AnimatePresence>
                          {selected && (
                            <motion.div
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0, opacity: 0 }}
                              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                              className="shrink-0"
                            >
                              <CheckCircle2 className="h-5 w-5 text-chery-red" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.button>
                  )
                })}
              </div>

              {/* Back button */}
              {currentStep > 0 && (
                <div className="mt-6 flex justify-start">
                  <button
                    onClick={handleBack}
                    className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-chery-red transition-colors duration-200 font-medium"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Previous question
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Tip below card */}
          <p className="mt-5 text-center text-xs text-gray-400">
            💡 Select an option to auto-advance to the next question
          </p>
        </div>
      </div>
    </motion.section>
  )

  // ── Main Render ───────────────────────────────────────────────────────
  return (
    <main className="min-h-screen pt-20">

      {/* ── Hero ── */}
      <section className="relative h-[55vh] min-h-[420px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/find-your-chery-hero.png"
            alt="Find your perfect Chery vehicle"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-chery-navy/70 via-chery-navy/50 to-chery-navy/80" />
        </div>

        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full px-4 py-2 text-sm font-semibold mb-6">
              <Sparkles className="h-4 w-4 text-chery-gold" />
              AI-Powered Matchmaker
            </div>
            <h1 className="font-heading font-bold text-5xl md:text-7xl mb-5 text-white leading-none">
              Find Your
              <span className="block text-gradient-red">Perfect Chery</span>
            </h1>
            <p className="text-lg text-gray-200 max-w-xl mx-auto">
              Answer {questions.length} quick questions — we'll find the Chery made for your life.
            </p>

            {/* Step dots preview */}
            <div className="mt-8 flex items-center justify-center gap-2">
              {questions.map((_, idx) => (
                <div
                  key={idx}
                  className="h-1.5 w-6 rounded-full bg-white/30"
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Quiz / Loading / Results ── */}
      <AnimatePresence mode="wait">
        {quizState === 'quiz'    && <QuizScreen    key="quiz"    />}
        {quizState === 'loading' && <LoadingScreen key="loading" />}
        {quizState === 'results' && <ResultsScreen key="results" />}
      </AnimatePresence>

      {/* ── CTA ── */}
      <section className="section-padding-sm bg-chery-navy text-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-3">
              Ready to Drive Your Match?
            </h2>
            <p className="text-gray-300 mb-8 max-w-xl mx-auto">
              Book a test drive today and experience why Chery is the perfect choice for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary inline-flex items-center gap-2 text-base">
                Book a Test Drive
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/models" className="btn-outline-light inline-flex items-center gap-2 text-base">
                Browse All Models
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  )
}