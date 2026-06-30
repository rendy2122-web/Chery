'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Clock, Tag, Percent } from 'lucide-react'

const promotions = [
  {
    title: 'DP Mulai 10%',
    subtitle: 'Khusus Tiggo 5x',
    description: 'Miliki Chery Tiggo 5x dengan DP ringan mulai 10% dan tenor hingga 60 bulan.',
    icon: Percent,
    color: 'from-chery-red to-chery-red-dark',
    badge: 'Limited Offer',
    validUntil: '30 Juni 2026',
  },
  {
    title: 'Bonus Service 3 Tahun',
    subtitle: 'Untuk Pembelian Omoda 5',
    description: 'Dapatkan gratis service hingga 3 tahun untuk setiap pembelian Omoda 5 baru.',
    icon: Tag,
    color: 'from-chery-gold to-chery-gold-dim',
    badge: 'Special Promo',
    validUntil: '31 Juli 2026',
  },
  {
    title: 'Trade-In Bonus',
    subtitle: 'Harga Terbaik untuk Mobil Lama',
    description: 'Tukar tambah mobil lama Anda dengan harga terbaik + bonus tambahan untuk pembelian model Chery apa pun.',
    icon: Clock,
    color: 'from-chery-navy to-chery-navy-2',
    badge: 'Trade-In',
    validUntil: '30 Juni 2026',
  },
]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const itemVariants: any = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
}

export default function PromotionSection() {
  return (
    <section className="section-padding bg-surface-muted">
      <div className="container-custom">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants}>
            <span className="badge-red mb-4">Promotions</span>
          </motion.div>
          <motion.h2 
            variants={itemVariants}
            className="font-heading font-bold text-4xl md:text-5xl lg:text-h2 text-text-primary mb-4"
          >
            Special Offers
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-body-l text-text-secondary max-w-2xl mx-auto"
          >
            Limited-time promotions to help you drive home your dream Chery with amazing benefits.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {promotions.map((promo, i) => (
            <motion.div
              key={promo.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={itemVariants}
              custom={i}
              className="group relative overflow-hidden rounded-card bg-white shadow-card hover:shadow-card-hover transition-all duration-300"
            >
              {/* Color accent bar */}
              <div className={`h-2 bg-gradient-to-r ${promo.color}`} />
              
              <div className="p-8">
                {/* Badge */}
                <span className="inline-flex items-center gap-1.5 bg-chery-red/10 text-chery-red text-xs font-semibold px-3 py-1 rounded-full mb-4">
                  <Clock className="h-3 w-3" />
                  {promo.badge}
                </span>

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

                <div className="flex items-center gap-2 text-xs text-text-muted mb-6">
                  <Clock className="h-3.5 w-3.5" />
                  Valid until: {promo.validUntil}
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link 
            href="/contact" 
            className="btn-secondary inline-flex items-center text-lg group"
          >
            View All Promotions
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}