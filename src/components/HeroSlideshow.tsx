'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface HeroSlide {
  id: string
  type: string
  title?: string
  subtitle?: string
  description?: string
  mediaUrl: string
  ctaLabel?: string
  ctaUrl?: string
  order: number
  active: boolean
  startDate?: string
  endDate?: string
  duration?: number
}

export default function HeroSlideshow() {
  const [slides, setSlides] = useState<HeroSlide[]>([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/hero-slides')
      .then(res => res.json())
      .then(data => {
        const now = new Date()
        const activeSlides = data.filter((slide: HeroSlide) => {
          if (!slide.active) return false
          
          // Check date range
          if (slide.startDate && new Date(slide.startDate) > now) return false
          if (slide.endDate && new Date(slide.endDate) < now) return false
          
          return true
        })
        setSlides(activeSlides.sort((a: HeroSlide, b: HeroSlide) => a.order - b.order))
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching slides:', err)
        setLoading(false)
      })

    // Poll for slides every 10 seconds to pick up new slides
    const pollInterval = setInterval(() => {
      fetch('/api/hero-slides')
        .then(res => res.json())
        .then(data => {
          const now = new Date()
          const activeSlides = data.filter((slide: HeroSlide) => {
            if (!slide.active) return false
            
            // Check date range
            if (slide.startDate && new Date(slide.startDate) > now) return false
            if (slide.endDate && new Date(slide.endDate) < now) return false
            
            return true
          })
          const sortedSlides = activeSlides.sort((a: HeroSlide, b: HeroSlide) => a.order - b.order)
          
          // Always update - React will handle re-renders efficiently
          setSlides(sortedSlides)
        })
        .catch(err => {
          console.error('Error polling slides:', err)
        })
    }, 10000) // Poll every 10 seconds

    return () => clearInterval(pollInterval)
  }, [])

  useEffect(() => {
    if (slides.length > 1) {
      const currentSlideData = slides[currentSlide]
      const duration = currentSlideData.duration || 6000 // Use slide-specific duration, fallback to 6s
      
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
      }, duration)
      return () => clearInterval(timer)
    }
  }, [slides.length, currentSlide, slides])


  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gray-900">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  if (slides.length === 0) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gray-900">
        <div className="text-white">No slides available</div>
      </div>
    )
  }

  const slide = slides[currentSlide]

  const contentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
        staggerChildren: 0.2,
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut' as const
      }
    }
  }

  // Check if slide is COPY type (text only, no media)
  const isCopySlide = slide.type === 'COPY'

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Slide Content */}
      <div className="absolute inset-0">
        {slide.type === 'VIDEO' ? (
          <video
            key={slide.id}
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={slide.mediaUrl} type="video/mp4" />
          </video>
        ) : slide.mediaUrl ? (
          <img
            key={slide.id}
            src={slide.mediaUrl}
            alt={slide.title || 'Hero slide'}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-chery-navy to-chery-navy/90" />
        )}
        
        {/* Overlay - lighter for COPY slides */}
        <div className={`absolute inset-0 ${isCopySlide ? 'bg-chery-navy/40' : 'bg-gradient-to-r from-black/70 via-black/50 to-transparent'}`} />
      </div>

      {/* Content */}
      <div className={`relative z-10 h-full flex ${isCopySlide ? 'items-center justify-center' : 'items-center'}`}>
        <div className={`container mx-auto px-6 ${isCopySlide ? 'text-center max-w-4xl' : ''}`}>
          <motion.div
            key={slide.id}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            className={isCopySlide ? 'flex flex-col items-center' : 'max-w-3xl'}
          >
            {slide.title && (
              <motion.h1 
                variants={itemVariants}
                className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
              >
                {slide.title}
              </motion.h1>
            )}
            {slide.subtitle && (
              <motion.p 
                variants={itemVariants}
                className="text-xl md:text-2xl text-white/90 mb-4"
              >
                {slide.subtitle}
              </motion.p>
            )}
            {slide.description && (
              <motion.p 
                variants={itemVariants}
                className="text-base md:text-lg text-white/80 mb-8 leading-relaxed"
              >
                {slide.description}
              </motion.p>
            )}
            {slide.ctaLabel && slide.ctaUrl && (
              <motion.a
                variants={itemVariants}
                href={slide.ctaUrl}
                className="inline-flex items-center gap-2 px-8 py-4 bg-chery-red text-white rounded-lg font-semibold hover:bg-chery-red-dark transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {slide.ctaLabel}
              </motion.a>
            )}
          </motion.div>
        </div>
      </div>

      {/* Navigation Dots */}
      {slides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-white w-8'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Scroll Indicator */}
      {!isCopySlide && (
        <div className="absolute bottom-8 right-8 z-20 text-white/70 text-sm animate-bounce">
          SCROLL
        </div>
      )}
    </div>
  )
}
