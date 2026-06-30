'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { getActiveVehicleLineup } from '@/lib/data/vehicleLineup'
import { VehicleLineupItem } from '@/types/vehicleLineup'

export default function VehicleLineupShowcase() {
  const [vehicles, setVehicles] = useState<VehicleLineupItem[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [imageError, setImageError] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    const data = getActiveVehicleLineup()
    setVehicles(data)
  }, [])

  const activeVehicle = vehicles[currentIndex]

  const goToPrevious = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setImageError(false)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + vehicles.length) % vehicles.length)
      setIsTransitioning(false)
    }, 300)
  }

  const goToNext = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setImageError(false)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % vehicles.length)
      setIsTransitioning(false)
    }, 300)
  }

  if (vehicles.length === 0) {
    return (
      <section className="section-padding bg-surface-muted">
        <div className="container-custom">
          <p className="text-text-secondary text-center">Loading vehicle lineup...</p>
        </div>
      </section>
    )
  }

  return (
    <section className="section-padding bg-surface-muted relative overflow-hidden">
      {/* Title & Explanation Header */}
      <div className="text-center max-w-4xl mx-auto mb-20 px-4 relative z-10">
        <span className="inline-block bg-chery-red/10 text-chery-red px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider mb-4">
          Chery Future Innovation
        </span>
        <h2 className="font-heading font-bold text-4xl md:text-6xl lg:text-7xl text-gray-900 leading-tight mb-4">
          {activeVehicle.model_name}
        </h2>
        <p className="text-chery-red font-semibold text-base md:text-lg mt-3 uppercase tracking-wide">
          {activeVehicle.category}
        </p>
        <p className="text-gray-600 text-base md:text-lg mt-6 max-w-2xl mx-auto leading-relaxed">
          Temukan standar baru berkendara dengan kombinasi desain futuristik, performa tangguh, dan integrasi teknologi cerdas.
        </p>
      </div>

      {/* Navigation Arrows */}
      {vehicles.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl text-gray-700 hover:text-chery-red transition-all active:scale-95 border border-gray-100"
            aria-label="Previous vehicle"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl text-gray-700 hover:text-chery-red transition-all active:scale-95 border border-gray-100"
            aria-label="Next vehicle"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Main Vehicle Showcase Area */}
      <div className="relative max-w-5xl mx-auto mb-16 px-4">
        {/* Watermark Text - Behind Vehicle */}
        <div className="absolute inset-0 flex items-end justify-center pb-[60px] md:pb-[85px] pointer-events-none overflow-visible">
          <AnimatePresence mode="wait">
            <motion.div
              key={"watermark-" + activeVehicle.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="text-center"
            >
              <h2 
                className="font-heading font-bold text-gray-800/10 select-none"
                style={{
                  fontSize: activeVehicle.watermark_text.length > 10 
                    ? 'clamp(3rem, 9vw, 8rem)' 
                    : activeVehicle.watermark_text.length > 6 
                      ? 'clamp(4rem, 12vw, 10rem)' 
                      : 'clamp(4rem, 16vw, 13rem)',
                  lineHeight: '1',
                  letterSpacing: '-0.02em',
                  whiteSpace: 'nowrap',
                }}
              >
                {activeVehicle.watermark_text}
              </h2>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Vehicle Image */}
        <motion.div
          key={activeVehicle.id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="relative flex items-center justify-center mt-8"
        >
          {!imageError ? (
            <Image
              src={activeVehicle.vehicle_side_image_desktop}
              alt={activeVehicle.model_name + " side view"}
              width={1000}
              height={500}
              className="object-contain w-auto h-auto max-w-[70%] max-h-[150px] md:max-h-[200px] transition-transform duration-300"
              priority
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
              <p className="text-lg font-medium">Vehicle image coming soon</p>
              <p className="text-sm mt-2">We are preparing an exclusive reveal</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Model Tabs */}
      <div className="flex justify-center items-center gap-2 mb-8">
        {vehicles.map((vehicle, index) => (
          <button
            key={vehicle.id}
            onClick={() => {
              if (!isTransitioning) {
                setImageError(false)
                setCurrentIndex(index)
              }
            }}
            className={`px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 ${
              currentIndex === index
                ? 'bg-chery-red text-white shadow-lg shadow-chery-red/25'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            {vehicle.logo_text}
          </button>
        ))}
      </div>

      {/* Specifications */}
      <motion.div
        key={"specs-" + activeVehicle.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-5xl mx-auto mb-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* Power */}
          <div className="text-center">
            <p className="text-text-muted text-sm mb-2 tracking-wide">
              {activeVehicle.power_label}
            </p>
            <p className="font-heading font-bold text-3xl md:text-4xl text-text-primary">
              {activeVehicle.power_value}
            </p>
          </div>

          {/* Torque */}
          <div className="text-center border-x border-gray-100 px-4">
            <p className="text-text-muted text-sm mb-2 tracking-wide">
              {activeVehicle.torque_label}
            </p>
            <p className="font-heading font-bold text-3xl md:text-4xl text-text-primary">
              {activeVehicle.torque_value}
            </p>
          </div>

          {/* Dimensions */}
          <div className="text-center">
            <p className="text-text-muted text-sm mb-2 tracking-wide">
              {activeVehicle.dimension_label}
            </p>
            <p className="font-heading font-bold text-2xl md:text-3xl text-text-primary">
              {activeVehicle.dimension_value}
            </p>
          </div>
        </div>
      </motion.div>

      {/* CTA Button */}
      <div className="text-center">
        <a
          href={activeVehicle.cta_link}
          className="inline-flex items-center gap-2 px-8 py-4 bg-white text-chery-red border-2 border-chery-red rounded-full font-bold text-lg hover:bg-chery-red hover:text-white transition-all duration-300 group"
        >
          {activeVehicle.cta_text}
          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </section>
  )
}
