'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Shield, Wrench, HeadphonesIcon, Truck, FileText, Calendar, MapPin, Phone, Clock } from 'lucide-react'

const ownershipPillars = [
  { icon: Shield, title: 'Garansi 5 Tahun / 150.000 km', desc: 'Garansi komprehensif untuk body, mesin, dan komponen penting. Ketenangan pikiran untuk setiap perjalanan Anda.' },
  { icon: Wrench, title: 'Service Berkala', desc: 'Jaringan service center resmi di seluruh Indonesia dengan teknisi tersertifikasi dan suku cadang original Chery.' },
  { icon: HeadphonesIcon, title: 'Customer Support 24/7', desc: 'Tim support siap membantu Anda kapan saja melalui telepon, WhatsApp, atau email. Respon cepat dan solusi tepat.' },
  { icon: Truck, title: 'Emergency Assistance', desc: 'Layanan darurat 24 jam untuk bantuan di jalan, derek, mobil pengganti, dan bantuan medis dasar.' },
  { icon: FileText, title: 'Chery Club', desc: 'Bergabung dengan komunitas pemilik Chery untuk pengalaman kepemilikan eksklusif, event, dan benefit khusus.' },
]

const serviceCenters = [
  { city: 'Jakarta', address: 'Jl. Sudirman No. 123, Jakarta Pusat', phone: '+62 21 1234 5678', hours: 'Mon-Fri: 8:00-17:00, Sat: 8:00-14:00' },
  { city: 'Surabaya', address: 'Jl. Ahmad Yani No. 45, Surabaya', phone: '+62 31 1234 567', hours: 'Mon-Fri: 8:00-17:00, Sat: 8:00-14:00' },
  { city: 'Makassar', address: 'Jl. Perintis Kemerdekaan No. 78, Makassar', phone: '+62 411 1234 567', hours: 'Mon-Fri: 8:00-17:00, Sat: 8:00-14:00' },
]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fadeInUp: any = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
}

export default function OwnershipPage() {
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
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div variants={fadeInUp}>
              <span className="inline-flex items-center gap-2 bg-chery-red/10 border border-chery-red/20 text-chery-red text-sm font-medium px-4 py-2 rounded-full mb-6">
                <Shield className="h-4 w-4" />
                Ownership
              </span>
            </motion.div>
            <motion.h1 
              variants={fadeInUp}
              className="font-display font-bold text-5xl md:text-6xl lg:text-7xl mb-6"
            >
              Chery Ownership Experience
            </motion.h1>
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-gray-300 max-w-2xl mx-auto"
            >
              Kami menemani Anda bukan hanya saat pembelian, tetapi selama perjalanan kepemilikan Chery Anda.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Pillars */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="font-heading font-bold text-4xl md:text-5xl text-text-primary mb-4">
              Why Choose Chery Ownership
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-body-l text-text-secondary max-w-2xl mx-auto">
              Pengalaman kepemilikan yang dirancang untuk kenyamanan dan ketenangan pikiran Anda.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {ownershipPillars.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                custom={i}
                className="text-center p-6 rounded-card bg-surface-muted hover:bg-chery-red/5 transition-all duration-300 group"
              >
                <div className="w-16 h-16 bg-chery-red/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <pillar.icon className="h-8 w-8 text-chery-red" />
                </div>
                <h3 className="font-heading font-bold text-lg text-text-primary mb-2">{pillar.title}</h3>
                <p className="text-text-secondary text-body-s">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Centers */}
      <section className="section-padding bg-surface-muted">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="font-heading font-bold text-4xl md:text-5xl text-text-primary mb-4">
              Our Service Centers
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-body-l text-text-secondary max-w-2xl mx-auto">
              Kunjungi service center resmi Chery terdekat untuk perawatan berkala dan pengecekan kendaraan Anda.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {serviceCenters.map((center, i) => (
              <motion.div
                key={center.city}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                custom={i}
                className="bg-white rounded-card p-8 shadow-card hover:shadow-card-hover transition-all duration-300"
              >
                <div className="w-14 h-14 bg-chery-red/10 rounded-xl flex items-center justify-center mb-6">
                  <MapPin className="h-7 w-7 text-chery-red" />
                </div>
                <h3 className="font-heading font-bold text-xl text-text-primary mb-4">{center.city}</h3>
                <div className="space-y-3 text-sm text-text-secondary">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 text-chery-red flex-shrink-0 mt-0.5" />
                    <span>{center.address}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-chery-red flex-shrink-0" />
                    <a href={`tel:${center.phone}`} className="hover:text-chery-red transition-colors">{center.phone}</a>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="h-4 w-4 text-chery-red flex-shrink-0 mt-0.5" />
                    <span>{center.hours}</span>
                  </div>
                </div>
                <Link href="/contact" className="btn-primary w-full text-center text-sm mt-6 inline-flex items-center justify-center">
                  Book Service
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Warranty Details */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="font-heading font-bold text-4xl md:text-5xl text-text-primary mb-4">
              Warranty Coverage
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-body-l text-text-secondary max-w-2xl mx-auto">
              Perlindungan lengkap untuk kendaraan Chery Anda.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'New Vehicle Warranty', items: ['5 tahun / 150.000 km', 'Struktur bodi', 'Mesin & transmisi', 'Komponen kelistrikan', 'Audio & navigasi'] },
              { title: 'Corrosion Warranty', items: ['6 tahun unlimited km', 'Anti-karat bodi', 'Panel exterior', 'Komponen galvanized'] },
              { title: 'Roadside Assistance', items: ['24/7 darurat', 'Bantuan di jalan', 'Mobil pengganti', 'Layanan derek', 'Bantuan medis dasar'] },
            ].map((warranty, i) => (
              <motion.div
                key={warranty.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                custom={i}
                className="bg-surface-muted rounded-card p-8"
              >
                <h3 className="font-heading font-bold text-xl text-text-primary mb-4">{warranty.title}</h3>
                <ul className="space-y-2">
                  {warranty.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-text-secondary text-sm">
                      <div className="w-1.5 h-1.5 bg-chery-red rounded-full flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
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
            <motion.h2 variants={fadeInUp} className="font-heading font-bold text-3xl md:text-4xl mb-4">
              Need Help with Your Chery?
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Our team is ready to assist you with service, warranty claims, or any ownership questions.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-white text-lg inline-flex items-center">
                Contact Support
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="btn-outline-light text-lg">
                Chat on WhatsApp
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}