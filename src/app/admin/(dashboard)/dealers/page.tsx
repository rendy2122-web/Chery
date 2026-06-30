import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import AdminTable from '../../components/AdminTable'

async function getDealers() {
  return prisma.dealer.findMany({
    orderBy: { order: 'asc' },
    select: {
      id: true,
      name: true,
      slug: true,
      city: true,
      phone: true,
      active: true,
      createdAt: true,
    },
  })
}

async function deleteDealer(id: string) {
  'use server'
  try {
    await prisma.dealer.delete({ where: { id } })
    revalidatePath('/admin/dealers')
    return { success: true }
  } catch {
    return { error: 'Failed to delete dealer' }
  }
}

export default async function DealersPage() {
  const session = await auth()
  if (!session?.user) redirect('/admin/login')

  const dealers = await getDealers()

  const data = dealers.map((d) => ({
    ...d,
    createdAt: d.createdAt.toISOString(),
  }))

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-heading font-bold text-gray-900">Dealers / Branches</h1>
          <p className="text-gray-500 text-sm mt-1">Manage dealer locations</p>
        </div>
      </div>

      <AdminTable
        title="All Dealers"
        data={data}
        columns={[
          { key: 'name', label: 'Name' },
          { key: 'city', label: 'City' },
          { key: 'phone', label: 'Phone' },
          { key: 'active', label: 'Status', format: (v: unknown) => v ? 'Active' : 'Inactive' },
        ]}
        createHref="/admin/dealers/new"
        createLabel="Add Dealer"
        rowHref={(d) => `/admin/dealers/${(d as { id: string }).id}/edit`}
        searchable
        searchPlaceholder="Search dealers..."
        filterable
        filterField="active"
        filterOptions={[
          { label: 'Active', value: 'true' },
          { label: 'Inactive', value: 'false' },
        ]}
        onDelete={async (item) => {
          const result = await deleteDealer(item.id as string)
          if ('error' in result) throw new Error(result.error)
        }}
        deleteField="name"
      />
    </div>
  )
}