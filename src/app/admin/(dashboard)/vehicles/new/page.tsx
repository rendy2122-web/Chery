'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Loader2 } from 'lucide-react'
import Link from 'next/link'

const categories = ['SUV', 'Hybrid', 'EV', 'ICE']

export default function NewVehiclePage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSaving(true)
    setError('')

    const form = e.currentTarget
    const formData = new FormData(form)

    const payload = {
      name: formData.get('name') as string,
      slug: formData.get('slug') as string,
      category: formData.get('category') as string,
      priceFrom: parseFloat(formData.get('priceFrom') as string),
      description: formData.get('description') as string,
      shortDescription: formData.get('shortDescription') as string,
      exteriorImage: formData.get('exteriorImage') as string,
      interiorImage: formData.get('interiorImage') as string,
      gallery: (formData.get('gallery') as string).split('\n').filter(Boolean),
      keyFeatures: (formData.get('keyFeatures') as string).split('\n').filter(Boolean),
      specifications: JSON.parse(formData.get('specifications') as string || '{}'),
      safetyFeatures: (formData.get('safetyFeatures') as string).split('\n').filter(Boolean),
      technologyFeatures: (formData.get('technologyFeatures') as string).split('\n').filter(Boolean),
      brochureUrl: formData.get('brochureUrl') as string,
      testDriveCta: formData.get('testDriveCta') as string,
      active: formData.get('active') === 'on',
    }

    try {
      const res = await fetch('/api/vehicles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to create vehicle')
      }

      router.push('/admin/vehicles')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setSaving(false)
    }
  }

  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/vehicles" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-chery-red transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Vehicles
        </Link>
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-heading font-bold text-gray-900">Add Vehicle Model</h1>
        <p className="text-gray-500 text-sm mt-1">Create a new vehicle entry</p>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl p-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
            <input name="name" required className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-chery-red/50" placeholder="Chery Omoda 5" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Slug *</label>
            <input name="slug" required className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-chery-red/50" placeholder="omoda-5" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
            <select name="category" required className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-chery-red/50">
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Price From (IDR) *</label>
            <input name="priceFrom" type="number" required className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-chery-red/50" placeholder="389000000" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Short Description</label>
            <input name="shortDescription" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-chery-red/50" placeholder="SUV Kompak Futuristik" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
            <textarea name="description" required rows={4} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-chery-red/50" placeholder="Full description..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Exterior Image URL *</label>
            <input name="exteriorImage" required className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-chery-red/50" placeholder="/images/vehicles/omoda-5.jpg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Interior Image URL</label>
            <input name="interiorImage" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-chery-red/50" placeholder="/images/vehicles/omoda-5-interior.jpg" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Gallery (one URL per line)</label>
            <textarea name="gallery" rows={3} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-chery-red/50" placeholder="/images/vehicles/omoda-5-1.jpg&#10;/images/vehicles/omoda-5-2.jpg" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Key Features (one per line)</label>
            <textarea name="keyFeatures" rows={3} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-chery-red/50" placeholder={'10.25" Touchscreen\n360° Camera\nAdaptive Cruise Control'} />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Specifications (JSON)</label>
            <textarea name="specifications" rows={3} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-chery-red/50 font-mono text-sm" placeholder='{"engine":"1.5L Turbo","power":"156 HP","torque":"230 Nm","transmission":"CVT","seats":5,"fuelType":"Gasoline"}' />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Safety Features (one per line)</label>
            <textarea name="safetyFeatures" rows={2} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-chery-red/50" placeholder="6 Airbags&#10;ABS + EBD" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Technology Features (one per line)</label>
            <textarea name="technologyFeatures" rows={2} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-chery-red/50" placeholder="Apple CarPlay&#10;Android Auto" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Brochure URL</label>
            <input name="brochureUrl" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-chery-red/50" placeholder="https://..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Test Drive CTA</label>
            <input name="testDriveCta" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-chery-red/50" placeholder="Book Test Drive" />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" name="active" id="active" defaultChecked className="w-4 h-4 text-chery-red border-gray-300 rounded focus:ring-chery-red" />
            <label htmlFor="active" className="text-sm font-medium text-gray-700">Active</label>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
          <Link href="/admin/vehicles" className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-2 bg-chery-red text-white rounded-lg text-sm font-medium hover:bg-chery-red-dark transition-colors disabled:opacity-50"
          >
            {saving && <Loader2 className="w-4 h-4 animate-spin" />}
            {saving ? 'Saving...' : 'Create Vehicle'}
          </button>
        </div>
      </form>
    </div>
  )
}