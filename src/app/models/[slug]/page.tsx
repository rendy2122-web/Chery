'use client'

import { useState } from 'react'
import { notFound } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Shield, Check, Calendar, Phone, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { getVehicleBySlug } from '@/lib/data/vehicles'
import { cn } from '@/lib/utils/cn'

// ── Enriched per-model data ──────────────────────────────────────────────────
interface ModelData {
  tagline: string
  intro: string
  powerLabel: string
  powerStat: string
  powerUnit: string
  torqueLabel: string
  torqueStat: string
  torqueUnit: string
  rangeLabel: string
  rangeStat: string
  rangeUnit: string
  driveLabel: string
  driveStat: string
  accelLabel: string
  accelStat: string
  interiorTitle: string
  interiorDesc: string
  interiorImages: string[]
  interiorFeatures: string[]
  exteriorTitle: string
  exteriorTagline: string
  exteriorDesc: string
  exteriorImages: string[]
  adasCount: number
  adas: { icon: string; name: string; desc: string }[]
  colors: { name: string; hex: string; css: string }[]
}

const modelRegistry: Record<string, ModelData> = {
  'omoda-5': {
    tagline: 'THE FUTURISTIC, AERODYNAMIC CROSSOVER SUV',
    intro: 'Bring your youth spirit to every road. The CHERY OMODA 5 combines sporty proportions with intelligent connectivity, built to match your ambition and lifestyle.',
    powerLabel: 'Maximum Power (PS)',
    powerStat: '156',
    powerUnit: 'PS',
    torqueLabel: 'Maximum Torque (Nm)',
    torqueStat: '230',
    torqueUnit: 'Nm',
    rangeLabel: 'Engine',
    rangeStat: '1.5L Turbo',
    rangeUnit: '',
    driveLabel: 'Penggerak Roda',
    driveStat: 'FWD',
    accelLabel: 'Akselerasi (0-100 km/h)',
    accelStat: '8.4 s',
    interiorTitle: 'SIMPLE TO USE, FUN TO EXPLORE',
    interiorDesc: 'Step into the cockpit of tomorrow. Dual 10.25-inch screens, customizable ambient lighting, wireless charging, and acoustic laminated glass ensure an immersive and whisper-quiet driving experience.',
    interiorImages: ['/images/vehicles/omoda-5-1.jpg', '/images/vehicles/omoda-5-2.jpg', '/images/vehicles/omoda-5-3.jpg'],
    interiorFeatures: ['10.25" Touchscreen Display', 'Digital Instrument Cluster', 'Wireless Charging', 'Premium Sound System'],
    exteriorTitle: 'UNIQUE FUTURISTIC DESIGN',
    exteriorTagline: 'ONE-PIECE DIAMOND MATRIX GRILLE',
    exteriorDesc: 'CHERY OMODA 5 stands out with its signature aerodynamic body shape — a unique design that reflects dynamism, fits every lifestyle, and fulfills every ambition.',
    exteriorImages: ['/images/vehicles/omoda-5-4.jpg', '/images/vehicles/omoda-5-1.jpg', '/images/vehicles/omoda-5-2.jpg'],
    adasCount: 6,
    adas: [
      { icon: '🛡️', name: 'Adaptive Cruise Control', desc: 'Maintains safe cruising distance automatically' },
      { icon: '🚗', name: 'Lane Departure Warning', desc: 'Alerts when vehicle drifts from lane boundaries' },
      { icon: '⚡', name: 'Autonomous Emergency Braking', desc: 'Applies brakes automatically to prevent collision' },
      { icon: '👁️', name: 'Blind Spot Detection', desc: 'Warns of vehicles entering blind spot zones' },
      { icon: '🚦', name: 'Traffic Jam Assist', desc: 'Semi-autonomous assistance in slow traffic' },
      { icon: '💡', name: 'High Beam Assist', desc: 'Auto-dims headlights for oncoming vehicles' },
    ],
    colors: [
      { name: 'Phantom Black', hex: '#1a1a1a', css: 'brightness-[0.35] contrast-[1.2]' },
      { name: 'Space Silver', hex: '#9CA3AF', css: 'grayscale brightness-[0.9]' },
      { name: 'Glacier White', hex: '#F3F4F6', css: 'brightness-[1.2] saturate-[0.4]' },
      { name: 'Racing Red', hex: '#C41E3A', css: 'hue-rotate-[340deg] saturate-[2.2] brightness-[0.95]' },
    ],
  },
  'tiggo-5x': {
    tagline: 'THE SMART, COMPACT URBAN CROSSOVER',
    intro: 'Compact size with giant capability. The CHERY TIGGO 5x is tailored for youngsters and young families — packed with digital features and premium cabin touches at an accessible price.',
    powerLabel: 'Maximum Power (PS)',
    powerStat: '116',
    powerUnit: 'PS',
    torqueLabel: 'Maximum Torque (Nm)',
    torqueStat: '143',
    torqueUnit: 'Nm',
    rangeLabel: 'Engine',
    rangeStat: '1.5L NA',
    rangeUnit: '',
    driveLabel: 'Penggerak Roda',
    driveStat: 'FWD',
    accelLabel: 'Akselerasi (0-100 km/h)',
    accelStat: '11.2 s',
    interiorTitle: 'SPORTY COMPACT COCKPIT',
    interiorDesc: 'Clean ergonomic center console with a 10.25-inch infotainment screen, multi-functional leather steering wheel, and red contrast stitch finishing — every detail crafted for the modern driver.',
    interiorImages: ['/images/vehicles/tiggo-5x.jpg', '/images/vehicles/omoda-5-1.jpg'],
    interiorFeatures: ['10.25" Infotainment Screen', 'Rear Camera', 'Keyless Entry', 'Push Start Button'],
    exteriorTitle: 'UNIQUE BOLD CROSSOVER DESIGN',
    exteriorTagline: 'DYNAMIC URBAN PRESENCE',
    exteriorDesc: 'CHERY TIGGO 5x stands out with its sleek dark wheel arches, a dynamic front grille, and silver protective bumper accents that create an agile and confident visual character.',
    exteriorImages: ['/images/vehicles/tiggo-5x.jpg', '/images/vehicles/omoda-5-3.jpg'],
    adasCount: 4,
    adas: [
      { icon: '🅿️', name: 'Rear Parking Sensors', desc: 'Acoustic guidance for easy urban parking' },
      { icon: '🛡️', name: 'Electronic Stability Control', desc: 'Maintains optimal road grip in rain and turns' },
      { icon: '⛰️', name: 'Hill Descent Control', desc: 'Manages braking safely on steep declines' },
      { icon: '🔒', name: 'ABS + EBD', desc: 'Anti-lock braking with electronic brake distribution' },
    ],
    colors: [
      { name: 'Pure White', hex: '#FFFFFF', css: 'brightness-[1.2] saturate-[0.4]' },
      { name: 'Carbon Black', hex: '#111827', css: 'brightness-[0.35]' },
      { name: 'Sunset Orange', hex: '#EA580C', css: 'hue-rotate-[20deg] saturate-[2.8]' },
    ],
  },
  'tiggo-7-pro': {
    tagline: 'THE URBAN PREMIUM MID-SIZE SUV',
    intro: 'A stylish and tech-forward SUV crafted for modern city discoverers. Navigate urban landscapes with intelligent connectivity, cutting-edge safety, and premium passenger comforts.',
    powerLabel: 'Maximum Power (PS)',
    powerStat: '197',
    powerUnit: 'PS',
    torqueLabel: 'Maximum Torque (Nm)',
    torqueStat: '290',
    torqueUnit: 'Nm',
    rangeLabel: 'Engine',
    rangeStat: '1.6L Turbo',
    rangeUnit: '',
    driveLabel: 'Transmisi',
    driveStat: '7-Speed DCT',
    accelLabel: 'Akselerasi (0-100 km/h)',
    accelStat: '8.2 s',
    interiorTitle: 'MODERN INTELLIGENT COCKPIT',
    interiorDesc: 'A panoramic sunroof floods the cabin with natural light, while the 12.3-inch dual-screen setup and standard wireless charging simplify every smart journey you take.',
    interiorImages: ['/images/vehicles/tiggo-7-pro-1.jpg', '/images/vehicles/tiggo-7-pro-2.jpg', '/images/vehicles/tiggo-7-pro-3.jpg'],
    interiorFeatures: ['12.3" Digital Instrument Cluster', '12.3" Infotainment Screen', 'Panoramic Sunroof', 'Premium Leather Seats'],
    exteriorTitle: 'UNIQUE DYNAMIC STREAMLINED STYLE',
    exteriorTagline: 'DUAL-PERSPECTIVE MATRIX LED DESIGN',
    exteriorDesc: 'CHERY TIGGO 7 PRO stands out with dual-perspective design highlights, matrix LED headlights, and a sculpted double-tier spoiler that optimizes high-speed aerodynamic efficiency.',
    exteriorImages: ['/images/vehicles/tiggo-7-pro-3.jpg', '/images/vehicles/tiggo-7-pro-1.jpg'],
    adasCount: 5,
    adas: [
      { icon: '🚘', name: 'Adaptive Cruise Control', desc: 'Intelligent speed adjustment to traffic flow' },
      { icon: '👁️', name: 'Blind Spot Detection', desc: 'Continuous sensor monitoring of blind angles' },
      { icon: '🛣️', name: 'Lane Keeping Assist', desc: 'Ensures vehicle remains safely inside lane lines' },
      { icon: '💡', name: 'High Beam Assist', desc: 'Automatically dims for oncoming drivers' },
      { icon: '⚡', name: 'Autonomous Emergency Braking', desc: 'Applies full brakes in imminent collision zones' },
    ],
    colors: [
      { name: 'Crimson Red', hex: '#B91C1C', css: 'hue-rotate-[340deg] saturate-[2.2]' },
      { name: 'Polar White', hex: '#F9FAFB', css: 'brightness-[1.2]' },
      { name: 'Titanium Grey', hex: '#4B5563', css: 'grayscale brightness-[0.75]' },
      { name: 'Midnight Navy', hex: '#1E3A8A', css: 'hue-rotate-[220deg] saturate-[1.6]' },
    ],
  },
  'tiggo-8-pro': {
    tagline: 'THE FLAGSHIP 7-SEATER LUXURY SUV',
    intro: 'Experience ultimate power and luxury. The CHERY TIGGO 8 PRO is designed for family leaders who demand superior performance, spacious premium comfort, and peak intelligent technology.',
    powerLabel: 'Maximum Power (PS)',
    powerStat: '254',
    powerUnit: 'PS',
    torqueLabel: 'Maximum Torque (Nm)',
    torqueStat: '390',
    torqueUnit: 'Nm',
    rangeLabel: 'Engine',
    rangeStat: '2.0L Turbo',
    rangeUnit: '',
    driveLabel: 'Penggerak Roda',
    driveStat: 'FWD / AWD',
    accelLabel: 'Akselerasi (0-100 km/h)',
    accelStat: '7.3 s',
    interiorTitle: 'FIRST-CLASS LAND FLIGHT CABIN',
    interiorDesc: 'Indulge in imperial luxury with double-layer laminated noise reduction glass, premium soft-touch Nappa leather seating for all seven occupants, and Sony premium surround audio system.',
    interiorImages: ['/images/vehicles/tiggo-8-pro-1.jpg', '/images/vehicles/tiggo-8-pro-2.jpg', '/images/vehicles/tiggo-8-pro-3.jpg'],
    interiorFeatures: ['24.6" Curved Display', 'Sony Premium Sound', 'Nappa Leather Seats', 'Wireless Charging All Rows'],
    exteriorTitle: 'UNIQUE ROYAL IMPERIAL FRONT FACE',
    exteriorTagline: 'GEOMETRIC MATRIX DIAMOND GRILLE',
    exteriorDesc: 'CHERY TIGGO 8 PRO stands out with a powerful wide stance. The geometric matrix diamond grille combined with precision split LED headlights projects luxury, confidence, and absolute leadership.',
    exteriorImages: ['/images/vehicles/tiggo-8-pro-3.jpg', '/images/vehicles/tiggo-8-pro-1.jpg'],
    adasCount: 6,
    adas: [
      { icon: '🚦', name: 'Traffic Sign Recognition', desc: 'Detects and alerts speed limits automatically' },
      { icon: '🔄', name: 'Rear Cross Traffic Alert', desc: 'Warns of vehicles passing behind when reversing' },
      { icon: '🚪', name: 'Door Opening Warning', desc: 'Prevents doors from opening into oncoming traffic' },
      { icon: '🚘', name: 'Adaptive Cruise Control', desc: 'Intelligent distance and lane management' },
      { icon: '⚡', name: 'Auto Emergency Braking', desc: 'Protects all passengers and pedestrians' },
      { icon: '⚠️', name: 'Front Collision Warning', desc: 'Issues timely sound and visual alerts ahead' },
    ],
    colors: [
      { name: 'Imperial Black', hex: '#111827', css: 'brightness-[0.35] contrast-[1.3]' },
      { name: 'Luxury Silver', hex: '#6B7280', css: 'grayscale brightness-[0.9]' },
      { name: 'Royal Blue', hex: '#1E3A8A', css: 'hue-rotate-[220deg] saturate-[1.6]' },
      { name: 'Glacier White', hex: '#F3F4F6', css: 'brightness-[1.2]' },
    ],
  },
  'tiggo-8-pro-hybrid': {
    tagline: 'THE POWERFUL PLUG-IN HYBRID 7-SEATER',
    intro: 'Uncompromised efficiency meets high performance. The CHERY TIGGO 8 PRO HYBRID provides zero-emission urban commuting combined with unlimited cross-country freedom on a single tank.',
    powerLabel: 'Maximum Power (PS)',
    powerStat: '190',
    powerUnit: 'PS',
    torqueLabel: 'Maximum Torque (Nm)',
    torqueStat: '310',
    torqueUnit: 'Nm',
    rangeLabel: 'EV Range',
    rangeStat: '50 km',
    rangeUnit: 'electric only',
    driveLabel: 'Sistem Penggerak',
    driveStat: 'Plug-in Hybrid',
    accelLabel: 'Akselerasi (0-100 km/h)',
    accelStat: '7.9 s',
    interiorTitle: 'SUSTAINABLE LUXURY CABIN',
    interiorDesc: 'Premium HEPA air filtration, soft-touch vegan leather stitching, and the near-silent electric drive mode create a peaceful and eco-conscious haven for your entire family.',
    interiorImages: ['/images/vehicles/tiggo-8-pro-hybrid-1.jpg', '/images/vehicles/tiggo-8-pro-hybrid-2.jpg'],
    interiorFeatures: ['24.6" Curved Display', 'Regenerative Braking', 'Nappa Leather Seats', 'Wireless Charging All Rows'],
    exteriorTitle: 'UNIQUE ECOLOGICAL PREMIUM DESIGN',
    exteriorTagline: 'HYBRID IDENTITY & AERODYNAMIC RIMS',
    exteriorDesc: 'CHERY TIGGO 8 PRO HYBRID stands out with its blue hybrid badging, distinctive charging port door, and aerodynamically optimized light-alloy rims that highlight eco-friendly luxury ownership.',
    exteriorImages: ['/images/vehicles/tiggo-8-pro-hybrid-1.jpg', '/images/vehicles/tiggo-8-pro-hybrid-2.jpg'],
    adasCount: 4,
    adas: [
      { icon: '🔋', name: 'Regenerative Braking Assist', desc: 'Recovers energy seamlessly during deceleration' },
      { icon: '🚘', name: 'Adaptive Cruise Control', desc: 'Eco-routing cruise dynamics for maximum range' },
      { icon: '🛣️', name: 'Lane Departure Prevention', desc: 'Actively steers vehicle back to center' },
      { icon: '🚪', name: 'Door Opening Warning', desc: 'Audible sensor feedback for cyclist safety' },
    ],
    colors: [
      { name: 'Pearl White', hex: '#F9FAFB', css: 'brightness-[1.1]' },
      { name: 'Midnight Blue', hex: '#1E293B', css: 'hue-rotate-[210deg] brightness-[0.4]' },
      { name: 'Titanium Silver', hex: '#9CA3AF', css: 'grayscale brightness-[0.9]' },
    ],
  },
  'eq1': {
    tagline: 'THE RETRO-STYLISH, BOXY ELECTRIC CITY CAR',
    intro: 'Bring joy to every ride in the CHERY eQ1 — a 100% electric retro-style car with a bold BOXY design, built to match your journey, your personality, and your unique style.',
    powerLabel: 'Maximum Power (PS)',
    powerStat: '54',
    powerUnit: 'PS',
    torqueLabel: 'Maximum Torque (Nm)',
    torqueStat: '150',
    torqueUnit: 'Nm',
    rangeLabel: 'Jarak (NEDC)',
    rangeStat: '300 km',
    rangeUnit: '',
    driveLabel: 'Penggerak Roda',
    driveStat: 'RWD',
    accelLabel: 'Akselerasi (0-100 km/h)',
    accelStat: '12.5 s',
    interiorTitle: 'SIMPLE TO USE, FUN TO EXPLORE',
    interiorDesc: 'Everyday controls stay simple with real physical buttons, while the big vertical touchscreen lets you explore entertainment and vehicle settings in a playful, intuitive, and fun way.',
    interiorImages: ['/images/vehicles/eq1-1.jpg', '/images/vehicles/eq1-2.jpg'],
    interiorFeatures: ['10" Touchscreen Display', 'Digital Instrument Cluster', 'Regenerative Braking', 'Remote Climate Control'],
    exteriorTitle: 'UNIQUE BOXY DESIGN',
    exteriorTagline: 'SIGNATURE BOXY BODY SHAPE',
    exteriorDesc: 'CHERY eQ1 stands out with its signature boxy shape — a unique design philosophy that reflects playfulness, fits every lifestyle, and fulfills every urban function.',
    exteriorImages: ['/images/vehicles/eq1-1.jpg', '/images/vehicles/eq1-2.jpg'],
    adasCount: 4,
    adas: [
      { icon: '⚡', name: 'Collision Mitigation System', desc: 'Monitors front distance and applies emergency brakes' },
      { icon: '🔒', name: 'Traction Control Assist', desc: 'Limits wheel-slip for confident stability' },
      { icon: '👁️', name: 'Blind Spot Indicator', desc: 'Displays orange warning indicators in door mirrors' },
      { icon: '🛣️', name: 'Lane Assist Warning', desc: 'Vibrates steering when lane boundaries are crossed' },
    ],
    colors: [
      { name: 'Vibe Orange', hex: '#FF6B00', css: 'hue-rotate-[20deg] saturate-[3.2] brightness-[1.05]' },
      { name: 'Ecological Green', hex: '#10B981', css: 'hue-rotate-[110deg] saturate-[2.2]' },
      { name: 'Lavender Purple', hex: '#8B5CF6', css: 'hue-rotate-[260deg] saturate-[2]' },
      { name: 'Glacier White', hex: '#F3F4F6', css: 'brightness-[1.2] saturate-[0.4]' },
      { name: 'Carbon Black', hex: '#1F2937', css: 'brightness-[0.35]' },
    ],
  },
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price)

// ─────────────────────────────────────────────────────────────────────────────
interface PageProps {
  params: { slug: string }
}

export default function VehicleDetailPage({ params }: PageProps) {
  const vehicle = getVehicleBySlug(params.slug)
  if (!vehicle) notFound()

  const data = modelRegistry[vehicle.slug] ?? modelRegistry['eq1']

  const [interiorIdx, setInteriorIdx] = useState(0)
  const [exteriorIdx, setExteriorIdx] = useState(0)
  const [activeColor, setActiveColor] = useState(0)

  const nextSlide = (type: 'i' | 'e') =>
    type === 'i'
      ? setInteriorIdx(p => (p + 1) % data.interiorImages.length)
      : setExteriorIdx(p => (p + 1) % data.exteriorImages.length)

  const prevSlide = (type: 'i' | 'e') =>
    type === 'i'
      ? setInteriorIdx(p => (p - 1 + data.interiorImages.length) % data.interiorImages.length)
      : setExteriorIdx(p => (p - 1 + data.exteriorImages.length) % data.exteriorImages.length)

  return (
    <main className="min-h-screen bg-[#f0ede4] text-[#1e1e24] pt-20">

      {/* ═══════════════════════════════════════════════════════ */}
      {/* LAYOUT 1: FULL-BLEED HERO + FLOATING CARD + SPEC STRIP */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="relative bg-[#d9d6ce] overflow-hidden min-h-[90vh] flex flex-col">
        {/* Full-bleed vehicle image fills the right 70% */}
        <div className="absolute inset-0 z-0">
          {/* Subtle gradient overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#d9d6ce]/90 via-[#d9d6ce]/30 to-transparent z-10" />
          <AnimatePresence mode="wait">
            <motion.img
              key={activeColor}
              src={vehicle.image}
              alt={vehicle.name}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className={cn(
                'absolute right-0 top-0 h-full w-full object-cover object-center',
                data.colors[activeColor]?.css
              )}
            />
          </AnimatePresence>
        </div>

        {/* Floating info — left side, positioned at top-left, no card */}
        <div className="relative z-20 w-full pt-32 px-6 md:px-12 lg:px-20">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md text-left"
          >
            {/* Badge */}
            <div className="inline-block mb-4">
              <span className="badge-red">{vehicle.name}</span>
            </div>

            {/* Content without card background */}
            <div className="relative">
              <h1 className="font-heading font-extrabold text-3xl md:text-4xl text-white leading-tight mb-4 uppercase tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                {data.tagline}
              </h1>
              <p className="text-white/90 text-base leading-relaxed mb-6 drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)]">
                {data.intro}
              </p>
              <div className="border-t border-white/30 pt-5">
                <p className="text-[10px] text-white/80 uppercase font-bold tracking-widest mb-2">Harga Mulai</p>
                <p className="text-3xl md:text-4xl font-extrabold text-chery-red font-heading drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                  {formatPrice(vehicle.price)}
                </p>
              </div>
            </div>

            <div className="flex gap-3 mt-5 flex-wrap">
              <Link
                href={`/contact?model=${vehicle.slug}`}
                className="btn-primary inline-flex items-center gap-2 text-sm py-3 px-6"
              >
                <Calendar className="h-4 w-4" />
                Test Drive
              </Link>
              <a
                href="tel:+622112345678"
                className="btn-secondary inline-flex items-center gap-2 text-sm py-3 px-6"
              >
                <Phone className="h-4 w-4" />
                Hubungi Kami
              </a>
            </div>
          </motion.div>
        </div>

        {/* Spec strip positioned at bottom of hero, overlaid on car image */}
        <div className="absolute bottom-0 left-0 right-0 z-20 bg-white/10 backdrop-blur-xl border-t border-white/20">
          {/* Glass reflection effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
          
          <div className="container-custom py-3 relative">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-4">
              {[
                { label: data.powerLabel, value: data.powerStat, unit: data.powerUnit, icon: '⚡' },
                { label: data.torqueLabel, value: data.torqueStat, unit: data.torqueUnit, icon: '🔧' },
                { label: data.rangeLabel, value: data.rangeStat, unit: data.rangeUnit, icon: '⛽' },
                { label: data.driveLabel, value: data.driveStat, unit: '', icon: '⚙️' },
                { label: data.accelLabel, value: data.accelStat, unit: '', icon: '🚀' },
              ].map((s, i) => (
                <div
                  key={i}
                  className={cn(
                    'flex flex-col items-start lg:items-center text-left lg:text-center group relative',
                    i > 0 && 'lg:border-l lg:border-white/20 lg:pl-4'
                  )}
                >
                  {/* Icon */}
                  <span className="text-xl mb-1 opacity-90 group-hover:opacity-100 transition-opacity drop-shadow-lg">
                    {s.icon}
                  </span>
                  
                  {/* Label */}
                  <p className="text-white/80 text-[10px] font-semibold uppercase tracking-wider mb-1 leading-tight drop-shadow-md">
                    {s.label}
                  </p>
                  
                  {/* Value with accent */}
                  <div className="flex items-baseline gap-1">
                    <p className="font-heading font-extrabold text-white leading-none drop-shadow-lg">
                      <span className="text-2xl md:text-3xl">{s.value}</span>
                    </p>
                    {s.unit && (
                      <span className="text-xs font-bold text-chery-red ml-1 drop-shadow-md">{s.unit}</span>
                    )}
                  </div>

                  {/* Hover glow effect */}
                  <div className="absolute inset-0 bg-chery-red/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg -m-2 blur-xl" />
                </div>
              ))}
            </div>
          </div>
        </div>

      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* LAYOUT 2: INTERIOR FEATURES SPOTLIGHT                   */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="relative py-24 bg-gradient-to-b from-[#f0ede4] to-[#e8e5dc] overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-chery-red/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-chery-red/3 rounded-full blur-3xl pointer-events-none" />
        
        <div className="container-custom relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Interior image slider with modern styling */}
            <div className="relative group">
              {/* Main image container with premium frame */}
              <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-[#0e0e18] h-[300px] md:h-[480px] ring-1 ring-black/5">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={interiorIdx}
                    src={data.interiorImages[interiorIdx] || vehicle.image}
                    alt="Interior"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>

                {/* Gradient overlay for better arrow visibility */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20 pointer-events-none" />

                {/* Modern slider arrows */}
                <button
                  onClick={() => prevSlide('i')}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-full flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() => nextSlide('i')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-full flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>

                {/* Modern dot indicators */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 bg-black/30 backdrop-blur-md px-4 py-2 rounded-full">
                  {data.interiorImages.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setInteriorIdx(i)}
                      className={cn(
                        'h-2 rounded-full transition-all duration-300',
                        interiorIdx === i ? 'w-8 bg-chery-red' : 'w-2 bg-white/60 hover:bg-white/80'
                      )}
                    />
                  ))}
                </div>
              </div>

              {/* Decorative corner accent */}
              <div className="absolute -top-3 -left-3 w-20 h-20 border-l-2 border-t-2 border-chery-red/30 rounded-tl-3xl pointer-events-none" />
              <div className="absolute -bottom-3 -right-3 w-20 h-20 border-r-2 border-b-2 border-chery-red/30 rounded-br-3xl pointer-events-none" />
            </div>

            {/* Right: Modern text content */}
            <div className="space-y-6">
              {/* Section label */}
              <div className="flex items-center gap-3">
                <div className="h-px w-10 bg-chery-red" />
                <span className="text-[11px] font-extrabold text-chery-red uppercase tracking-widest">Interior</span>
              </div>

              {/* Main title */}
              <h2 className="font-heading font-extrabold text-4xl md:text-5xl text-[#1e1e24] leading-tight uppercase">
                {data.interiorTitle}
              </h2>

              {/* Description */}
              <p className="text-[#5a5a60] text-base md:text-lg leading-relaxed">
                {data.interiorDesc}
              </p>

              {/* Feature list with modern styling */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                {data.interiorFeatures.map((f, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="group flex items-center gap-3 text-sm text-[#1e1e24] font-semibold"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-chery-red text-white group-hover:scale-110 transition-transform">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span className="group-hover:text-chery-red transition-colors">{f}</span>
                  </motion.div>
                ))}
              </div>

              {/* CTA Button */}
              <div className="pt-4">
                <button className="group relative inline-flex items-center gap-2 px-6 py-3 bg-[#1e1e24] text-white rounded-full font-semibold text-sm overflow-hidden transition-all hover:shadow-lg hover:scale-105">
                  <span className="relative z-10">Explore Interior</span>
                  <ChevronRight className="h-4 w-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 bg-chery-red transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* LAYOUT 3: EXTERIOR DESIGN SHOWCASE                      */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="section-padding bg-[#e8e5dc]">
        <div className="container-custom">
          {/* Centered header */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-[#1e1e24] uppercase mb-3">
              {data.exteriorTitle}
            </h2>
            <p className="text-[#5a5a60] text-sm md:text-base leading-relaxed">
              {data.exteriorDesc}
            </p>
          </div>

          {/* Full-width exterior image slider */}
          <div className="relative overflow-hidden rounded-2xl shadow-xl bg-[#0e0e18] h-[280px] md:h-[540px] max-w-5xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.img
                key={exteriorIdx}
                src={data.exteriorImages[exteriorIdx] || vehicle.image}
                alt="Exterior"
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>

            <button
              onClick={() => prevSlide('e')}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-black/30 hover:bg-black/60 backdrop-blur-sm text-white rounded-full flex items-center justify-center transition-all"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => nextSlide('e')}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-black/30 hover:bg-black/60 backdrop-blur-sm text-white rounded-full flex items-center justify-center transition-all"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* Dot indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {data.exteriorImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setExteriorIdx(i)}
                  className={cn(
                    'h-1.5 rounded-full transition-all duration-300',
                    exteriorIdx === i ? 'w-7 bg-white' : 'w-1.5 bg-white/40'
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* LAYOUT 4: ADAS & SAFETY TECHNOLOGY                      */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="relative py-20 bg-gradient-to-br from-[#1e1e24] via-[#2a2a35] to-[#1e1e24] overflow-hidden">
        {/* Background accent elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-chery-red/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-chery-red/5 rounded-full blur-2xl pointer-events-none" />
        
        <div className="container-custom relative">
          {/* Model badge + title */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-chery-red" />
              <span className="text-[11px] font-extrabold text-chery-red uppercase tracking-widest">{vehicle.name}</span>
            </div>
            <h2 className="font-heading font-extrabold text-5xl md:text-6xl text-white uppercase leading-tight">
              Safety
            </h2>
            <p className="text-gray-400 mt-4 max-w-xl text-sm md:text-base">
              Advanced safety systems designed to protect you and your passengers on every journey.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Car + ADAS count */}
            <div className="lg:col-span-5 flex flex-col items-center text-center">
              <div className="relative">
                {/* Red glow behind the car */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-chery-red/20 rounded-full blur-3xl animate-pulse pointer-events-none" />
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  className="relative w-full object-contain max-h-72 drop-shadow-[0_20px_60px_rgba(196,30,58,0.3)]"
                />
              </div>
              {/* Big ADAS count */}
              <div className="mt-8">
                <p className="font-heading font-extrabold text-7xl md:text-8xl text-white leading-none">
                  {data.adasCount}
                </p>
                <p className="text-chery-red text-sm uppercase tracking-widest font-bold mt-2">
                  ADAS Features
                </p>
                <p className="text-gray-500 text-xs uppercase tracking-wider mt-1">
                  Advanced Driver Assistance Systems
                </p>
              </div>
            </div>

            {/* Right: Modern ADAS feature grid */}
            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {data.adas.map((f, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 transition-all duration-300 hover:bg-white/10 hover:border-chery-red/50 hover:shadow-[0_0_30px_rgba(196,30,58,0.2)]"
                  >
                    {/* Icon */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-chery-red/10 text-chery-red group-hover:bg-chery-red group-hover:text-white transition-all duration-300">
                        <Shield className="h-5 w-5" />
                      </div>
                      <h3 className="font-bold text-white text-sm leading-tight group-hover:text-chery-red transition-colors">
                        {f.name}
                      </h3>
                    </div>
                    <p className="text-gray-400 text-xs leading-relaxed pl-[52px]">
                      {f.desc}
                    </p>

                    {/* Hover accent line */}
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-chery-red to-chery-red/50 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-2xl" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* LAYOUT 5: VIBE COLOR SELECTOR                          */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="section-padding bg-[#e8e5dc]">
        <div className="container-custom">
          {/* Top row: headline left, swatches right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-10">
            {/* Bold heading left */}
            <div className="lg:col-span-7">
              <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-[#1e1e24] leading-tight uppercase max-w-xl">
                PICK THE SHADE THAT FITS YOUR VIBE AND MAKES EVERY DRIVE UNIQUELY YOURS.
              </h2>
            </div>

            {/* Swatch selector right */}
            <div className="lg:col-span-5 flex flex-col lg:items-end">
              <p className="text-xs font-bold text-[#888] uppercase tracking-widest mb-3">
                Color Options :{' '}
                <span className="text-[#1e1e24]">{data.colors[activeColor]?.name}</span>
              </p>
              <div className="flex flex-wrap gap-3 lg:justify-end">
                {data.colors.map((c, i) => (
                  <button
                    key={c.name}
                    title={c.name}
                    onClick={() => setActiveColor(i)}
                    className={cn(
                      'h-9 w-9 rounded-full border-2 transition-all duration-300 relative shadow',
                      activeColor === i
                        ? 'border-[#1e1e24] scale-110 ring-2 ring-[#1e1e24]/25'
                        : 'border-[#b8b4a8] hover:scale-105'
                    )}
                    style={{ backgroundColor: c.hex }}
                  >
                    {activeColor === i && (
                      <span className="absolute inset-0 flex items-center justify-center">
                        <Check className="h-4 w-4 text-white drop-shadow-[0_1px_3px_rgba(0,0,0,1)]" />
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Large vehicle side-profile preview */}
          <div
            className="relative w-full rounded-2xl overflow-hidden flex items-center justify-center min-h-[260px] md:min-h-[440px] transition-all duration-700"
            style={{ backgroundColor: `${data.colors[activeColor]?.hex}14` }}
          >
            {/* Ambient color glow */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-[100px] opacity-30 pointer-events-none transition-all duration-700"
              style={{ backgroundColor: data.colors[activeColor]?.hex }}
            />

            <AnimatePresence mode="wait">
              <motion.img
                key={activeColor}
                src={vehicle.image}
                alt={vehicle.name}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.5 }}
                className={cn(
                  'relative w-full max-w-4xl h-auto object-contain py-6 transition-all duration-700',
                  data.colors[activeColor]?.css
                )}
              />
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* CTA FOOTER                                              */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-[#0e0e18] text-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading font-extrabold text-3xl md:text-4xl mb-3 uppercase">
              Tertarik dengan {vehicle.name}?
            </h2>
            <p className="text-gray-400 max-w-lg mx-auto mb-8 text-sm leading-relaxed">
              Jadwalkan test drive hari ini di showroom Chery terdekat dan rasakan sendiri perbedaannya.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/contact?model=${vehicle.slug}`}
                className="btn-primary inline-flex items-center gap-2"
              >
                <Calendar className="h-4 w-4" />
                Booking Test Drive
              </Link>
              <Link
                href="/find-your-chery"
                className="btn-secondary border-white/30 text-white hover:bg-white hover:text-[#1e1e24]"
              >
                Cari Model Untukmu
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  )
}