'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, Users, Fuel, ArrowUpRight, ChevronRight, Eye, ShieldCheck, RotateCcw } from 'lucide-react'
import { Vehicle } from '@/lib/data/vehicles'
import { useState, useRef } from 'react'

interface VehicleCardProps {
  vehicle: Vehicle
  index?: number
}

const categoryConfig: Record<string, { label: string; bg: string; glow: string }> = {
  suv:    { label: 'SUV',    bg: 'rgba(196,30,58,0.90)',  glow: 'rgba(196,30,58,0.45)' },
  hybrid: { label: 'HYBRID', bg: 'rgba(22,163,74,0.90)',  glow: 'rgba(22,163,74,0.45)'  },
  ev:     { label: 'EV',     bg: 'rgba(37,99,235,0.90)',  glow: 'rgba(37,99,235,0.45)'  },
}

type TabType = 'overview' | 'features' | 'highlights'

export default function VehicleCard({ vehicle, index = 0 }: VehicleCardProps) {
  const [imgError, setImgError]     = useState(false)
  const [activeTab, setActiveTab]   = useState<TabType>('overview')
  const [frameIndex, setFrameIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const startX   = useRef(0)
  const accumulated = useRef(0)

  // Gabung image utama + galeri sebagai frame 360°
  const frames = [vehicle.image, ...(vehicle.gallery || [])].filter(Boolean)

  /* ── Drag / Pointer handlers ── */
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    startX.current = e.clientX
    accumulated.current = 0
    setIsDragging(true)
  }

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return
    const delta = e.clientX - startX.current
    accumulated.current += delta
    startX.current = e.clientX
    // Setiap 50px geser → lompat ke frame berikutnya
    if (Math.abs(accumulated.current) >= 50) {
      const step = accumulated.current > 0 ? -1 : 1
      setFrameIndex(prev => (prev + step + frames.length) % frames.length)
      accumulated.current = 0
    }
  }

  const onPointerUp = () => setIsDragging(false)

  /* ── Price formatter ── */
  const formatPrice = (price: number) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price)

  const cat = categoryConfig[vehicle.category] ?? categoryConfig.suv

  /* ── Card entry animation ── */
  const wrapperVariants: any = {
    hidden:  { opacity: 0, y: 32 },
    visible: {
      opacity: 1, y: 0,
      transition: { duration: 0.5, delay: index * 0.06, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  }

  return (
    <motion.div
      variants={wrapperVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className="flex flex-col gap-3"
    >
      {/* ════════════════════════════════════════
          CARD 1 — Vehicle Viewer (dark, image-only)
          ════════════════════════════════════════ */}
      <div
        className={`relative overflow-hidden rounded-[22px] select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        style={{ height: '232px', background: 'linear-gradient(145deg, #0A0A1A 0%, #1A1A2E 60%, #12122A 100%)' }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        {/* Vehicle image — cross-fade on frame change */}
        {!imgError && (
          <AnimatePresence mode="wait">
            <motion.div
              key={frameIndex}
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <Image
                src={frames[frameIndex]}
                alt={`${vehicle.name} view ${frameIndex + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-contain"
                onError={() => setImgError(true)}
                priority={index < 3}
                draggable={false}
              />
            </motion.div>
          </AnimatePresence>
        )}

        {/* Bottom vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />

        {/* ── 360° badge top-left ── */}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 pointer-events-none">
          <span
            className="inline-flex items-center gap-1.5 bg-black/40 backdrop-blur-md text-white text-[10px] font-extrabold tracking-widest uppercase px-3 py-1.5 rounded-full"
            style={{ border: '1px solid rgba(255,255,255,0.15)' }}
          >
            {/* Pulsing dot */}
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E84A5F] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C41E3A]" />
            </span>
            <RotateCcw size={10} />
            360° Drag
          </span>
        </div>

        {/* ── Category badge top-right ── */}
        <div className="absolute top-4 right-4 z-20">
          <span
            className="inline-flex items-center text-[10px] font-extrabold tracking-widest uppercase px-3 py-1.5 rounded-full text-white backdrop-blur-md"
            style={{
              background: cat.bg,
              boxShadow: `0 0 12px ${cat.glow}`,
              border: '1px solid rgba(255,255,255,0.2)',
            }}
          >
            {cat.label}
          </span>
        </div>

        {/* ── Drag hint overlay (appears on hover) ── */}
        <motion.div
          className="absolute bottom-4 inset-x-0 flex justify-center pointer-events-none"
          initial={{ opacity: 0, y: 4 }}
          whileHover={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          <span className="bg-black/55 backdrop-blur-sm text-white/90 text-[10px] font-semibold px-4 py-1.5 rounded-full tracking-wider uppercase">
            ← Drag to Rotate →
          </span>
        </motion.div>

        {/* Frame dots (when multiple frames available) */}
        {frames.length > 1 && (
          <div className="absolute bottom-4 right-4 flex gap-1 pointer-events-none">
            {frames.map((_, i) => (
              <span
                key={i}
                className="w-1.5 h-1.5 rounded-full transition-all duration-200"
                style={{ background: i === frameIndex ? '#C41E3A' : 'rgba(255,255,255,0.35)' }}
              />
            ))}
          </div>
        )}
      </div>

      {/* ════════════════════════════════════════
          CARD 2 — Specs Panel (white, detail info)
          ════════════════════════════════════════ */}
      <div
        className="flex flex-col bg-white rounded-[22px] overflow-hidden"
        style={{
          border: '1px solid rgba(10,10,26,0.07)',
          boxShadow: '0 4px 24px rgba(10,10,26,0.05)',
        }}
      >
        {/* ── Tab switcher row ── */}
        <div className="flex p-1.5 gap-0.5 bg-white border-b border-gray-100">
          {(['overview', 'features', 'highlights'] as TabType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="relative flex-1 py-2 text-[11px] font-extrabold uppercase tracking-widest rounded-[10px] transition-colors text-center"
              style={{ color: activeTab === tab ? '#C41E3A' : '#9CA3AF' }}
            >
              {activeTab === tab && (
                <motion.div
                  layoutId={`tab-pill-${vehicle.id}`}
                  className="absolute inset-0 bg-white rounded-[10px]"
                  style={{
                    boxShadow: '0 1px 6px rgba(10,10,26,0.10)',
                    border: '1px solid rgba(10,10,26,0.06)',
                    zIndex: 0,
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative z-10">{tab}</span>
            </button>
          ))}
        </div>

        {/* ── Main content ── */}
        <div className="flex flex-col p-5" style={{ minHeight: '200px' }}>

          {/* Name + arrow */}
          <div className="flex items-start justify-between mb-3">
            <Link href={`/models/${vehicle.slug}`}>
              <h3 className="font-heading font-extrabold text-[1.25rem] text-[#0A0A1A] leading-tight hover:text-[#C41E3A] transition-colors duration-200">
                {vehicle.name}
              </h3>
            </Link>
            <Link
              href={`/models/${vehicle.slug}`}
              className="flex-shrink-0 ml-2 mt-0.5 text-[#C41E3A] hover:scale-110 transition-transform"
            >
              <ArrowUpRight size={17} />
            </Link>
          </div>

          {/* Dynamic tab content */}
          <div className="flex-1 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.15 }}
              >
                {/* ── OVERVIEW ── */}
                {activeTab === 'overview' && (
                  <div className="space-y-3">
                    {/* Spec pills */}
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        { icon: <Zap size={10} className="text-[#C41E3A]" />,   label: vehicle.specs.power },
                        { icon: <Users size={10} className="text-[#C41E3A]" />, label: `${vehicle.specs.seats} Seats` },
                        { icon: <Fuel size={10} className="text-[#C41E3A]" />,  label: vehicle.specs.fuelType },
                      ].map((pill) => (
                        <span
                          key={pill.label}
                          className="inline-flex items-center gap-1.5 text-[11px] font-bold text-gray-700 bg-[#F4F4F6] rounded-full px-2.5 py-[5px]"
                          style={{ border: '1px solid rgba(10,10,26,0.06)' }}
                        >
                          {pill.icon}
                          {pill.label}
                        </span>
                      ))}
                    </div>
                    {/* Engine / Trans row */}
                    <div className="flex gap-6 text-[12px] text-gray-500">
                      <span>
                        Engine: <strong className="text-gray-800">{vehicle.specs.engine}</strong>
                      </span>
                      <span>
                        Trans: <strong className="text-gray-800">{vehicle.specs.transmission}</strong>
                      </span>
                    </div>
                  </div>
                )}

                {/* ── FEATURES ── */}
                {activeTab === 'features' && (
                  <ul className="space-y-1.5">
                    {vehicle.features.slice(0, 4).map((feat, i) => (
                      <li key={i} className="flex items-center gap-2 text-[12px] text-gray-600">
                        <span className="w-1 h-1 rounded-full bg-[#C41E3A] flex-shrink-0" />
                        {feat}
                      </li>
                    ))}
                    {vehicle.features.length > 4 && (
                      <li className="flex items-center gap-1.5 text-[11px] text-[#C41E3A] font-bold mt-1">
                        <Eye size={10} /> +{vehicle.features.length - 4} more features
                      </li>
                    )}
                  </ul>
                )}

                {/* ── HIGHLIGHTS ── */}
                {activeTab === 'highlights' && (
                  <ul className="space-y-2">
                    {vehicle.highlights.map((h, i) => (
                      <li key={i} className="flex items-center gap-2 text-[12px] text-gray-700 font-medium">
                        <ShieldCheck size={13} className="text-emerald-500 flex-shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Divider ── */}
          <div className="h-px bg-gray-100 my-4" />

          {/* ── Price + CTA ── */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-0.5">
                Starting from
              </p>
              <p className="font-heading font-extrabold text-[1.15rem] text-[#C41E3A] leading-none">
                {formatPrice(vehicle.price)}
              </p>
            </div>

            <div className="flex gap-2">
              {/* Book — ghost */}
              <Link
                href={`/contact?model=${vehicle.slug}`}
                className="inline-flex items-center justify-center text-[12px] font-bold text-[#C41E3A] bg-white rounded-full px-4 py-2 transition-all duration-200 hover:bg-[#C41E3A]/5"
                style={{ border: '1.5px solid rgba(196,30,58,0.3)' }}
              >
                Book
              </Link>

              {/* Details — solid */}
              <Link
                href={`/models/${vehicle.slug}`}
                className="inline-flex items-center gap-0.5 justify-center text-[12px] font-bold text-white rounded-full px-4 py-2 transition-all duration-200 hover:brightness-110"
                style={{
                  background: 'linear-gradient(135deg, #C41E3A 0%, #A01830 100%)',
                  boxShadow: '0 4px 14px rgba(196,30,58,0.25)',
                }}
              >
                Details
                <ChevronRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}