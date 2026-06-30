import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import AdminSidebar from '../components/AdminSidebar'
import AdminTopbar from '../components/AdminTopbar'
import { ToastProvider } from '../components/Toast'

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session?.user) {
    redirect('/admin/login')
  }

  return (
    <ToastProvider>
      <div className="min-h-screen bg-gray-50">
        <AdminSidebar user={session.user} />
        <div className="lg:pl-[260px]">
          <AdminTopbar user={session.user} />
          <main className="p-6 lg:p-8 pt-[80px]">
            {children}
          </main>
        </div>
      </div>
    </ToastProvider>
  )
}
