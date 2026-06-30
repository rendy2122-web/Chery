'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function NewPromotionPage() {
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
      title: formData.get('title') as string,
      slug: formData.get('slug') as string,
      imageUrl: formData.get('imageUrl') as string,
      description: formData.get('description') as string,
      relatedModel: formData.get('relatedModel') as string,
      startDate: formData.get('startDate') as string,
      endDate: formData.get('endDate') as string,
      terms: formData.get('terms') as string,
      ctaLabel: formData.get('ctaLabel') as string,
      ctaUrl: formData.get('ctaUrl') as string,
      active: formData.get('active') === 'on',
    }

    try {
      const res = await fetch('/api/promotions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to create promotion')
      }

      router.push('/admin/promotions')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setSaving(false)
    }
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
        <h1 className="text-2xl font-heading font-bold text-gray-900">Add Promotion</h1>
        <p className="text-gray-500 text-sm mt-1">Create a new promotional campaign</p>
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
            <input name="title" required className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-chery-red/50" placeholder="Promo Lebaran" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Slug *</label>
            <input name="slug" required className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-chery-red/50" placeholder="promo-lebaran" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Image URL *</label>
            <input name="imageUrl" required className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-chery-red/50" placeholder="/images/promos/lebaran.jpg" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
            <textarea name="description" required rows={4} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-chery-red/50" placeholder="Promo description..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Related Model</label>
            <input name="relatedModel" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-chery-red/50" placeholder="Omoda 5" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Start Date *</label>
            <input name="startDate" type="date" required className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-chery-red/50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">End Date *</label>
            <input name="endDate" type="date" required className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-chery-red/50" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Terms & Conditions</label>
            <textarea name="terms" rows={3} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-chery-red/50" placeholder="Promo terms..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">CTA Label</label>
            <input name="ctaLabel" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-chery-red/50" placeholder="Book Now" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">CTA URL</label>
            <input name="ctaUrl" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-chery-red/50" placeholder="https://..." />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" name="active" id="active" defaultChecked className="w-4 h-4 text-chery-red border-gray-300 rounded focus:ring-chery-red" />
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
            {saving ? 'Saving...' : 'Create Promotion'}
          </button>
        </div>
      </form>
    </div>
  )
}