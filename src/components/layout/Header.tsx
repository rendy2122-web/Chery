'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, Phone, Search, Home } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import FinancingModal from '@/components/FinancingModal'

interface NavItem {
  name: string
  href: string
  children?: { name: string; href: string }[]
}

const navigation: NavItem[] = [
  { name: 'Technology', href: '#technology-section' },
  { name: 'Find Your Chery', href: '#find-your-chery-section' },
  { name: 'Promotions', href: '#promotion-section' },
  { name: 'Dealers', href: '#dealer-section' },
  { name: 'Financing', href: '#financing-modal' },
]

const IDNFlag = () => (
  <div className="w-5 h-3.5 flex flex-col border border-white/20 rounded overflow-hidden flex-shrink-0">
    <div className="bg-[#C41E3A] h-1/2 w-full" />
    <div className="bg-[#FFFFFF] h-1/2 w-full" />
  </div>
)

// Mega Menu Models Data
const megaMenuModels = {
  BEV: [
    {
      name: 'CHERY Q',
      image: '/images/vehicles/eq1.jpg',
      isNew: true,
      specs: [
        { label: 'BATERAI', value: '42,7', unit: 'kWh' },
        { label: 'VELG', value: 'R17', unit: '' },
        { label: 'PANJANG', value: '4195', unit: 'mm' }
      ],
      slug: 'eq1'
    },
    {
      name: 'J6',
      image: '/images/vehicles/eq1.jpg',
      isNew: true,
      specs: [
        { label: 'Baterai', value: 'LFP', unit: '' },
        { label: 'Panjang', value: '4406', unit: 'mm' },
        { label: 'Wheelbase', value: '2715', unit: 'mm' }
      ],
      slug: 'eq1'
    },
    {
      name: 'CHERY E5',
      image: '/images/vehicles/eq1.jpg',
      isNew: false,
      specs: [
        { label: 'Baterai', value: 'LFP', unit: '' },
        { label: 'Panjang', value: '4424', unit: 'MM' },
        { label: 'Wheelbase', value: '2630', unit: 'MM' }
      ],
      slug: 'eq1'
    }
  ],
  CSH: [
    {
      name: 'TIGGO 8 PRO HYBRID',
      image: '/images/vehicles/tiggo-8-pro-hybrid.jpg',
      isNew: false,
      specs: [
        { label: 'MESIN', value: '1.5L', unit: 'Turbo Hybrid' },
        { label: 'TENAGA', value: '190', unit: 'HP' },
        { label: 'KURSI', value: '7', unit: 'Seats' }
      ],
      slug: 'tiggo-8-pro-hybrid'
    }
  ],
  ICE: [
    {
      name: 'OMODA 5',
      image: '/images/vehicles/omoda-5.jpg',
      isNew: false,
      specs: [
        { label: 'MESIN', value: '1.5L', unit: 'Turbo' },
        { label: 'TENAGA', value: '156', unit: 'HP' },
        { label: 'TRANSMISI', value: 'CVT', unit: '' }
      ],
      slug: 'omoda-5'
    },
    {
      name: 'TIGGO 7 PRO',
      image: '/images/vehicles/tiggo-7-pro.jpg',
      isNew: false,
      specs: [
        { label: 'MESIN', value: '1.6L', unit: 'Turbo' },
        { label: 'TENAGA', value: '197', unit: 'HP' },
        { label: 'TRANSMISI', value: '7-DCT', unit: '' }
      ],
      slug: 'tiggo-7-pro'
    },
    {
      name: 'TIGGO 8 PRO',
      image: '/images/vehicles/tiggo-8-pro.jpg',
      isNew: false,
      specs: [
        { label: 'MESIN', value: '2.0L', unit: 'Turbo' },
        { label: 'TENAGA', value: '254', unit: 'HP' },
        { label: 'TRANSMISI', value: '7-DCT', unit: '' }
      ],
      slug: 'tiggo-8-pro'
    }
  ]
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const navVariants: any = {
  hidden: { y: -100 },
  visible: { y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mobileMenuVariants: any = {
  closed: { opacity: 0, x: '100%' },
  open: { opacity: 1, x: 0, transition: { duration: 0.3, ease: 'easeOut' } },
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false)
  const [activeMegaTab, setActiveMegaTab] = useState<'BEV' | 'CSH' | 'ICE'>('BEV')
  const [isFinancingModalOpen, setIsFinancingModalOpen] = useState(false)
  const pathname = usePathname()
  console.log('Current Pathname in Header:', pathname)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
    setOpenDropdown(null)
    setIsMegaMenuOpen(false)
  }, [pathname])

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, targetId: string) => {
    e.preventDefault()
    const element = document.getElementById(targetId)
    if (element) {
      const headerOffset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <>
      <motion.header
        variants={navVariants}
        initial="hidden"
        animate="visible"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled || pathname !== '/' || isMegaMenuOpen
            ? 'bg-chery-navy/95 backdrop-blur-xl shadow-navbar'
            : 'bg-transparent'
        }`}
      >


        {/* Main Navigation */}
        <nav className="container-custom">
          <div className="flex items-center justify-between h-[64px] lg:h-[80px]">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              {/* Premium Chery Oval Ribbon Emblem SVG */}
              <svg className="w-10 h-10 text-white fill-current group-hover:scale-105 transition-transform duration-300" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 15 C69.33 15 85 28.43 85 45 C85 61.57 69.33 75 50 75 C30.67 75 15 61.57 15 45 C15 28.43 30.67 15 50 15 Z M50 23 C34.54 23 22 32.85 22 45 C22 57.15 34.54 67 50 67 C65.46 67 78 57.15 78 45 C78 32.85 65.46 23 50 23 Z" />
                <path d="M50 27 L33 55 L42 55 L50 41 L58 55 L67 55 Z" />
              </svg>
              <div className="flex flex-col">
                <span className="font-display font-bold text-xl tracking-wider text-white">
                  CHERY
                </span>
                <span className="text-[10px] text-gray-400 tracking-[0.2em] uppercase -mt-1">
                  Indonesia
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {/* Home Icon */}
              <Link
                href="/"
                className={`p-2 rounded-lg transition-all duration-200 ${
                  pathname === '/' && !isMegaMenuOpen
                    ? 'text-chery-red bg-chery-red/10'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
                onClick={() => setIsMegaMenuOpen(false)}
              >
                <Home className="h-5 w-5" />
              </Link>

              {/* Model Mega Menu Toggle */}
              <button
                onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                  isMegaMenuOpen
                    ? 'text-white border-b-2 border-white rounded-b-none'
                    : isActive('/models')
                    ? 'text-chery-red bg-chery-red/10'
                    : 'text-gray-200 hover:text-white hover:bg-white/10'
                }`}
              >
                Model
                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${
                  isMegaMenuOpen ? 'rotate-180' : ''
                }`} />
              </button>

              {navigation.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => item.children && setOpenDropdown(item.name)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  {item.children ? (
                    <button
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                        isActive(item.href) && !isMegaMenuOpen
                          ? 'text-chery-red bg-chery-red/10'
                          : isScrolled
                          ? 'text-gray-300 hover:text-white hover:bg-white/5'
                          : 'text-gray-200 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {item.name}
                      <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${
                        openDropdown === item.name ? 'rotate-180' : ''
                      }`} />
                    </button>
                  ) : (
                    <button
                      onClick={(e) => {
                        if (item.href.startsWith('#')) {
                          e.preventDefault()
                          const targetId = item.href.replace('#', '')
                          scrollToSection(e, targetId)
                        }
                        if (item.href === '#financing-modal') {
                          e.preventDefault()
                          setIsFinancingModalOpen(true)
                        }
                      }}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                        isActive(item.href) && !isMegaMenuOpen
                          ? 'text-chery-red bg-chery-red/10'
                          : isScrolled
                          ? 'text-gray-300 hover:text-white hover:bg-white/5'
                          : 'text-gray-200 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {item.name}
                    </button>
                  )}

                  {/* Dropdown */}
                  <AnimatePresence>
                    {item.children && openDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-1 w-56 bg-chery-navy/95 backdrop-blur-xl rounded-2xl border border-white/10 shadow-elevated overflow-hidden"
                      >
                        <div className="p-2">
                          {item.children.map((child) => (
                            <Link
                              key={child.name}
                              href={child.href}
                              className="block px-4 py-3 rounded-xl text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-200"
                            >
                              {child.name}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              {/* CTA */}
              <div className="ml-4 pl-4 border-l border-white/10">
                <Link
                  href="/contact"
                  className="btn-primary text-sm"
                >
                  Book Test Drive
                </Link>
              </div>
            </div>

            {/* Mobile Icons */}
            <div className="flex items-center gap-3 lg:hidden">
              <Link
                href="/contact"
                className="btn-primary text-sm py-2 px-4"
              >
                Test Drive
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6 text-white" />
                ) : (
                  <Menu className="h-6 w-6 text-white" />
                )}
              </button>
            </div>
          </div>
        </nav>

        {/* Mega Menu Dropdown */}
        <AnimatePresence>
          {isMegaMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="w-full bg-[#505050]/95 backdrop-blur-md border-t border-white/10 overflow-hidden"
            >
              <div className="container-custom py-10 text-white relative">
                {/* Close button top right */}
                <button
                  onClick={() => setIsMegaMenuOpen(false)}
                  className="absolute top-6 right-6 flex items-center gap-1 bg-[#1A1A1A]/80 border border-white/20 px-3 py-1.5 rounded-lg text-sm font-semibold hover:bg-[#C41E3A] hover:border-transparent transition-colors"
                >
                  <X className="h-4 w-4" />
                  Close
                </button>

                {/* Tabs BEV / CSH / ICE */}
                <div className="flex justify-center space-x-12 mb-10 border-b border-white/10 pb-4">
                  {(['BEV', 'CSH', 'ICE'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveMegaTab(tab)}
                      className={`text-xl font-bold tracking-wider pb-2 relative transition-colors ${
                        activeMegaTab === tab ? 'text-white border-b-2 border-white' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Grid of Vehicles */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center items-stretch max-w-5xl mx-auto">
                  {megaMenuModels[activeMegaTab]?.map((model) => (
                    <div
                      key={model.name}
                      className="flex flex-col items-center text-center bg-white/5 rounded-2xl p-6 border border-white/5 relative group hover:bg-white/10 transition-all duration-300"
                    >
                      {/* New Badge */}
                      {model.isNew && (
                        <div className="absolute top-4 right-4 bg-[#C41E3A] text-white text-[9px] font-bold px-2 py-0.5 rounded flex items-center gap-0.5">
                          <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
                          NEW
                        </div>
                      )}

                      {/* Title */}
                      <h4 className="font-heading font-bold text-lg mb-3 tracking-wider">{model.name}</h4>

                      {/* Image */}
                      <div className="h-28 w-full flex items-center justify-center mb-4 relative">
                        <img
                          src={model.image}
                          alt={model.name}
                          className="h-full object-contain transform group-hover:scale-105 transition-transform duration-500"
                        />
                        {/* Custom Lightning Icon Overlay for BEV / CSH */}
                        {activeMegaTab !== 'ICE' && (
                          <div className="absolute bottom-2 right-4 w-7 h-7 bg-cyan-500/20 border border-cyan-500/40 rounded-full flex items-center justify-center text-cyan-400 text-xs">
                            ⚡
                          </div>
                        )}
                      </div>

                      {/* Spec Grid */}
                      <div className="grid grid-cols-3 gap-2 w-full text-left mb-6 border-t border-white/10 pt-4">
                        {model.specs.map((spec) => (
                          <div key={spec.label} className="text-center">
                            <span className="block text-[9px] uppercase tracking-wider text-gray-400">{spec.label}</span>
                            <span className="font-bold text-sm block mt-1">{spec.value}</span>
                            {spec.unit && <span className="text-[9px] text-gray-400 block -mt-0.5">{spec.unit}</span>}
                          </div>
                        ))}
                      </div>

                      {/* Action Button */}
                      <Link
                        href={`/models/${model.slug}`}
                        className="mt-auto border border-white/30 hover:bg-[#C41E3A] hover:border-transparent text-white font-medium py-2 px-6 rounded-full text-xs transition-colors"
                      >
                        Lihat Detail
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Backdrop overlay */}
      <AnimatePresence>
        {isMegaMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMegaMenuOpen(false)}
            className="fixed inset-0 bg-black z-45"
          />
        )}
      </AnimatePresence>

      {/* Financing Modal */}
      <FinancingModal 
        isOpen={isFinancingModalOpen} 
        onClose={() => setIsFinancingModalOpen(false)} 
      />

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-chery-navy/98 backdrop-blur-xl">
              <div className="container-custom pt-24 pb-8 h-full overflow-y-auto">
                <nav className="space-y-1">
                  {/* Mobile Model Button */}
                  <Link
                    href="/models"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-4 text-lg font-medium text-white hover:text-chery-red transition-colors"
                  >
                    Model
                  </Link>

                  {navigation.map((item) => (
                    <div key={item.name}>
                      {item.children ? (
                        <>
                          <button
                            onClick={() => setOpenDropdown(openDropdown === item.name ? null : item.name)}
                            className="flex items-center justify-between w-full px-4 py-4 text-lg font-medium text-white hover:text-chery-red transition-colors"
                          >
                            {item.name}
                            <ChevronDown className={`h-5 w-5 transition-transform ${
                              openDropdown === item.name ? 'rotate-180' : ''
                            }`} />
                          </button>
                          <AnimatePresence>
                            {openDropdown === item.name && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="pl-4 border-l-2 border-chery-red/30 ml-6 space-y-1 pb-2">
                                  {item.children.map((child) => (
                                    <Link
                                      key={child.name}
                                      href={child.href}
                                      onClick={() => setIsMobileMenuOpen(false)}
                                      className="block px-4 py-3 text-base text-gray-300 hover:text-white transition-colors"
                                    >
                                      {child.name}
                                    </Link>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <button
                          onClick={() => {
                            setIsMobileMenuOpen(false)
                            if (item.href.startsWith('#')) {
                              const targetId = item.href.replace('#', '')
                              setTimeout(() => scrollToSection({ preventDefault: () => {} } as React.MouseEvent<HTMLAnchorElement>, targetId), 100)
                            }
                            if (item.href === '#financing-modal') {
                              setTimeout(() => setIsFinancingModalOpen(true), 100)
                            }
                          }}
                          className={`block w-full text-left px-4 py-4 text-lg font-medium transition-colors ${
                            isActive(item.href) ? 'text-chery-red' : 'text-white hover:text-chery-red'
                          }`}
                        >
                          {item.name}
                        </button>
                      )}
                    </div>
                  ))}
                </nav>

                {/* Mobile CTA */}
                <div className="mt-8 px-4 space-y-4">
                  <div className="divider-gradient" />
                  <Link
                    href="/contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="btn-primary w-full text-center text-lg"
                  >
                    Book Test Drive
                  </Link>
                  <Link
                    href="/dealers"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="btn-outline-light w-full text-center"
                  >
                    Find a Dealer
                  </Link>
                  <Link
                    href="/financing"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="btn-outline-light w-full text-center"
                  >
                    Financing Calculator
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}