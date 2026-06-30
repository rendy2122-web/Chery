'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Loader2 } from 'lucide-react'
import Link from 'next/link'

const categories = ['SUV', 'Hybrid', 'EV', 'ICE']

export default function EditVehiclePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({
    name: '',
    slug: '',
    category: 'SUV',
    priceFrom: '',
    description: '',
    shortDescription: '',
    exteriorImage: '',
    interiorImage: '',
    gallery: '',
    keyFeatures: '',
    specifications: '{}',
    safetyFeatures: '',
    technologyFeatures: '',
    brochureUrl: '',
    testDriveCta: '',
    active: true,
  })

  useEffect(() => {
    fetch(`/api/vehicles/${params.id}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) throw new Error(data.error)
        const v = data
        setForm({
          name: v.name || '',
          slug: v.slug || '',
          category: v.category || 'SUV',
          priceFrom: v.priceFrom?.toString() || '',
          description: v.description || '',
          shortDescription: v.shortDescription || '',
          exteriorImage: v.exteriorImage || '',
          interiorImage: v.interiorImage || '',
          gallery: Array.isArray(v.gallery) ? v.gallery.join('\n') : '',
          keyFeatures: Array.isArray(v.keyFeatures) ? v.keyFeatures.join('\n') : '',
          specifications: typeof v.specifications === 'string' ? v.specifications : JSON.stringify(v.specifications || {}, null, 2),
          safetyFeatures: Array.isArray(v.safetyFeatures) ? v.safetyFeatures.join('\n') : '',
          technologyFeatures: Array.isArray(v.technologyFeatures) ? v.technologyFeatures.join('\n') : '',
          brochureUrl: v.brochureUrl || '',
          testDriveCta: v.testDriveCta || '',
          active: v.active ?? true,
        })
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [params.id])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSaving(true)
    setError('')

    const payload = {
      ...form,
      priceFrom: parseFloat(form.priceFrom),
      gallery: form.gallery.split('\n').filter(Boolean),
      keyFeatures: form.keyFeatures.split('\n').filter(Boolean),
      specifications: JSON.parse(form.specifications || '{}'),
      safetyFeatures: form.safetyFeatures.split('\n').filter(Boolean),
      technologyFeatures: form.technologyFeatures.split('\n').filter(Boolean),
    }

    const res = await fetch(`/api/vehicles/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const data = await res.json()
      throw new Error(data.error || 'Failed to update vehicle')
    }

    router.push('/admin/vehicles')
    router.refresh()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-chery-red" />
      </div>
    )
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
        <h1 className="text-2xl font-heading font-bold text-gray-900">Edit Vehicle Model</h1>
        <p className="text-gray-500 text-sm mt-1">Update vehicle details</p>
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
            <input name="name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-chery-red/50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Slug *</label>
            <input name="slug" value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} required className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-chery-red/50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
            <select name="category" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} required className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-chery-red/50">
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Price From (IDR) *</label>
            <input name="priceFrom" type="number" value={form.priceFrom} onChange={e => setForm({ ...form, priceFrom: e.target.value })} required className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-chery-red/50" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Short Description</label>
            <input name="shortDescription" value={form.shortDescription} onChange={e => setForm({ ...form, shortDescription: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-chery-red/50" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
            <textarea name="description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required rows={4} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-chery-red/50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Exterior Image URL *</label>
            <input name="exteriorImage" value={form.exteriorImage} onChange={e => setForm({ ...form, exteriorImage: e.target.value })} required className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-chery-red/50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Interior Image URL</label>
            <input name="interiorImage" value={form.interiorImage} onChange={e => setForm({ ...form, interiorImage: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-chery-red/50" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Gallery (one URL per line)</label>
            <textarea name="gallery" value={form.gallery} onChange={e => setForm({ ...form, gallery: e.target.value })} rows={3} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-chery-red/50" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Key Features (one per line)</label>
            <textarea name="keyFeatures" value={form.keyFeatures} onChange={e => setForm({ ...form, keyFeatures: e.target.value })} rows={3} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-chery-red/50" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Specifications (JSON)</label>
            <textarea name="specifications" value={form.specifications} onChange={e => setForm({ ...form, specifications: e.target.value })} rows={3} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-chery-red/50 font-mono text-sm" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Safety Features (one per line)</label>
            <textarea name="safetyFeatures" value={form.safetyFeatures} onChange={e => setForm({ ...form, safetyFeatures: e.target.value })} rows={2} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-chery-red/50" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Technology Features (one per line)</label>
            <textarea name="technologyFeatures" value={form.technologyFeatures} onChange={e => setForm({ ...form, technologyFeatures: e.target.value })} rows={2} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-chery-red/50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Brochure URL</label>
            <input name="brochureUrl" value={form.brochureUrl} onChange={e => setForm({ ...form, brochureUrl: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-chery-red/50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Test Drive CTA</label>
            <input name="testDriveCta" value={form.testDriveCta} onChange={e => setForm({ ...form, testDriveCta: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-chery-red/50" />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" name="active" id="active" checked={form.active} onChange={e => setForm({ ...form, active: e.target.checked })} className="w-4 h-4 text-chery-red border-gray-300 rounded focus:ring-chery-red" />
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
            {saving ? 'Saving...' : 'Update Vehicle'}
          </button>
        </div>
      </form>
    </div>
  )
}