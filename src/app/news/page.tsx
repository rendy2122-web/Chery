'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Calendar, Clock, User, Search, Filter } from 'lucide-react'

const articles = [
  {
    title: 'Chery Catat Penjualan Tertinggi sepanjang Masa di Indonesia',
    excerpt: 'Chery Indonesia mencatat rekor penjualan tertinggi sepanjang sejarah dengan pertumbuhan 150% dibanding tahun lalu. Tren positif ini didorong oleh popularitas model Tiggo 7 Pro dan Omoda 5.',
    date: '15 Juni 2026',
    category: 'Press Release',
    author: 'Chery Indonesia',
    readTime: '3 min',
  },
  {
    title: 'Teknologi SHS Safety: Standar Keselamatan Tertinggi di Kelasnya',
    excerpt: 'Pelajari bagaimana Chery SHS (Safety Handling System) memberikan perlindungan maksimal bagi Anda dan keluarga dengan 6 airbag, ABS, EBD, dan struktur bodi high-strength steel.',
    date: '10 Juni 2026',
    category: 'Technology',
    author: 'Tim Teknis',
    readTime: '5 min',
  },
  {
    title: 'Tips Merawat SUV Hybrid di Musim Hujan',
    excerpt: 'Panduan lengkap merawat Chery Hybrid Anda agar tetap prima dan aman selama musim hujan. Dari ban, baterai, hingga sistem kelistrikan.',
    date: '5 Juni 2026',
    category: 'Ownership Tips',
    author: 'Tim After Sales',
    readTime: '4 min',
  },
  {
    title: 'Chery Resmi Luncurkan Tiggo 8 Pro di Indonesia',
    excerpt: 'Flagship 7-seater SUV Chery Tiggo 8 Pro resmi hadir di Indonesia dengan harga kompetitif, fitur premium, dan teknologi canggih untuk keluarga modern.',
    date: '1 Juni 2026',
    category: 'Press Release',
    author: 'Chery Indonesia',
    readTime: '4 min',
  },
  {
    title: 'Perbandingan: Tiggo 7 Pro vs Omoda 5 — Mana yang Cocok untuk Anda?',
    excerpt: 'Kami bandingkan dua model terlaris Chery Indonesia untuk membantu Anda memilih yang tepat sesuai kebutuhan dan budget.',
    date: '28 Mei 2026',
    category: 'Buying Guide',
    author: 'Tim Konten',
    readTime: '6 min',
  },
  {
    title: 'Event Test Drive Nasional: Coba Semua Model Chery',
    excerpt: 'Event test drive nasional akan digelar di 3 kota besar. Kesempatan langka untuk merasakan langsung performa dan kenyamanan Chery.',
    date: '25 Mei 2026',
    category: 'Events',
    author: 'Tim Marketing',
    readTime: '2 min',
  },
]

const categories = ['All', 'Press Release', 'Technology', 'Ownership Tips', 'Buying Guide', 'Events']

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fadeInUp: any = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
}

export default function NewsPage() {
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
                <Calendar className="h-4 w-4" />
                News & Updates
              </span>
            </motion.div>
            <motion.h1 
              variants={fadeInUp}
              className="font-display font-bold text-5xl md:text-6xl lg:text-7xl mb-6"
            >
              Latest from Chery
            </motion.h1>
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-gray-300 max-w-2xl mx-auto"
            >
              Stay updated with the latest news, promotions, and automotive insights from Chery Indonesia.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b border-surface-border sticky top-16 z-30">
        <div className="container-custom py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    cat === 'All'
                      ? 'bg-chery-red text-white'
                      : 'bg-surface-muted text-text-secondary hover:bg-chery-red/10 hover:text-chery-red'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
              <input
                type="text"
                placeholder="Search articles..."
                className="pl-10 pr-4 py-2 rounded-lg border border-surface-border bg-surface-muted text-sm focus:outline-none focus:border-chery-red w-full md:w-64"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="section-padding bg-surface-muted">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, i) => (
              <motion.article
                key={article.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                custom={i}
                className="bg-white rounded-card overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 group cursor-pointer"
              >
                <div className="h-48 bg-gradient-to-br from-chery-navy to-chery-navy-2 flex items-center justify-center relative">
                  <div className="text-center">
                    <Calendar className="h-12 w-12 text-chery-red/40 mx-auto mb-2" />
                    <p className="text-white/20 text-xs">Article Image</p>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-chery-red text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {article.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3 text-xs text-text-muted">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {article.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {article.readTime}
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-lg text-text-primary mb-2 group-hover:text-chery-red transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-text-secondary text-body-s mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-surface-border">
                    <span className="text-xs text-text-muted flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {article.author}
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

          {/* Load More */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <button className="btn-secondary inline-flex items-center text-lg group">
              Load More Articles
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="bg-gradient-to-br from-chery-navy to-chery-navy-2 rounded-3xl p-8 md:p-12 text-white text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.h2 
                variants={fadeInUp}
                className="font-heading font-bold text-3xl md:text-4xl mb-4"
              >
                Stay Updated
              </motion.h2>
              <motion.p 
                variants={fadeInUp}
                className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto"
              >
                Subscribe to our newsletter and get the latest news, promotions, and updates directly to your inbox.
              </motion.p>
              <motion.div 
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-chery-red"
                />
                <button className="btn-primary whitespace-nowrap">
                  Subscribe
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  )
}