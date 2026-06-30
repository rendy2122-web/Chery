'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, X, Check, ChevronDown } from 'lucide-react'
import { vehicles } from '@/lib/data/vehicles'

type CompareItem = typeof vehicles[0] | null

export default function CompareModelsPage() {
  const [selected, setSelected] = useState<CompareItem[]>([null, null, null])
  const [openDropdown, setOpenDropdown] = useState<number | null>(null)

  const availableVehicles = vehicles.filter(v => !selected.includes(v))

  const handleSelect = (index: number, vehicle: typeof vehicles[0]) => {
    const newSelected = [...selected]
    newSelected[index] = vehicle
    setSelected(newSelected)
    setOpenDropdown(null)
  }

  const handleRemove = (index: number) => {
    const newSelected = [...selected]
    newSelected[index] = null
    setSelected(newSelected)
  }

  const selectedCount = selected.filter(Boolean).length

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fadeInUp: any = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
  }

  const specs = [
    { label: 'Category', getValue: (v: typeof vehicles[0]) => v.category },
    { label: 'Seats', getValue: (v: typeof vehicles[0]) => v.specs.seats },
    { label: 'Fuel Type', getValue: (v: typeof vehicles[0]) => v.specs.fuelType },
    { label: 'Battery Range', getValue: (v: typeof vehicles[0]) => v.specs.batteryRange || '-' },
  ]

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
                <ArrowRight className="h-4 w-4" />
                Compare Models
              </span>
            </motion.div>
            <motion.h1 
              variants={fadeInUp}
              className="font-display font-bold text-5xl md:text-6xl lg:text-7xl mb-6"
            >
              Compare Chery Models
            </motion.h1>
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-gray-300 max-w-2xl mx-auto"
            >
              Select up to 3 models and compare their specifications, features, and pricing side by side.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Compare Tool */}
      <section className="section-padding bg-surface-muted">
        <div className="container-custom">
          {/* Model Selectors */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[0, 1, 2].map((index) => (
              <div key={index} className="relative">
                <label className="block text-sm font-semibold text-text-primary mb-2">
                  Model {index + 1}
                </label>
                {selected[index] ? (
                  <div className="bg-white rounded-card p-4 shadow-card flex items-center gap-4">
                    <div className="w-16 h-16 bg-surface-muted rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">🚗</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-heading font-bold text-text-primary truncate">
                        {selected[index]?.name}
                      </h3>
                      <p className="text-sm text-text-muted">{selected[index]?.category}</p>
                    </div>
                    <button
                      onClick={() => handleRemove(index)}
                      className="w-8 h-8 rounded-full bg-surface-muted hover:bg-chery-red/10 flex items-center justify-center flex-shrink-0 transition-colors"
                    >
                      <X className="h-4 w-4 text-text-muted" />
                    </button>
                  </div>
                ) : (
                  <div className="relative">
                    <button
                      onClick={() => setOpenDropdown(openDropdown === index ? null : index)}
                      className="w-full bg-white rounded-card p-4 shadow-card border-2 border-dashed border-surface-border hover:border-chery-red/30 transition-colors text-left"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-text-muted">Select a model...</span>
                        <ChevronDown className="h-4 w-4 text-text-muted" />
                      </div>
                    </button>

                    {openDropdown === index && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-card shadow-card-hover border border-surface-border z-20 max-h-64 overflow-y-auto">
                        {availableVehicles.map((vehicle) => (
                          <button
                            key={vehicle.id}
                            onClick={() => handleSelect(index, vehicle)}
                            className="w-full px-4 py-3 text-left hover:bg-surface-muted transition-colors flex items-center gap-3 border-b border-surface-border last:border-0"
                          >
                            <div className="w-10 h-10 bg-surface-muted rounded-lg flex items-center justify-center flex-shrink-0">
                              <span className="text-xl">🚗</span>
                            </div>
                            <div>
                              <p className="font-semibold text-text-primary text-sm">{vehicle.name}</p>
                              <p className="text-xs text-text-muted">{vehicle.category}</p>
                            </div>
                          </button>
                        ))}
                        {availableVehicles.length === 0 && (
                          <p className="px-4 py-3 text-sm text-text-muted text-center">
                            All models selected
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Comparison Table */}
          {selectedCount >= 2 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl shadow-card overflow-hidden"
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-surface-border">
                      <th className="text-left p-6 font-semibold text-text-primary w-48">
                        Specification
                      </th>
                      {selected.map((vehicle, i) => (
                        <th key={i} className="p-6 text-center min-w-[200px]">
                          {vehicle && (
                            <div>
                              <div className="w-20 h-20 bg-surface-muted rounded-xl flex items-center justify-center mx-auto mb-3">
                                <span className="text-3xl">🚗</span>
                              </div>
                              <h3 className="font-heading font-bold text-xl text-text-primary">
                                {vehicle.name}
                              </h3>
                              <p className="text-sm text-text-muted">{vehicle.category}</p>
                            </div>
                          )}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {specs.map((spec, i) => (
                      <tr key={spec.label} className={i % 2 === 0 ? 'bg-surface-muted/30' : ''}>
                        <td className="p-6 font-semibold text-text-primary">{spec.label}</td>
                        {selected.map((vehicle, j) => (
                          <td key={j} className="p-6 text-center text-text-secondary">
                            {vehicle ? spec.getValue(vehicle) : '-'}
                          </td>
                        ))}
                      </tr>
                    ))}
                    <tr className="border-t-2 border-chery-red/20">
                      <td className="p-6 font-semibold text-text-primary">Starting Price</td>
                      {selected.map((vehicle, j) => (
                        <td key={j} className="p-6 text-center">
                          {vehicle?.price ? (
                            <span className="font-display font-bold text-xl text-chery-red">
                              Rp {vehicle.price.toLocaleString('id-ID')}
                            </span>
                          ) : (
                            <span className="text-text-muted">-</span>
                          )}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-6 font-semibold text-text-primary">Key Features</td>
                      {selected.map((vehicle, j) => (
                        <td key={j} className="p-6">
                          {vehicle?.features && vehicle.features.length > 0 ? (
                            <ul className="space-y-1">
                              {vehicle.features.slice(0, 3).map((feature, k) => (
                                <li key={k} className="flex items-center gap-2 text-sm text-text-secondary justify-center">
                                  <Check className="h-3.5 w-3.5 text-chery-red flex-shrink-0" />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <span className="text-text-muted">-</span>
                          )}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-t-2 border-chery-red/20">
                      <td className="p-6"></td>
                      {selected.map((vehicle, j) => (
                        <td key={j} className="p-6 text-center">
                          {vehicle && (
                            <Link 
                              href={`/models/${vehicle.slug}`} 
                              className="btn-primary text-sm inline-flex items-center"
                            >
                              View Details
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          )}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl shadow-card p-12 text-center"
            >
              <div className="w-20 h-20 bg-chery-red/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <ArrowRight className="h-10 w-10 text-chery-red" />
              </div>
              <h3 className="font-heading font-bold text-2xl text-text-primary mb-2">
                Select at least 2 models
              </h3>
              <p className="text-text-secondary max-w-md mx-auto">
                Choose 2 or 3 models from the dropdowns above to see a detailed side-by-side comparison.
              </p>
            </motion.div>
          )}

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link href="/models" className="btn-secondary inline-flex items-center text-lg group">
              Browse All Models
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  )
}