'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Calendar, Clock, User } from 'lucide-react'

const newsItems = [
  {
    title: 'Chery Catat Penjualan Tertinggi di Indonesia',
    excerpt: 'Chery Indonesia mencatat rekor penjualan tertinggi sepanjang sejarah dengan pertumbuhan 150% dibanding tahun lalu.',
    date: '15 Juni 2026',
    category: 'Press Release',
    author: 'Chery Indonesia',
    image: '/images/news/news-featured.jpg',
  },
  {
    title: 'Teknologi SHS Safety: Standar Keselamatan Tertinggi',
    excerpt: 'Pelajari bagaimana Chery SHS (Safety Handling System) memberikan perlindungan maksimal bagi Anda dan keluarga.',
    date: '10 Juni 2026',
    category: 'Technology',
    author: 'Tim Teknis',
    image: '/images/technology/shs-safety.png',
  },
  {
    title: 'Tips Merawat SUV Hybrid di Musim Hujan',
    excerpt: 'Panduan lengkap merawat Chery Hybrid Anda agar tetap prima dan aman selama musim hujan.',
    date: '5 Juni 2026',
    category: 'Ownership Tips',
    author: 'Tim After Sales',
    image: '/images/technology/smart-connectivity.png',
  },
]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const itemVariants: any = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
}

export default function NewsSection() {
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
            <span className="badge-red mb-4">News & Updates</span>
          </motion.div>
          <motion.h2 
            variants={itemVariants}
            className="font-heading font-bold text-4xl md:text-5xl lg:text-h2 text-text-primary mb-4"
          >
            Latest from Chery
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-body-l text-text-secondary max-w-2xl mx-auto"
          >
            Stay updated with the latest news, promotions, and automotive insights from Chery Indonesia.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newsItems.map((item, i) => (
            <motion.article
              key={item.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={itemVariants}
              custom={i}
              className="bg-white rounded-card overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 group cursor-pointer"
            >
              <div className="h-56 relative bg-gradient-to-br from-chery-navy to-chery-navy-2">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-500 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-semibold text-chery-red bg-chery-red/10 px-3 py-1 rounded-full">
                    {item.category}
                  </span>
                  <span className="text-xs text-text-muted flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {item.date}
                  </span>
                </div>
                <h3 className="font-heading font-bold text-lg text-text-primary mb-2 group-hover:text-chery-red transition-colors line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-text-secondary text-body-s mb-4 line-clamp-2">
                  {item.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-text-muted flex items-center gap-1">
                    <User className="h-3 w-3" />
                    {item.author}
                  </span>
                  <span className="text-sm font-semibold text-chery-red group/link inline-flex items-center">
                    Read More
                    <ArrowRight className="ml-1 h-3.5 w-3.5 group-hover/link:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/news" className="btn-secondary inline-flex items-center text-lg group">
            View All News
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}