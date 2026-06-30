import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { redirect } from 'next/navigation'

async function getPreviewData(entityType: string, entityId: string) {
  switch (entityType) {
    case 'vehicles':
      return prisma.vehicle.findUnique({ where: { id: entityId } })
    case 'promotions':
      return prisma.promotion.findUnique({ where: { id: entityId } })
    case 'dealers':
      return prisma.dealer.findUnique({ where: { id: entityId } })
    case 'news':
      return prisma.news.findUnique({ where: { id: entityId } })
    case 'faqs':
      return prisma.faq.findUnique({ where: { id: entityId } })
    case 'testimonials':
      return prisma.testimonial.findUnique({ where: { id: entityId } })
    default:
      return null
  }
}

export default async function PreviewPage({ params }: { params: { entityType: string; entityId: string } }) {
  const session = await auth()
  if (!session?.user) redirect('/admin/login')

  const data = await getPreviewData(params.entityType, params.entityId)

  if (!data) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Preview not available</p>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-gray-900">Preview Mode</h1>
          <p className="text-gray-500 text-sm mt-1">This is how your content will appear on the frontend</p>
        </div>
        <a
          href={`/api/preview?entityType=${params.entityType}&entityId=${params.entityId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-chery-red text-white rounded-lg text-sm font-medium hover:bg-chery-red-dark transition-colors"
        >
          Open in New Tab
        </a>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <pre className="text-sm text-gray-700 whitespace-pre-wrap overflow-auto">
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    </div>
  )
}