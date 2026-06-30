import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function UsersAdminPage() {
  const session = await auth()
  if (!session?.user) redirect('/admin/login')

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
      <h1 className="text-2xl font-heading font-bold text-gray-900 mb-2">User Administration</h1>
      <p className="text-gray-500 text-sm mb-6">Manage administrator and staff login accounts.</p>
      <div className="border border-dashed border-gray-200 rounded-xl p-12 text-center bg-gray-50">
        <p className="text-gray-400 font-medium">User Management is under construction.</p>
      </div>
    </div>
  )
}
