'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'

const lifestyleItems = [
  {
    title: 'Family Adventures',
    image: '/images/lifestyle/family-adventures.png',
    link: '/find-your-chery',
  },
  {
    title: 'City Driving',
    image: '/images/lifestyle/city-driving.png',
    link: '/find-your-chery',
  },
  {
    title: 'Adventure Bound',
    image: '/images/lifestyle/adventure-bound.png',
    link: '/find-your-chery',
  },
  {
    title: 'Business Premium',
    image: '/images/lifestyle/business-premium.png',
    link: '/find-your-chery',
  },
]

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
  }),
}

export default function LifestyleGrid() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(1)

  useEffect(() => {
    const timer = setTimeout(() => {
      handleNext()
    }, 5000)
    return () => clearTimeout(timer)
  }, [currentIndex])

  const handleNext = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % lifestyleItems.length)
  }

  const handlePrev = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + lifestyleItems.length) % lifestyleItems.length)
  }

  const handleSelect = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
  }

  return (
    <section className="section-padding bg-gray-50 border-t border-gray-100">
      <div className="container-custom">
        <div className="text-center mb-12">
          <span className="badge-red mb-4">Chery Lifestyle</span>
          <h2 className="font-heading font-bold text-4xl md:text-5xl lg:text-h2 text-text-primary mb-4">
            Designed for Your Life
          </h2>
          <p className="text-body-l text-text-secondary max-w-2xl mx-auto">
            From family road trips to daily commutes, Chery fits seamlessly into every aspect of your lifestyle.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative w-full max-w-5xl mx-auto px-4 md:px-12 flex items-center justify-center">
          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-0 md:left-2 z-10 w-10 h-10 md:w-12 md:h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center border border-gray-100 shadow-md hover:shadow-lg text-gray-600 hover:text-chery-red active:scale-95 transition-all outline-none"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Slide Window */}
          <div className="w-full overflow-hidden rounded-3xl bg-white shadow-xl border border-gray-100/50 relative">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'tween', ease: [0.25, 1, 0.5, 1], duration: 0.6 },
                  opacity: { duration: 0.4 },
                }}
                className="w-full"
              >
                <Link href={lifestyleItems[currentIndex].link} className="block group">
                  <div className="relative overflow-hidden w-full">
                    <img
                      src={lifestyleItems[currentIndex].image}
                      alt={lifestyleItems[currentIndex].title}
                      className="w-full h-auto object-cover transform group-hover:scale-[1.01] transition-transform duration-700"
                    />
                  </div>
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-0 md:right-2 z-10 w-10 h-10 md:w-12 md:h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center border border-gray-100 shadow-md hover:shadow-lg text-gray-600 hover:text-chery-red active:scale-95 transition-all outline-none"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Indicators and Interactive Progress Bar */}
        <div className="flex justify-center items-center gap-3 mt-8">
          {lifestyleItems.map((item, index) => (
            <button
              key={item.title}
              onClick={() => handleSelect(index)}
              className={`h-2 rounded-full transition-all relative overflow-hidden outline-none ${
                currentIndex === index ? 'w-12 bg-gray-200' : 'w-2 bg-gray-300 hover:bg-gray-400'
              }`}
              title={item.title}
            >
              {currentIndex === index && (
                <motion.div
                  key={`progress-${index}`}
                  className="absolute inset-0 bg-chery-red origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 5, ease: 'linear' }}
                />
              )}
            </button>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/find-your-chery"
            className="btn-primary inline-flex items-center text-lg group"
          >
            Find Your Chery Lifestyle
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}