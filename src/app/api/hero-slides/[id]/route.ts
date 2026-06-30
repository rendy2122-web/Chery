import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const slide = await prisma.heroSlide.findUnique({
      where: { id: params.id },
    })

    if (!slide) {
      return NextResponse.json({ error: 'Slide not found' }, { status: 404 })
    }

    return NextResponse.json(slide)
  } catch (error) {
    console.error('Error fetching hero slide:', error)
    return NextResponse.json({ error: 'Failed to fetch hero slide' }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const {
      type,
      title,
      subtitle,
      description,
      mediaUrl,
      ctaLabel,
      ctaUrl,
      order,
      active,
      startDate,
      endDate,
      duration,
    } = body

    const slide = await prisma.heroSlide.update({
      where: { id: params.id },
      data: {
        type,
        title,
        subtitle,
        description,
        mediaUrl,
        ctaLabel,
        ctaUrl,
        order,
        active,
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
        duration: duration ?? 6000,
      },
    })

    return NextResponse.json(slide)
  } catch (error) {
    console.error('Error updating hero slide:', error)
    return NextResponse.json({ error: 'Failed to update hero slide' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await prisma.heroSlide.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting hero slide:', error)
    return NextResponse.json({ error: 'Failed to delete hero slide' }, { status: 500 })
  }
}