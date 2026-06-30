import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { redirect } from 'next/navigation'

async function getAnalytics() {
  const [
    totalVehicles,
    totalPromotions,
    totalDealers,
    totalNews,
    totalLeads,
    totalTestimonials,
    recentLeads,
  ] = await Promise.all([
    prisma.vehicle.count(),
    prisma.promotion.count(),
    prisma.dealer.count(),
    prisma.news.count(),
    prisma.lead.count(),
    prisma.testimonial.count(),
    prisma.lead.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10,
      select: {
        id: true,
        name: true,
        selectedModel: true,
        status: true,
        createdAt: true,
      },
    }),
  ])

  return {
    totalVehicles,
    totalPromotions,
    totalDealers,
    totalNews,
    totalLeads,
    totalTestimonials,
    recentLeads,
  }
}

export default async function AnalyticsPage() {
  const session = await auth()
  if (!session?.user) redirect('/admin/login')

  const analytics = await getAnalytics()

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-heading font-bold text-gray-900">Analytics Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Overview of your CMS content</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="text-sm font-medium text-gray-500 mb-2">Total Vehicles</div>
          <div className="text-3xl font-bold text-gray-900">{analytics.totalVehicles}</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="text-sm font-medium text-gray-500 mb-2">Total Promotions</div>
          <div className="text-3xl font-bold text-gray-900">{analytics.totalPromotions}</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="text-sm font-medium text-gray-500 mb-2">Total Dealers</div>
          <div className="text-3xl font-bold text-gray-900">{analytics.totalDealers}</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="text-sm font-medium text-gray-500 mb-2">Total News</div>
          <div className="text-3xl font-bold text-gray-900">{analytics.totalNews}</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="text-sm font-medium text-gray-500 mb-2">Total Leads</div>
          <div className="text-3xl font-bold text-gray-900">{analytics.totalLeads}</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="text-sm font-medium text-gray-500 mb-2">Total Testimonials</div>
          <div className="text-3xl font-bold text-gray-900">{analytics.totalTestimonials}</div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-heading font-bold text-gray-900 mb-4">Recent Leads</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Name</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Model</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Status</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Date</th>
              </tr>
            </thead>
            <tbody>
              {analytics.recentLeads.map((lead) => (
                <tr key={lead.id} className="border-b border-gray-100">
                  <td className="py-3 px-4 text-sm text-gray-900">{lead.name}</td>
                  <td className="py-3 px-4 text-sm text-gray-900">{lead.selectedModel || '-'}</td>
                  <td className="py-3 px-4 text-sm text-gray-900">{lead.status}</td>
                  <td className="py-3 px-4 text-sm text-gray-900">
                    {new Date(lead.createdAt).toLocaleDateString('id-ID')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}