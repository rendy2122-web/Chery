'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Loader2, Upload } from 'lucide-react'
import Link from 'next/link'

export default function NewMediaPage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [preview, setPreview] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSaving(true)
    setError('')

    const form = e.currentTarget
    const formData = new FormData(form)

    const payload = {
      filename: formData.get('filename') as string,
      originalName: formData.get('originalName') as string,
      mimeType: formData.get('mimeType') as string,
      size: parseInt(formData.get('size') as string || '0'),
      url: formData.get('url') as string,
      altText: formData.get('altText') as string,
      caption: formData.get('caption') as string,
      uploadedBy: 'admin',
    }

    try {
      const res = await fetch('/api/media', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to upload media')
      }

      router.push('/admin/media')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setSaving(false)
    }
  }

  function handleUrlChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPreview(e.target.value)
  }

  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/media" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-chery-red transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Media
        </Link>
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-heading font-bold text-gray-900">Upload Media</h1>
        <p className="text-gray-500 text-sm mt-1">Add images or videos to media library</p>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl p-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">File Name *</label>
            <input name="filename" required className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-chery-red/50" placeholder="hero-banner.jpg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Original Name *</label>
            <input name="originalName" required className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-chery-red/50" placeholder="hero-banner.jpg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">MIME Type *</label>
            <input name="mimeType" required className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-chery-red/50" placeholder="image/jpeg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Size (bytes) *</label>
            <input name="size" type="number" required className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-chery-red/50" placeholder="102400" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">URL *</label>
            <input name="url" required className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-chery-red/50" placeholder="/images/hero-banner.jpg" onChange={handleUrlChange} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Alt Text</label>
            <input name="altText" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-chery-red/50" placeholder="Chery Omoda 5" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Caption</label>
            <input name="caption" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-chery-red/50" placeholder="Hero banner image" />
          </div>
        </div>

        {preview && (
          <div className="border border-gray-200 rounded-lg p-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Preview</label>
            <img src={preview} alt="Preview" className="max-w-md rounded-lg" onError={() => setPreview(null)} />
          </div>
        )}

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
          <Link href="/admin/media" className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-2 bg-chery-red text-white rounded-lg text-sm font-medium hover:bg-chery-red-dark transition-colors disabled:opacity-50"
          >
            {saving && <Loader2 className="w-4 h-4 animate-spin" />}
            {saving ? 'Uploading...' : 'Upload Media'}
          </button>
        </div>
      </form>
    </div>
  )
}