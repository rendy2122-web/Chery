import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import AdminTable from '../../components/AdminTable'

async function getVehicles() {
  return prisma.vehicle.findMany({
    orderBy: { order: 'asc' },
    select: {
      id: true,
      name: true,
      slug: true,
      category: true,
      priceFrom: true,
      active: true,
      createdAt: true,
    },
  })
}

async function deleteVehicle(id: string) {
  'use server'
  try {
    await prisma.vehicle.delete({ where: { id } })
    revalidatePath('/admin/vehicles')
    return { success: true }
  } catch {
    return { error: 'Failed to delete vehicle' }
  }
}

export default async function VehiclesPage() {
  const session = await auth()
  if (!session?.user) redirect('/admin/login')

  const vehicles = await getVehicles()

  const data = vehicles.map((v) => ({
    ...v,
    createdAt: v.createdAt.toISOString(),
  }))

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-heading font-bold text-gray-900">Vehicle Models</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your vehicle lineup</p>
        </div>
      </div>

      <AdminTable
        title="All Vehicles"
        data={data}
        columns={[
          { key: 'name', label: 'Name' },
          { key: 'category', label: 'Category' },
          { key: 'priceFrom', label: 'Price From', format: (v: unknown) => {
              const val = v as number
              return val ? `Rp ${(val / 1000000).toFixed(0)}M` : '-'
            }
          },
          { key: 'active', label: 'Status', format: (v: unknown) => v ? 'Active' : 'Inactive' },
        ]}
        createHref="/admin/vehicles/new"
        createLabel="Add Vehicle"
        rowHref={(v) => `/admin/vehicles/${(v as { id: string }).id}/edit`}
        searchable
        searchPlaceholder="Search vehicles..."
        filterable
        filterField="category"
        filterOptions={[
          { label: 'SUV', value: 'SUV' },
          { label: 'Hybrid', value: 'Hybrid' },
          { label: 'EV', value: 'EV' },
          { label: 'ICE', value: 'ICE' },
        ]}
        onDelete={async (item) => {
          const result = await deleteVehicle(item.id as string)
          if ('error' in result) throw new Error(result.error)
        }}
        deleteField="name"
      />
    </div>
  )
}