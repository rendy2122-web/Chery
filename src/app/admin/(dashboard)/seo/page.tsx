import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function SeoAdminPage() {
  const session = await auth()
  if (!session?.user) redirect('/admin/login')

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
      <h1 className="text-2xl font-heading font-bold text-gray-900 mb-2">Global SEO Settings</h1>
      <p className="text-gray-500 text-sm mb-6">Manage global search engine optimization tags and metadata.</p>
      <div className="border border-dashed border-gray-200 rounded-xl p-12 text-center bg-gray-50">
        <p className="text-gray-400 font-medium">Global SEO Settings are under construction.</p>
      </div>
    </div>
  )
}
