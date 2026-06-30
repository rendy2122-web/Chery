import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import {
  Car,
  Megaphone,
  Building2,
  Newspaper,
  MessageSquare,
  HelpCircle,
  Image,
  Star,
  Layers,
  ArrowUpRight,
  ChevronRight,
} from 'lucide-react'

async function getStats() {
  const [
    users,
    vehicles,
    promotions,
    dealers,
    news,
    leads,
    faqs,
    heroSlides,
    testimonials,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.vehicle.count(),
    prisma.promotion.count(),
    prisma.dealer.count(),
    prisma.news.count(),
    prisma.lead.count(),
    prisma.faq.count(),
    prisma.heroSlide.count(),
    prisma.testimonial.count(),
  ])

  return { users, vehicles, promotions, dealers, news, leads, faqs, heroSlides, testimonials }
}

async function getRecentLeads() {
  return prisma.lead.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
    select: {
      id: true,
      name: true,
      phone: true,
      selectedModel: true,
      status: true,
      createdAt: true,
    },
  })
}

export default async function AdminDashboardPage() {
  const session = await auth()

  if (!session?.user) {
    redirect('/admin/login')
  }

  const stats = await getStats()
  const recentLeads = await getRecentLeads()

  const statCards = [
    { label: 'Vehicle Models', value: stats.vehicles, icon: Car, color: 'bg-blue-500', href: '/admin/vehicles' },
    { label: 'Hero Slides', value: stats.heroSlides, icon: Image, color: 'bg-sky-500', href: '/admin/hero-slides' },
    { label: 'Promotions', value: stats.promotions, icon: Megaphone, color: 'bg-purple-500', href: '/admin/promotions' },
    { label: 'Dealers', value: stats.dealers, icon: Building2, color: 'bg-emerald-500', href: '/admin/dealers' },
    { label: 'News', value: stats.news, icon: Newspaper, color: 'bg-orange-500', href: '/admin/news' },
    { label: 'Testimonials', value: stats.testimonials, icon: Star, color: 'bg-yellow-500', href: '/admin/testimonials' },
    { label: 'FAQ', value: stats.faqs, icon: HelpCircle, color: 'bg-teal-500', href: '/admin/faqs' },
    { label: 'Test Drive Leads', value: stats.leads, icon: MessageSquare, color: 'bg-chery-red', href: '/admin/leads' },
  ]

  const statusBadge = (status: string) => {
    const colors: Record<string, string> = {
      NEW: 'bg-blue-100 text-blue-700',
      CONTACTED: 'bg-yellow-100 text-yellow-700',
      TEST_DRIVE_SCHEDULED: 'bg-purple-100 text-purple-700',
      CLOSED: 'bg-green-100 text-green-700',
    }
    return colors[status] || 'bg-gray-100 text-gray-700'
  }

  const statusLabel = (status: string) => {
    const labels: Record<string, string> = {
      NEW: 'New',
      CONTACTED: 'Contacted',
      TEST_DRIVE_SCHEDULED: 'Test Drive',
      CLOSED: 'Closed',
    }
    return labels[status] || status
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-heading font-bold text-gray-900">
          Welcome back, {session.user.name}
        </h1>
        <p className="text-gray-500 mt-1">
          Here's an overview of your content management system.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
        {statCards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg hover:border-chery-red/20 transition-all duration-200 group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 ${card.color} rounded-lg flex items-center justify-center`}>
                <card.icon className="w-5 h-5 text-white" />
              </div>
              <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-chery-red transition-colors" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{card.value}</p>
            <p className="text-sm text-gray-500 mt-1 group-hover:text-gray-700 transition-colors">{card.label}</p>
          </Link>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Leads */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-heading font-semibold text-gray-900">Recent Test Drive Leads</h2>
            <Link href="/admin/leads" className="text-sm text-chery-red hover:text-chery-red-dark font-medium flex items-center gap-1">
              View All
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {recentLeads.length === 0 ? (
              <div className="p-8 text-center text-gray-400 text-sm">
                <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
                No leads yet
              </div>
            ) : (
              recentLeads.map((lead) => (
                <Link
                  key={lead.id}
                  href={`/admin/leads/${lead.id}`}
                  className="flex items-center justify-between px-6 py-3 hover:bg-gray-50 transition-colors"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900">{lead.name}</p>
                    <p className="text-xs text-gray-400">
                      {lead.phone}
                      {lead.selectedModel ? ` — ${lead.selectedModel}` : ''}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusBadge(lead.status)}`}>
                      {statusLabel(lead.status)}
                    </span>
                    <span className="text-xs text-gray-400">
                      {new Date(lead.createdAt).toLocaleDateString('id-ID')}
                    </span>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Quick Actions & Info */}
        <div className="space-y-4">
          {/* User Info */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-chery-red/10 rounded-full flex items-center justify-center">
                <Layers className="w-5 h-5 text-chery-red" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{session.user.name}</p>
                <p className="text-xs text-gray-400">{session.user.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-green-50 text-green-700 rounded-lg text-sm font-medium">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              System Online — {stats.users} user(s) registered
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Quick Actions</h3>
            <div className="space-y-2">
              <Link href="/admin/vehicles/new" className="flex items-center gap-2 text-sm text-gray-600 hover:text-chery-red transition-colors p-2 rounded-lg hover:bg-gray-50">
                <Car className="w-4 h-4" />
                Add New Vehicle
              </Link>
              <Link href="/admin/promotions/new" className="flex items-center gap-2 text-sm text-gray-600 hover:text-chery-red transition-colors p-2 rounded-lg hover:bg-gray-50">
                <Megaphone className="w-4 h-4" />
                Create Promotion
              </Link>
              <Link href="/admin/news/new" className="flex items-center gap-2 text-sm text-gray-600 hover:text-chery-red transition-colors p-2 rounded-lg hover:bg-gray-50">
                <Newspaper className="w-4 h-4" />
                Write News Article
              </Link>
              <Link href="/admin/hero-slides/new" className="flex items-center gap-2 text-sm text-gray-600 hover:text-chery-red transition-colors p-2 rounded-lg hover:bg-gray-50">
                <Image className="w-4 h-4" />
                Add Hero Slide
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}