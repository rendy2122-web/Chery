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

    const hero = await prisma.hero.findUnique({
      where: { id: params.id },
    })

    if (!hero) {
      return NextResponse.json({ error: 'Hero not found' }, { status: 404 })
    }

    return NextResponse.json(hero)
  } catch (error) {
    console.error('Error fetching hero:', error)
    return NextResponse.json({ error: 'Failed to fetch hero' }, { status: 500 })
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
    const { title, subtitle, ctaPrimary, ctaSecondary, imageUrl, active } = body

    const hero = await prisma.hero.update({
      where: { id: params.id },
      data: {
        title,
        subtitle,
        ctaPrimary,
        ctaSecondary,
        imageUrl,
        active,
      },
    })

    return NextResponse.json(hero)
  } catch (error) {
    console.error('Error updating hero:', error)
    return NextResponse.json({ error: 'Failed to update hero' }, { status: 500 })
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

    await prisma.hero.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting hero:', error)
    return NextResponse.json({ error: 'Failed to delete hero' }, { status: 500 })
  }
}