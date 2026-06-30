'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Car,
  Megaphone,
  Building2,
  Newspaper,
  HelpCircle,
  MessageSquare,
  Image,
  Settings,
  ChevronDown,
  ChevronLeft,
  Menu,
  X,
  LogOut,
  Globe,
  Star,
  BarChart3,
  Shield,
} from 'lucide-react'
import { signOut } from 'next-auth/react'

interface SidebarProps {
  user: {
    name: string
    email: string
    role: string
    dealerId?: string | null
  }
}

interface NavItem {
  label: string
  href: string
  icon: React.ElementType
  roles?: string[]
  children?: { label: string; href: string }[]
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Vehicle Models', href: '/admin/vehicles', icon: Car },
  { label: 'Promotions', href: '/admin/promotions', icon: Megaphone },
  { label: 'Dealers', href: '/admin/dealers', icon: Building2 },
  { label: 'News', href: '/admin/news', icon: Newspaper },
  { label: 'FAQ', href: '/admin/faq', icon: HelpCircle },
  { label: 'Test Drive Leads', href: '/admin/leads', icon: MessageSquare },
  { label: 'Hero Slides', href: '/admin/hero-slides', icon: Star, roles: ['SUPER_ADMIN', 'CONTENT_ADMIN'] },
  { label: 'Technology', href: '/admin/technology', icon: Globe, roles: ['SUPER_ADMIN', 'CONTENT_ADMIN'] },
  { label: 'Testimonials', href: '/admin/testimonials', icon: Star, roles: ['SUPER_ADMIN', 'CONTENT_ADMIN'] },
  { label: 'Media Library', href: '/admin/media', icon: Image, roles: ['SUPER_ADMIN', 'CONTENT_ADMIN'] },
  {
    label: 'Settings',
    href: '#',
    icon: Settings,
    roles: ['SUPER_ADMIN'],
    children: [
      { label: 'Users', href: '/admin/users' },
      { label: 'Global SEO', href: '/admin/seo' },
      { label: 'Financing', href: '/admin/financing' },
    ],
  },
]

export default function AdminSidebar({ user }: SidebarProps) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)

  const userRole = user.role

  function canAccess(item: NavItem): boolean {
    if (!item.roles) return true
    return item.roles.includes(userRole)
  }

  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin'
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md border border-gray-200"
      >
        {sidebarOpen ? (
          <X className="w-5 h-5 text-gray-700" />
        ) : (
          <Menu className="w-5 h-5 text-gray-700" />
        )}
      </button>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-full w-[260px] bg-white border-r border-gray-200 shadow-xl transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="h-[64px] flex items-center gap-3 px-6 border-b border-gray-100">
          <img 
            src="https://cheryidn.sgp1.cdn.digitaloceanspaces.com/prod/logo.webp" 
            alt="Chery Logo" 
            className="w-8 h-8 object-contain flex-shrink-0"
          />
          <div>
            <h1 className="font-heading font-bold text-base text-gray-900">CHERY CMS</h1>
            <p className="text-[10px] text-gray-400 uppercase tracking-wider">Content Management</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-64px)]">
          {navItems.map((item) => {
            if (!canAccess(item)) return null

            const active = isActive(item.href)
            const hasChildren = item.children && item.children.length > 0
            const Icon = item.icon

            if (hasChildren) {
              return (
                <div key={item.label}>
                  <button
                    onClick={() => setSettingsOpen(!settingsOpen)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                      settingsOpen
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span className="flex-1 text-left">{item.label}</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        settingsOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {settingsOpen && item.children && (
                    <div className="ml-8 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setSidebarOpen(false)}
                          className={`block px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                            isActive(child.href)
                              ? 'bg-chery-red/10 text-chery-red font-medium'
                              : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                          }`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  active
                    ? 'bg-chery-red/10 text-chery-red'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span>{item.label}</span>
                {active && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-chery-red" />
                )}
              </Link>
            )
          })}

          {/* Divider */}
          <div className="border-t border-gray-100 my-4" />

          {/* Role Badge */}
          <div className="px-3 py-2">
            <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
              <Shield className="w-3.5 h-3.5" />
              <span className="uppercase tracking-wider">Role: {user.role.replace('_', ' ')}</span>
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={() => signOut({ callbackUrl: '/admin/login' })}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all duration-200"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <span>Logout</span>
          </button>
        </nav>
      </aside>
    </>
  )
}