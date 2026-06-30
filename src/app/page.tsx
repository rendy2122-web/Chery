'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Star, Shield, Zap, Award, Users, ChevronLeft, ChevronRight, Check } from 'lucide-react'
import dynamic from 'next/dynamic'
import HeroSlideshow from '@/components/HeroSlideshow'
import VehicleLineupShowcase from '@/components/sections/VehicleLineupShowcase'
import VehicleCard from '@/components/sections/VehicleCard'
import { vehicles } from '@/lib/data/vehicles'
import StarBorder from '@/components/ui/StarBorder'

const LifestyleGrid = dynamic(() => import('@/components/sections/LifestyleGrid'), { ssr: true })
const PromotionSection = dynamic(() => import('@/components/sections/PromotionCard'), { ssr: true })
const OwnershipSection = dynamic(() => import('@/components/sections/OwnershipSection'), { ssr: true })
const NewsSection = dynamic(() => import('@/components/sections/NewsSection'), { ssr: true })

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fadeInUp: any = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] },
  }),
}

export default function Home() {
  const [activeTechTab, setActiveTechTab] = useState<'shs' | 'adas' | 'connectivity'>('shs')

  useEffect(() => {
    const tabsOrder: ('shs' | 'adas' | 'connectivity')[] = ['shs', 'adas', 'connectivity']
    const timer = setTimeout(() => {
      setActiveTechTab((prev) => {
        const currentIndex = tabsOrder.indexOf(prev)
        return tabsOrder[(currentIndex + 1) % tabsOrder.length]
      })
    }, 5000)
    return () => clearTimeout(timer)
  }, [activeTechTab])



  const techTabs = {
    shs: {
      title: 'SHS Safety System',
      badge: 'Safety First',
      desc: 'Comprehensive safety with 6 airbags, ABS, EBD, and advanced body structure designed to protect you and your family.',
      image: '/images/technology/shs-safety.png',
      features: [
        '6 Airbags (Front, Side, Curtain)',
        'Reinforced Body Structure',
        'ABS with EBD',
        'ISOFIX Child Seat Anchors',
        'ESC & TCS',
        'Tire Pressure Monitoring'
      ]
    },
    adas: {
      title: 'ADAS & Autonomous Features',
      badge: 'Intelligent Driving',
      desc: 'Advanced driver assistance systems that make every journey safer and more comfortable.',
      image: '/images/technology/adas-autonomous.png',
      features: [
        'Adaptive Cruise Control',
        'Blind Spot Detection',
        'Lane Departure Warning',
        'Rear Cross Traffic Alert',
        'Autonomous Emergency Braking',
        'Driver Attention Monitor'
      ]
    },
    connectivity: {
      title: 'Smart Connectivity',
      badge: 'Digital Ecosystem',
      desc: 'Stay connected with cutting-edge infotainment and connectivity features.',
      image: '/images/technology/smart-connectivity.png',
      features: [
        '10.25" Touchscreen Display',
        'Bluetooth Connectivity',
        'Apple CarPlay & Android Auto',
        'USB Ports (Front & Rear)',
        'Wireless Charging',
        'Premium Sound System'
      ]
    }
  }

  return (
    <main className="min-h-screen">
      {/* ====== Section 1: Hero Slideshow ====== */}
      <HeroSlideshow />

      {/* ====== Section 2: Vehicle Line Up Showcase ====== */}
      <VehicleLineupShowcase />

      {/* ====== Section 3: Find Your Chery ====== */}
      <section id="find-your-chery-section" className="relative min-h-[70vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/images/find-your-chery-hero.png"
            alt="Chery vehicles lineup"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-chery-navy/90 via-chery-navy/60 to-transparent" />
        </div>

        {/* Content */}
        <div className="container-custom relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-2xl"
          >
            <motion.div variants={fadeInUp} custom={0}>
              <span className="badge-red mb-4">Find Your Chery</span>
            </motion.div>
            <motion.h2
              variants={fadeInUp} custom={1}
              className="font-heading font-bold text-4xl md:text-5xl lg:text-h2 text-white mb-4 leading-tight"
            >
              Discover Your Perfect Drive
            </motion.h2>
            <motion.p
              variants={fadeInUp} custom={2}
              className="text-body-l text-white/90 mb-8 max-w-xl"
            >
              Not sure which Chery is right for you? Take our smart quiz — answer a few questions and we'll recommend the perfect match.
            </motion.p>
            <motion.div variants={fadeInUp} custom={3}>
              <StarBorder
                as={Link}
                href="/find-your-chery"
                color="#C41E3A"
                speed="4s"
                thickness={2}
                className="text-lg group font-semibold"
              >
                Find My Chery
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform text-white" />
              </StarBorder>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ====== Section 4: Why Chery ====== */}
      <section className="section-padding bg-chery-navy text-white">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp} custom={0}>
              <span className="badge-gold mb-4">Why Chery</span>
            </motion.div>
            <motion.h2 
              variants={fadeInUp} custom={1}
              className="font-heading font-bold text-4xl md:text-5xl lg:text-h2 mb-4"
            >
              Engineered for Excellence
            </motion.h2>
            <motion.p 
              variants={fadeInUp} custom={2}
              className="text-body-l text-gray-300 max-w-2xl mx-auto"
            >
              Innovation, safety, and value — discover why millions choose Chery across the globe.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Shield, title: '5-Star Safety', desc: 'NCAP certified with advanced ADAS and comprehensive protection systems.' },
              { icon: Zap, title: 'Innovation First', desc: 'Leading the industry with cutting-edge EV, Hybrid, and intelligent technology.' },
              { icon: Users, title: 'Global Community', desc: 'Trusted by 12M+ owners across 80+ countries worldwide.' },
              { icon: Award, title: 'Premium Value', desc: 'World-class design and features at an accessible price point.' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="bg-gradient-to-b from-white/[0.08] to-transparent backdrop-blur-md rounded-card p-8 border border-white/10 hover:border-chery-red/50 shadow-lg hover:shadow-2xl hover:shadow-chery-red/10 transform hover:-translate-y-2 transition-all duration-500 ease-out group"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-chery-red to-chery-red-dark rounded-full flex items-center justify-center mb-6 shadow-md shadow-chery-red/25 group-hover:rotate-[10deg] transition-all duration-500 flex-shrink-0">
                  <item.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-heading font-bold text-xl mb-3 text-white group-hover:text-chery-gold transition-colors duration-300 tracking-wide">
                  {item.title}
                </h3>
                <p className="text-gray-300 text-body-s leading-relaxed group-hover:text-white transition-colors duration-300">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== Section 5: Technology ====== */}
      <section id="technology-section" className="relative py-20 bg-white overflow-hidden">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="text-center mb-12"
          >
            <motion.div variants={fadeInUp} custom={0}>
              <span className="badge-red mb-4">Technology</span>
            </motion.div>
            <motion.h2 
              variants={fadeInUp} custom={1}
              className="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl text-text-primary mb-4 uppercase"
            >
              Advanced Technology
            </motion.h2>
            <motion.p 
              variants={fadeInUp} custom={2}
              className="text-body-l text-text-secondary max-w-2xl mx-auto"
            >
              Cutting-edge features that keep you safe, connected, and in control — every drive, every journey.
            </motion.p>
          </motion.div>

          {/* Full-width Image Carousel with partial adjacent slides */}
          <div className="relative px-4 md:px-8">
            <div className="relative h-[400px] md:h-[500px] lg:h-[600px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTechTab}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 md:inset-x-4 lg:inset-x-8"
                >
                  <div className="relative h-full rounded-3xl overflow-hidden shadow-2xl bg-gray-900">
                    <img
                      src={techTabs[activeTechTab].image}
                      alt={techTabs[activeTechTab].title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation arrows */}
              <button
                onClick={() => {
                  const tabs = Object.keys(techTabs) as Array<'shs' | 'adas' | 'connectivity'>
                  const currentIndex = tabs.indexOf(activeTechTab)
                  const prevIndex = (currentIndex - 1 + tabs.length) % tabs.length
                  setActiveTechTab(tabs[prevIndex])
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={() => {
                  const tabs = Object.keys(techTabs) as Array<'shs' | 'adas' | 'connectivity'>
                  const currentIndex = tabs.indexOf(activeTechTab)
                  const nextIndex = (currentIndex + 1) % tabs.length
                  setActiveTechTab(tabs[nextIndex])
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              {/* Dot indicators */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 bg-black/30 backdrop-blur-md px-4 py-2 rounded-full">
                {Object.keys(techTabs).map((key) => (
                  <button
                    key={key}
                    onClick={() => setActiveTechTab(key as 'shs' | 'adas' | 'connectivity')}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      activeTechTab === key ? 'w-8 bg-chery-red' : 'w-2 bg-white/60 hover:bg-white/80'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link 
              href="/technology" 
              className="btn-primary inline-flex items-center text-lg group"
            >
              Explore All Technology
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ====== Section 6: Lifestyle ====== */}
      <LifestyleGrid />

      {/* ====== Section 7: Promotion ====== */}
      <div id="promotion-section">
        <PromotionSection />
      </div>

      {/* ====== Section 8: Testimonials ====== */}
      <section className="section-padding bg-surface-muted overflow-hidden">
        {/* Scoped CSS marquee animation */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes marqueeTestimonials {
            0% { transform: translate3d(0, 0, 0); }
            100% { transform: translate3d(calc(-50% - 12px), 0, 0); }
          }
          .animate-marquee-testimonials {
            animation: marqueeTestimonials 35s linear infinite;
          }
        `}} />

        <div className="container-custom mb-12">
          <div className="text-center">
            <span className="badge-red mb-4 inline-block">Testimonials</span>
            <h2 className="font-heading font-bold text-4xl md:text-5xl lg:text-h2 text-text-primary mb-2">
              What Our Owners Say
            </h2>
            <p className="text-body-l text-text-secondary max-w-2xl mx-auto">
              Real experiences from real Chery owners across Indonesia.
            </p>
          </div>
        </div>

        {/* Outer scrolling track */}
        <div className="w-full relative overflow-hidden py-4">
          <div className="flex gap-6 animate-marquee-testimonials hover:[animation-play-state:paused] w-max select-none">
            {/* Track 1 */}
            <div className="flex gap-6">
              {[
                {
                  name: 'Budi Santoso',
                  location: 'Jakarta',
                  car: 'Tiggo 7 Pro',
                  text: 'The best decision I ever made. The Tiggo 7 Pro is incredibly smooth, feature-packed, and the after-sales service is exceptional.',
                  rating: 5,
                },
                {
                  name: 'Siti Nurhaliza',
                  location: 'Surabaya',
                  car: 'Omoda 5',
                  text: 'Love my Omoda 5! The design turns heads everywhere, and the fuel efficiency is impressive for a turbocharged SUV.',
                  rating: 5,
                },
                {
                  name: 'Ahmad Hidayat',
                  location: 'Bandung',
                  car: 'Tiggo 8 Pro',
                  text: 'Perfect family car. The 7-seater layout is spacious, and my kids love the rear entertainment system. Highly recommended!',
                  rating: 5,
                },
                {
                  name: 'Dian Lestari',
                  location: 'Medan',
                  car: 'Omoda E5',
                  text: 'Driving the Omoda E5 is like stepping into the future. The electric range is superb, and the acceleration is instant and silent.',
                  rating: 5,
                },
                {
                  name: 'Hendra Wijaya',
                  location: 'Makassar',
                  car: 'Tiggo 8 Pro Max',
                  text: 'Incredible power and premium interior space. Ideal for long road trips with my family, and the advanced safety features provide absolute peace of mind.',
                  rating: 5,
                },
                {
                  name: 'Rina Amelia',
                  location: 'Semarang',
                  car: 'Tiggo 5X',
                  text: 'Best value compact SUV. It is perfect for city maneuvering, has high ground clearance, and is exceptionally easy to park.',
                  rating: 5,
                },
              ].map((testimonial) => (
                <div
                  key={testimonial.name}
                  className="w-[280px] md:w-[350px] lg:w-[380px] flex-shrink-0 bg-white rounded-card p-6 md:p-8 shadow-card border border-gray-100/50 hover:border-chery-red/20 transition-all duration-300 flex flex-col justify-between whitespace-normal"
                >
                  <div>
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, r) => (
                        <Star key={r} className="h-5 w-5 text-chery-gold fill-chery-gold" />
                      ))}
                    </div>
                    <p className="text-text-secondary mb-6 italic leading-relaxed text-sm md:text-base">
                      &ldquo;{testimonial.text}&rdquo;
                    </p>
                  </div>
                  <div className="border-t border-surface-border pt-4">
                    <p className="font-semibold text-text-primary text-sm md:text-base">{testimonial.name}</p>
                    <p className="text-xs md:text-sm text-text-muted">{testimonial.location} &bull; {testimonial.car}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Track 2 (Identical duplicate for seamless looping) */}
            <div className="flex gap-6">
              {[
                {
                  name: 'Budi Santoso',
                  location: 'Jakarta',
                  car: 'Tiggo 7 Pro',
                  text: 'The best decision I ever made. The Tiggo 7 Pro is incredibly smooth, feature-packed, and the after-sales service is exceptional.',
                  rating: 5,
                },
                {
                  name: 'Siti Nurhaliza',
                  location: 'Surabaya',
                  car: 'Omoda 5',
                  text: 'Love my Omoda 5! The design turns heads everywhere, and the fuel efficiency is impressive for a turbocharged SUV.',
                  rating: 5,
                },
                {
                  name: 'Ahmad Hidayat',
                  location: 'Bandung',
                  car: 'Tiggo 8 Pro',
                  text: 'Perfect family car. The 7-seater layout is spacious, and my kids love the rear entertainment system. Highly recommended!',
                  rating: 5,
                },
                {
                  name: 'Dian Lestari',
                  location: 'Medan',
                  car: 'Omoda E5',
                  text: 'Driving the Omoda E5 is like stepping into the future. The electric range is superb, and the acceleration is instant and silent.',
                  rating: 5,
                },
                {
                  name: 'Hendra Wijaya',
                  location: 'Makassar',
                  car: 'Tiggo 8 Pro Max',
                  text: 'Incredible power and premium interior space. Ideal for long road trips with my family, and the advanced safety features provide absolute peace of mind.',
                  rating: 5,
                },
                {
                  name: 'Rina Amelia',
                  location: 'Semarang',
                  car: 'Tiggo 5X',
                  text: 'Best value compact SUV. It is perfect for city maneuvering, has high ground clearance, and is exceptionally easy to park.',
                  rating: 5,
                },
              ].map((testimonial) => (
                <div
                  key={`${testimonial.name}-dup`}
                  className="w-[280px] md:w-[350px] lg:w-[380px] flex-shrink-0 bg-white rounded-card p-6 md:p-8 shadow-card border border-gray-100/50 hover:border-chery-red/20 transition-all duration-300 flex flex-col justify-between whitespace-normal"
                >
                  <div>
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, r) => (
                        <Star key={r} className="h-5 w-5 text-chery-gold fill-chery-gold" />
                      ))}
                    </div>
                    <p className="text-text-secondary mb-6 italic leading-relaxed text-sm md:text-base">
                      &ldquo;{testimonial.text}&rdquo;
                    </p>
                  </div>
                  <div className="border-t border-surface-border pt-4">
                    <p className="font-semibold text-text-primary text-sm md:text-base">{testimonial.name}</p>
                    <p className="text-xs md:text-sm text-text-muted">{testimonial.location} &bull; {testimonial.car}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ====== Section 9: Dealer ====== */}
      <section id="dealer-section" className="section-padding">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp} custom={0}>
              <span className="badge-red mb-4">Dealerships</span>
            </motion.div>
            <motion.h2 
              variants={fadeInUp} custom={1}
              className="font-heading font-bold text-4xl md:text-5xl lg:text-h2 text-text-primary mb-4"
            >
              Visit Our Showrooms
            </motion.h2>
            <motion.p 
              variants={fadeInUp} custom={2}
              className="text-body-l text-text-secondary max-w-2xl mx-auto"
            >
              Experience Chery firsthand at our premium dealerships across Indonesia.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Cibubur', location: 'Jakarta', phone: '+62 21 1234 5678', slug: 'cibubur' },
              { name: 'Makassar', location: 'Sulawesi Selatan', phone: '+62 411 1234 567', slug: 'makassar' },
              { name: 'Pare-pare', location: 'Sulawesi Selatan', phone: '+62 421 1234 567', slug: 'pare-pare' },
            ].map((dealer, i) => (
              <motion.div
                key={dealer.name}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="bg-white rounded-card p-8 shadow-card hover:shadow-card-hover transition-all duration-300 text-center group"
              >
                <div className="w-16 h-16 bg-chery-red/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="h-8 w-8 text-chery-red" />
                </div>
                <h3 className="font-heading font-bold text-xl mb-1 text-text-primary">
                  Chery {dealer.name}
                </h3>
                <p className="text-text-secondary mb-4">{dealer.location}</p>
                <a href={`tel:${dealer.phone}`} className="text-chery-red font-semibold hover:underline block mb-4">
                  {dealer.phone}
                </a>
                <div className="flex flex-col gap-2">
                  <Link href={`/${dealer.slug}`} className="btn-primary text-sm w-full">
                    View Branch
                  </Link>
                  <Link href={`/contact?dealer=${dealer.slug}`} className="btn-secondary text-sm w-full">
                    Contact Dealer
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link 
              href="/dealers" 
              className="btn-secondary inline-flex items-center text-lg group"
            >
              Find All Dealers
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ====== Section 11: Ownership ====== */}
      <OwnershipSection />

      {/* ====== Section 12: News ====== */}
      <NewsSection />

      {/* ====== Section 13: FAQ ====== */}
      <section className="section-padding bg-surface-muted">
        <div className="container-custom max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp} custom={0}>
              <span className="badge-red mb-4">FAQ</span>
            </motion.div>
            <motion.h2 
              variants={fadeInUp} custom={1}
              className="font-heading font-bold text-4xl md:text-5xl lg:text-h2 text-text-primary mb-4"
            >
              Frequently Asked Questions
            </motion.h2>
            <motion.p 
              variants={fadeInUp} custom={2}
              className="text-body-l text-text-secondary max-w-2xl mx-auto"
            >
              Quick answers to common questions about Chery.
            </motion.p>
          </motion.div>

          <div className="space-y-4">
            {[
              { q: 'What financing options are available?', a: 'We offer competitive financing through leading banks with down payments starting from 20% and tenures up to 60 months. Visit our financing page to calculate your estimate.' },
              { q: 'How do I book a test drive?', a: 'Simply visit our Contact page, fill in your details and preferred date/time, and our team will confirm your appointment within 24 hours.' },
              { q: 'What is the warranty coverage?', a: 'All Chery vehicles come with a comprehensive 5-year/150,000 km warranty for your peace of mind.' },
              { q: 'Are Chery vehicles safe?', a: 'Absolutely! Chery vehicles are built with SHS (Safety Handling System) body structure, equipped with up to 6 airbags, ADAS, and NCAP 5-star rated safety.' },
              { q: 'Where are Chery dealers located?', a: 'We have showrooms in Cibubur (Jakarta), Makassar, and Pare-pare (Sulawesi Selatan). Visit our Dealers page for complete information.' },
            ].map((faq, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="bg-white rounded-xl p-6 shadow-card hover:shadow-card-hover transition-shadow duration-300"
              >
                <h3 className="font-heading font-semibold text-lg mb-2 text-text-primary">
                  {faq.q}
                </h3>
                <p className="text-text-secondary">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== Section 14: Final CTA ====== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-chery-red via-chery-red to-chery-navy text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white rounded-full blur-[200px]" />
        </div>
        <div className="section-padding container-custom text-center relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2 
              variants={fadeInUp} custom={0}
              className="font-display font-bold text-4xl md:text-5xl lg:text-display-l mb-6 leading-tight"
            >
              Ready to Experience <br />
              <span className="text-gradient-gold">Chery Excellence</span>?
            </motion.h2>
            <motion.p 
              variants={fadeInUp} custom={1}
              className="text-body-l text-gray-200 mb-8 max-w-2xl mx-auto"
            >
              Book your test drive today and discover why thousands of Indonesians are choosing Chery 
              as their trusted automotive partner.
            </motion.p>
            <motion.div 
              variants={fadeInUp} custom={2}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link 
                href="/contact" 
                className="btn-white text-lg inline-flex items-center justify-center group"
              >
                Book Test Drive
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a 
                href="https://wa.me/6281234567890" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-outline-light text-lg inline-flex items-center justify-center"
              >
                Chat on WhatsApp
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
