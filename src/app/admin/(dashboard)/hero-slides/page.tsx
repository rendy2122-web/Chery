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
  try {
    await prisma.heroSlide.delete({ where: { id } })
    revalidatePath('/admin/hero-slides')
    return { success: true }
  } catch (error) {
    return { error: 'Failed to delete slide' }
  }
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
          { key: 'duration', label: 'Duration', format: (v: unknown) => {
              const d = v as number
              return d ? `${d / 1000}s` : '6s'
            }
          },
          { 
            key: 'active', 
            label: 'Status', 
            format: (v: unknown) => v ? 'Active' : 'Inactive' 
          },
          { key: 'startDate', label: 'Start', format: (v: unknown) => {
              const date = v as string | null
              if (!date) return '-'
              return new Date(date).toLocaleDateString('id-ID')
            }
          },
          { key: 'endDate', label: 'End', format: (v: unknown) => {
              const date = v as string | null
              if (!date) return '-'
              return new Date(date).toLocaleDateString('id-ID')
            }
          }
        ]}
        createHref="/admin/hero-slides/new"
        createLabel="Add Slide"
        rowHref={(s) => `/admin/hero-slides/${(s as { id: string }).id}/edit`}
        searchable
        searchPlaceholder="Search slides..."
        filterable
        filterField="type"
        filterOptions={[
          { label: 'Image', value: 'IMAGE' },
          { label: 'Video', value: 'VIDEO' },
          { label: 'Copy', value: 'COPY' },
        ]}
        onDelete={async (item) => {
          const result = await deleteSlide(item.id as string)
          if ('error' in result) throw new Error(result.error)
        }}
        deleteField="title"
      />
    </div>
  )
}