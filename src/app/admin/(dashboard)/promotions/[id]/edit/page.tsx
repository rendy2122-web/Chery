'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function EditPromotionPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({
    title: '',
    slug: '',
    imageUrl: '',
    description: '',
    relatedModel: '',
    startDate: '',
    endDate: '',
    terms: '',
    ctaLabel: '',
    ctaUrl: '',
    active: true,
  })

  useEffect(() => {
    fetch(`/api/promotions/${params.id}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) throw new Error(data.error)
        const p = data
        setForm({
          title: p.title || '',
          slug: p.slug || '',
          imageUrl: p.imageUrl || '',
          description: p.description || '',
          relatedModel: p.relatedModel || '',
          startDate: p.startDate ? new Date(p.startDate).toISOString().split('T')[0] : '',
          endDate: p.endDate ? new Date(p.endDate).toISOString().split('T')[0] : '',
          terms: p.terms || '',
          ctaLabel: p.ctaLabel || '',
          ctaUrl: p.ctaUrl || '',
          active: p.active ?? true,
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

    const res = await fetch(`/api/promotions/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    if (!res.ok) {
      const data = await res.json()
      throw new Error(data.error || 'Failed to update promotion')
    }

    router.push('/admin/promotions')
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
        <Link href="/admin/promotions" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-chery-red transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Promotions
        </Link>
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-heading font-bold text-gray-900">Edit Promotion</h1>
        <p className="text-gray-500 text-sm mt-1">Update promotional campaign</p>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl p-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
            <input name="title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-chery-red/50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Slug *</label>
            <input name="slug" value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} required className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-chery-red/50" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Image URL *</label>
            <input name="imageUrl" value={form.imageUrl} onChange={e => setForm({ ...form, imageUrl: e.target.value })} required className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-chery-red/50" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
            <textarea name="description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required rows={4} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-chery-red/50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Related Model</label>
            <input name="relatedModel" value={form.relatedModel} onChange={e => setForm({ ...form, relatedModel: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-chery-red/50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Start Date *</label>
            <input name="startDate" type="date" value={form.startDate} onChange={e => setForm({ ...form, startDate: e.target.value })} required className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-chery-red/50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">End Date *</label>
            <input name="endDate" type="date" value={form.endDate} onChange={e => setForm({ ...form, endDate: e.target.value })} required className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-chery-red/50" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Terms & Conditions</label>
            <textarea name="terms" value={form.terms} onChange={e => setForm({ ...form, terms: e.target.value })} rows={3} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-chery-red/50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">CTA Label</label>
            <input name="ctaLabel" value={form.ctaLabel} onChange={e => setForm({ ...form, ctaLabel: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-chery-red/50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">CTA URL</label>
            <input name="ctaUrl" value={form.ctaUrl} onChange={e => setForm({ ...form, ctaUrl: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-chery-red/50" />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" name="active" id="active" checked={form.active} onChange={e => setForm({ ...form, active: e.target.checked })} className="w-4 h-4 text-chery-red border-gray-300 rounded focus:ring-chery-red" />
            <label htmlFor="active" className="text-sm font-medium text-gray-700">Active</label>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
          <Link href="/admin/promotions" className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-2 bg-chery-red text-white rounded-lg text-sm font-medium hover:bg-chery-red-dark transition-colors disabled:opacity-50"
          >
            {saving && <Loader2 className="w-4 h-4 animate-spin" />}
            {saving ? 'Saving...' : 'Update Promotion'}
          </button>
        </div>
      </form>
    </div>
  )
}