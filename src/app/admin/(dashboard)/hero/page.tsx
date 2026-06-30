import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { redirect } from 'next/navigation'
import { ArrowLeft, Loader2 } from 'lucide-react'
import Link from 'next/link'

async function getHero() {
  return prisma.hero.findFirst()
}

export default async function HeroPage() {
  const session = await auth()
  if (!session?.user) redirect('/admin/login')

  const hero = await getHero()

  if (!hero) {
    return (
      <div>
        <div className="mb-6">
          <h1 className="text-2xl font-heading font-bold text-gray-900">Hero Section</h1>
          <p className="text-gray-500 text-sm mt-1">Manage homepage hero content</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <p className="text-gray-500 mb-4">No hero content yet</p>
          <Link href="/admin/hero/new" className="inline-flex items-center gap-2 px-4 py-2 bg-chery-red text-white rounded-lg text-sm font-medium hover:bg-chery-red-dark transition-colors">
            Create Hero Content
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-heading font-bold text-gray-900">Hero Section</h1>
        <p className="text-gray-500 text-sm mt-1">Manage homepage hero content</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-500 mb-1">Title</label>
            <p className="text-gray-900 font-medium text-lg">{hero.title}</p>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-500 mb-1">Subtitle</label>
            <p className="text-gray-900">{hero.subtitle}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Primary CTA</label>
            <p className="text-gray-900">{hero.ctaPrimary || '-'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Secondary CTA</label>
            <p className="text-gray-900">{hero.ctaSecondary || '-'}</p>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-500 mb-1">Image/Video URL</label>
            <p className="text-gray-900">{hero.imageUrl || '-'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Status</label>
            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${hero.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
              {hero.active ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-100">
          <Link href={`/admin/hero/${hero.id}/edit`} className="inline-flex items-center gap-2 px-4 py-2 bg-chery-red text-white rounded-lg text-sm font-medium hover:bg-chery-red-dark transition-colors">
            Edit Hero Content
          </Link>
        </div>
      </div>
    </div>
  )
}