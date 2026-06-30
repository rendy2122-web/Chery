import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    // Public endpoint - allow unauthenticated access for homepage
    const slides = await prisma.heroSlide.findMany({
      orderBy: { order: 'asc' },
    })

    return NextResponse.json(slides)
  } catch (error) {
    console.error('Error fetching hero slides:', error)
    return NextResponse.json({ error: 'Failed to fetch hero slides' }, { status: 500 })
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

    if (!mediaUrl) {
      return NextResponse.json({ error: 'Media URL is required' }, { status: 400 })
    }

    const slide = await prisma.heroSlide.create({
      data: {
        type: type || 'IMAGE',
        title,
        subtitle,
        description,
        mediaUrl,
        ctaLabel,
        ctaUrl,
        order: order ?? 0,
        active: active ?? true,
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
        duration: duration ?? 6000,
      },
    })

    return NextResponse.json(slide, { status: 201 })
  } catch (error) {
    console.error('Error creating hero slide:', error)
    return NextResponse.json({ error: 'Failed to create hero slide' }, { status: 500 })
  }
}