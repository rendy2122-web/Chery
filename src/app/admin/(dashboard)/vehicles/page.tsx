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
  await prisma.vehicle.delete({ where: { id } })
  revalidatePath('/admin/vehicles')
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
          { key: 'priceFrom', label: 'Price From', formatType: 'currencyM' },
          { key: 'active', label: 'Status', formatType: 'boolean' },
        ]}
        createHref="/admin/vehicles/new"
        createLabel="Add Vehicle"
        rowHrefPattern="/admin/vehicles/{id}/edit"
        rowHrefField="id"
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
        onDelete={deleteVehicle}
        deleteField="name"
      />
    </div>
  )
}