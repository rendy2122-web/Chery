'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Clock, Tag, Percent, Gift, Shield, ChevronRight } from 'lucide-react'

const promotions = [
  {
    title: 'DP Mulai 10%',
    subtitle: 'Khusus Tiggo 5x',
    description: 'Miliki Chery Tiggo 5x dengan DP ringan mulai 10% dan tenor hingga 60 bulan. Program terbatas untuk pembelian pertama.',
    icon: Percent,
    color: 'from-chery-red to-chery-red-dark',
    badge: 'Limited Offer',
    validUntil: '30 Juni 2026',
    terms: 'Syarat & ketentuan berlaku. Program tidak dapat digabungkan dengan promo lain.',
  },
  {
    title: 'Bonus Service 3 Tahun',
    subtitle: 'Untuk Pembelian Omoda 5',
    description: 'Dapatkan gratis service hingga 3 tahun atau 30.000 km untuk setiap pembelian Omoda 5 baru di dealer resmi Chery.',
    icon: Gift,
    color: 'from-chery-gold to-chery-gold-dim',
    badge: 'Special Promo',
    validUntil: '31 Juli 2026',
    terms: 'Gratis service meliputi jasa dan suku cadang sesuai ketentuan. Hubungi dealer untuk detail.',
  },
  {
    title: 'Trade-In Bonus',
    subtitle: 'Harga Terbaik untuk Mobil Lama',
    description: 'Tukar tambah mobil lama Anda dengan harga terbaik + bonus tambahan hingga Rp 10 juta untuk pembelian model Chery apa pun.',
    icon: Shield,
    color: 'from-chery-navy to-chery-navy-2',
    badge: 'Trade-In',
    validUntil: '30 Juni 2026',
    terms: 'Penilaian mobil lama berdasarkan kondisi aktual. Bonus berlaku untuk model tertentu.',
  },
  {
    title: 'Diskon Lebaran',
    subtitle: 'Semua Model Chery',
    description: 'Rayakan Lebaran dengan diskon spesial hingga Rp 20 juta untuk semua model Chery. Ditambah paket mudik gratis.',
    icon: Tag,
    color: 'from-chery-red to-chery-navy',
    badge: 'Seasonal',
    validUntil: '15 Juli 2026',
    terms: 'Diskon bervariasi per model. Paket mudik terbatas untuk 100 pembeli pertama.',
  },
  {
    title: 'Referral Program',
    subtitle: 'Rekomendasikan Chery',
    description: 'Dapatkan voucher service Rp 2 juta untuk setiap teman yang berhasil membeli Chery melalui rekomendasi Anda.',
    icon: Gift,
    color: 'from-chery-gold-dim to-chery-navy-2',
    badge: 'Referral',
    validUntil: '31 Desember 2026',
    terms: 'Berlaku untuk referral yang berhasil melakukan pembelian. Voucher tidak dapat diuangkan.',
  },
  {
    title: 'Kredit Ringan',
    subtitle: 'Mulai dari 3.5% per tahun',
    description: 'Nikmati bunga kredit mulai dari 3.5% per tahun dengan DP minimal 10%. Proses cepat dan persetujuan dalam 24 jam.',
    icon: Percent,
    color: 'from-chery-navy-2 to-chery-charcoal',
    badge: 'Financing',
    validUntil: '30 September 2026',
    terms: 'Suku bunga tergantung profil kredit dan lembaga pembiayaan. Simulasi di halaman Financing.',
  },
]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fadeInUp: any = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
}

export default function PromotionsPage() {
  return (
    <main className="min-h-screen pt-20">
      {/* Hero */}
      <section className="bg-gradient-to-br from-chery-navy via-chery-navy-2 to-black text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-chery-red/30 rounded-full blur-[150px]" />
          <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-chery-gold/20 rounded-full blur-[100px]" />
        </div>
        <div className="container-custom relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            className="text-center max-w-4xl mx-auto pt-[40px]"
          >

            <motion.h1 
              variants={fadeInUp}
              className="font-display font-bold text-5xl md:text-6xl lg:text-7xl mb-6"
            >
              Special Offers
            </motion.h1>
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-gray-300 max-w-2xl mx-auto"
            >
              Limited-time promotions and exclusive deals to help you drive home your dream Chery with amazing benefits.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Promotions Grid */}
      <section className="section-padding bg-surface-muted">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {promotions.map((promo, i) => (
              <motion.div
                key={promo.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                custom={i}
                className="bg-white rounded-card overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 group"
              >
                <div className={`h-2 bg-gradient-to-r ${promo.color}`} />
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <span className="inline-flex items-center gap-1.5 bg-chery-red/10 text-chery-red text-xs font-semibold px-3 py-1 rounded-full">
                      <Clock className="h-3 w-3" />
                      {promo.badge}
                    </span>
                    <span className="text-xs text-text-muted">Until: {promo.validUntil}</span>
                  </div>

                  <div className="w-14 h-14 bg-chery-red/10 rounded-xl flex items-center justify-center mb-6">
                    <promo.icon className="h-7 w-7 text-chery-red" />
                  </div>

                  <h3 className="font-heading font-bold text-2xl text-text-primary mb-1">
                    {promo.title}
                  </h3>
                  <p className="text-chery-red font-semibold text-sm mb-4">
                    {promo.subtitle}
                  </p>
                  <p className="text-text-secondary text-body-s mb-6">
                    {promo.description}
                  </p>

                  <div className="border-t border-surface-border pt-4 mb-6">
                    <p className="text-xs text-text-muted italic">
                      {promo.terms}
                    </p>
                  </div>

                  <Link 
                    href="/contact" 
                    className="btn-primary w-full text-center text-sm inline-flex items-center justify-center group/btn"
                  >
                    Claim Promo
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-chery-navy text-white">
        <div className="container-custom text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2 
              variants={fadeInUp}
              className="font-heading font-bold text-3xl md:text-4xl mb-4"
            >
              Don't Miss Out
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto"
            >
              Promotions are limited. Contact our team today to secure your deal before it ends.
            </motion.p>
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/contact" className="btn-white text-lg inline-flex items-center">
                Contact Us
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link href="/dealers" className="btn-outline-light text-lg">
                Find a Dealer
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}