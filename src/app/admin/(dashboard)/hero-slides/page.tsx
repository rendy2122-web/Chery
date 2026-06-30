import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import AdminTable from '../../components/AdminTable'

async function getHeroSlides() {
  return prisma.heroSlide.findMany({
    orderBy: { order: 'asc' },
    select: {
      id: true,
      type: true,
      title: true,
      subtitle: true,
      mediaUrl: true,
      order: true,
      active: true,
      duration: true,
      startDate: true,
      endDate: true,
      createdAt: true,
    },
  })
}

async function deleteSlide(id: string) {
  'use server'
  await prisma.heroSlide.delete({ where: { id } })
  revalidatePath('/admin/hero-slides')
}

export default async function HeroSlidesPage() {
  const session = await auth()
  if (!session?.user) redirect('/admin/login')

  const slides = await getHeroSlides()

  const slidesWithActions = slides.map((s) => ({
    ...s,
    startDate: s.startDate?.toISOString() ?? null,
    endDate: s.endDate?.toISOString() ?? null,
    createdAt: s.createdAt.toISOString(),
  }))

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-heading font-bold text-gray-900">Hero Slides</h1>
          <p className="text-gray-500 text-sm mt-1">Manage homepage hero slideshow</p>
        </div>
      </div>

      <AdminTable
        title="All Slides"
        data={slidesWithActions as Record<string, unknown>[]}
        columns={[
          { key: 'type', label: 'Type' },
          { key: 'title', label: 'Title' },
          { key: 'order', label: 'Order' },
          { key: 'duration', label: 'Duration', formatType: 'durationMs' },
          { key: 'active', label: 'Status', formatType: 'boolean' },
          { key: 'startDate', label: 'Start', formatType: 'date' },
          { key: 'endDate', label: 'End', formatType: 'date' }
        ]}
        createHref="/admin/hero-slides/new"
        createLabel="Add Slide"
        rowHrefPattern="/admin/hero-slides/{id}/edit"
        rowHrefField="id"
        searchable
        searchPlaceholder="Search slides..."
        filterable
        filterField="type"
        filterOptions={[
          { label: 'Image', value: 'IMAGE' },
          { label: 'Video', value: 'VIDEO' },
          { label: 'Copy', value: 'COPY' },
        ]}
        onDelete={deleteSlide}
        deleteField="title"
      />
    </div>
  )
}