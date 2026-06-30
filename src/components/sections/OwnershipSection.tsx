'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Shield, Wrench, HeadphonesIcon, Truck, FileText } from 'lucide-react'

const items = [
  { icon: Shield, title: 'Garansi 5 Tahun', desc: 'Garansi komprehensif 5 tahun/150.000 km untuk ketenangan pikiran Anda.' },
  { icon: Wrench, title: 'Service Berkala', desc: 'Jaringan service center resmi dengan teknisi tersertifikasi dan suku cadang original.' },
  { icon: HeadphonesIcon, title: 'Customer Support', desc: 'Tim support siap membantu Anda 24/7 melalui telepon, WhatsApp, atau email.' },
  { icon: Truck, title: 'Emergency Assistance', desc: 'Layanan darurat 24 jam untuk bantuan di jalan, derek, dan mobil pengganti.' },
  { icon: FileText, title: 'Chery Club', desc: 'Bergabung dengan komunitas pemilik Chery untuk pengalaman kepemilikan eksklusif.' },
]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const itemVariants: any = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
}

export default function OwnershipSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants}>
            <span className="badge-red mb-4">Ownership</span>
          </motion.div>
          <motion.h2 
            variants={itemVariants}
            className="font-heading font-bold text-4xl md:text-5xl lg:text-h2 text-text-primary mb-4"
          >
            Chery Ownership Experience
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-body-l text-text-secondary max-w-2xl mx-auto"
          >
            Kami menemani Anda bukan hanya saat pembelian, tetapi selama perjalanan kepemilikan Chery Anda.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={itemVariants}
              custom={i}
              className="text-center p-6 rounded-card bg-surface-muted hover:bg-chery-red/5 transition-all duration-300 group"
            >
              <div className="w-16 h-16 bg-chery-red/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <item.icon className="h-8 w-8 text-chery-red" />
              </div>
              <h3 className="font-heading font-bold text-lg text-text-primary mb-2">{item.title}</h3>
              <p className="text-text-secondary text-body-s">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/contact" className="btn-primary inline-flex items-center text-lg group">
            Book Service
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}