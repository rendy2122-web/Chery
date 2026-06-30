'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function EditFinancingPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({
    defaultInterestRate: 0,
    tenorOptions: '',
    dpOptions: '',
    adminFeeNote: '',
    disclaimerText: '',
    ctaLabel: '',
    ctaUrl: '',
  })

  useEffect(() => {
    fetch(`/api/financing/${params.id}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) throw new Error(data.error)
        setForm({
          defaultInterestRate: data.defaultInterestRate || 0,
          tenorOptions: data.tenorOptions || '',
          dpOptions: data.dpOptions || '',
          adminFeeNote: data.adminFeeNote || '',
          disclaimerText: data.disclaimerText || '',
          ctaLabel: data.ctaLabel || '',
          ctaUrl: data.ctaUrl || '',
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

    const res = await fetch(`/api/financing/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    if (!res.ok) {
      const data = await res.json()
      throw new Error(data.error || 'Failed to update financing')
    }

    router.push('/admin/financing')
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
        <Link href="/admin/financing" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-chery-red transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Financing
        </Link>
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-heading font-bold text-gray-900">Edit Financing Settings</h1>
        <p className="text-gray-500 text-sm mt-1">Update financing configuration</p>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl p-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Default Interest Rate (%) *</label>
            <input name="defaultInterestRate" type="number" step="0.1" value={form.defaultInterestRate} onChange={e => setForm({ ...form, defaultInterestRate: parseFloat(e.target.value) || 0 })} required className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-chery-red/50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Admin Fee Note</label>
            <input name="adminFeeNote" value={form.adminFeeNote} onChange={e => setForm({ ...form, adminFeeNote: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-chery-red/50" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Tenor Options *</label>
            <textarea name="tenorOptions" value={form.tenorOptions} onChange={e => setForm({ ...form, tenorOptions: e.target.value })} required rows={2} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-chery-red/50" placeholder="12, 24, 36, 48, 60 months" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">DP Options *</label>
            <textarea name="dpOptions" value={form.dpOptions} onChange={e => setForm({ ...form, dpOptions: e.target.value })} required rows={2} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-chery-red/50" placeholder="10%, 20%, 30%" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Disclaimer Text</label>
            <textarea name="disclaimerText" value={form.disclaimerText} onChange={e => setForm({ ...form, disclaimerText: e.target.value })} rows={3} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-chery-red/50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">CTA Label</label>
            <input name="ctaLabel" value={form.ctaLabel} onChange={e => setForm({ ...form, ctaLabel: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-chery-red/50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">CTA URL</label>
            <input name="ctaUrl" value={form.ctaUrl} onChange={e => setForm({ ...form, ctaUrl: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-chery-red/50" />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
          <Link href="/admin/financing" className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-2 bg-chery-red text-white rounded-lg text-sm font-medium hover:bg-chery-red-dark transition-colors disabled:opacity-50"
          >
            {saving && <Loader2 className="w-4 h-4 animate-spin" />}
            {saving ? 'Saving...' : 'Update Financing'}
          </button>
        </div>
      </form>
    </div>
  )
}