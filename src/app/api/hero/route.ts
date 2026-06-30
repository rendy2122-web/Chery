import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const hero = await prisma.hero.findFirst()

    return NextResponse.json(hero)
  } catch (error) {
    console.error('Error fetching hero:', error)
    return NextResponse.json({ error: 'Failed to fetch hero' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { title, subtitle, ctaPrimary, ctaSecondary, imageUrl, active } = body

    if (!title || !subtitle) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const hero = await prisma.hero.create({
      data: {
        title,
        subtitle,
        ctaPrimary,
        ctaSecondary,
        imageUrl,
        active: active ?? true,
      },
    })

    return NextResponse.json(hero, { status: 201 })
  } catch (error) {
    console.error('Error creating hero:', error)
    return NextResponse.json({ error: 'Failed to create hero' }, { status: 500 })
  }
}