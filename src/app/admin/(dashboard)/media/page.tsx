import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { redirect } from 'next/navigation'
import AdminTable from '../../components/AdminTable'

async function getMedia() {
  return prisma.media.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      filename: true,
      originalName: true,
      mimeType: true,
      size: true,
      url: true,
      altText: true,
      caption: true,
      createdAt: true,
    },
  })
}

export default async function MediaPage() {
  const session = await auth()
  if (!session?.user) redirect('/admin/login')

  const media = await getMedia()

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-heading font-bold text-gray-900">Media Library</h1>
        <p className="text-gray-500 text-sm mt-1">Manage images and videos</p>
      </div>

      <AdminTable
        title="All Media"
        data={media as Record<string, unknown>[]}
        columns={[
          { key: 'originalName', label: 'File Name' },
          { key: 'mimeType', label: 'Type' },
          { key: 'size', label: 'Size', formatType: 'fileSize' },
          { key: 'createdAt', label: 'Uploaded', formatType: 'date' },
        ]}
        createHref="/admin/media/new"
        createLabel="Upload Media"
        rowHrefPattern="/admin/media/{id}/edit"
        rowHrefField="id"
      />
    </div>
  )
}