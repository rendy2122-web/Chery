import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const media = await prisma.media.findMany({
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(media)
  } catch (error) {
    console.error('Error fetching media:', error)
    return NextResponse.json({ error: 'Failed to fetch media' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const {
      filename,
      originalName,
      mimeType,
      size,
      url,
      altText,
      caption,
      uploadedBy,
    } = body

    if (!filename || !originalName || !mimeType || !size || !url) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const media = await prisma.media.create({
      data: {
        filename,
        originalName,
        mimeType,
        size,
        url,
        altText,
        caption,
        uploadedBy: uploadedBy || session.user.name || 'Unknown',
      },
    })

    return NextResponse.json(media, { status: 201 })
  } catch (error) {
    console.error('Error creating media:', error)
    return NextResponse.json({ error: 'Failed to create media' }, { status: 500 })
  }
}