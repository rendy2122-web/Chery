'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Play, ChevronDown, Shield, Award, Users, Globe } from 'lucide-react'

const stats = [
  { icon: Shield, value: '5-Star', label: 'NCAP Safety' },
  { icon: Globe, value: '80+', label: 'Countries' },
  { icon: Users, value: '12M+', label: 'Global Owners' },
  { icon: Award, value: '#1', label: 'Chinese Auto Export' },
]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const containerVariants: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const itemVariants: any = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  },
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const statVariants: any = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 1 + i * 0.1, ease: 'easeOut' },
  }),
}

export default function HeroCinematic() {
  const { scrollY } = useScroll()
  const heroParallax = useTransform(scrollY, [0, 800], [0, 200])
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0])
  const heroScale = useTransform(scrollY, [0, 600], [1, 1.1])

  return (
    <section className="relative h-screen min-h-[700px] overflow-hidden">
      {/* Background Layer */}
      <motion.div 
        style={{ y: heroParallax, scale: heroScale }}
        className="absolute inset-0"
      >
        {/* Dark premium gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-chery-navy via-chery-navy-2 to-black" />
        
        {/* Abstract premium pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-chery-red/20 rounded-full blur-[128px]" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-chery-gold/10 rounded-full blur-[100px]" />
        </div>

        {/* Grid overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Hero Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: "url('/images/hero/chery-hero.jpg')",
            backgroundPosition: 'center 30%'
          }}
        />

        {/* Bottom gradient overlay */}
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-chery-navy via-chery-navy/50 to-transparent" />
      </motion.div>

      {/* Content Layer */}
      <motion.div 
        style={{ opacity: heroOpacity }}
        className="relative z-10 h-full flex flex-col justify-center"
      >
        <div className="container-custom">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl"
          >
            {/* Badge */}
            <motion.div variants={itemVariants} className="mb-6">
              <span className="inline-flex items-center gap-2 bg-chery-red/10 backdrop-blur-sm border border-chery-red/20 text-chery-red text-sm font-medium px-4 py-2 rounded-full">
                <span className="w-2 h-2 bg-chery-red rounded-full animate-pulse-soft" />
                Global Automotive Innovation
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1 
              variants={itemVariants}
              className="font-display font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-white leading-[0.95] tracking-tight"
            >
              Experience the
              <br />
              <span className="text-gradient-red">Future</span> of Driving
            </motion.h1>

            {/* Subheadline */}
            <motion.p 
              variants={itemVariants}
              className="mt-6 text-lg sm:text-xl md:text-2xl text-gray-300 max-w-2xl leading-relaxed"
            >
              Innovation meets excellence. Discover Chery's lineup of revolutionary vehicles 
              engineered for the modern world — where advanced technology, intelligent safety, 
              and bold design converge.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              variants={itemVariants}
              className="mt-10 flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/contact"
                className="btn-primary text-lg inline-flex items-center justify-center group"
              >
                Book Test Drive
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/models"
                className="btn-outline-light text-lg inline-flex items-center justify-center group"
              >
                <Play className="mr-2 h-5 w-5" />
                Explore Models
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div 
              variants={itemVariants}
              className="mt-16 flex items-center gap-4 text-sm text-gray-400"
            >
              <span className="flex items-center gap-1.5">
                <Shield className="h-4 w-4 text-chery-red" />
                5-Star Safety
              </span>
              <span className="w-px h-4 bg-white/10" />
              <span className="flex items-center gap-1.5">
                <Award className="h-4 w-4 text-chery-red" />
                12M+ Owners
              </span>
              <span className="w-px h-4 bg-white/10" />
              <span className="flex items-center gap-1.5">
                <Globe className="h-4 w-4 text-chery-red" />
                80+ Countries
              </span>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Stats Bar */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.5 }}
        className="absolute bottom-0 left-0 right-0 z-20"
      >
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                custom={i}
                variants={statVariants}
                initial="hidden"
                animate="visible"
                className="bg-chery-navy/60 backdrop-blur-md p-6 md:p-8 text-center hover:bg-chery-navy/80 transition-colors"
              >
                <stat.icon className="h-6 w-6 text-chery-red mx-auto mb-3" />
                <div className="font-display font-bold text-2xl md:text-3xl text-white">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-gray-400 mt-1">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-40 md:bottom-36 right-8 hidden md:block"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 text-white/30"
        >
          <span className="text-xs tracking-widest uppercase rotate-90 mb-8">Scroll</span>
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </motion.div>
    </section>
  )
}