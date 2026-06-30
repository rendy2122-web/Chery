import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET(request: Request) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const entityType = searchParams.get('entityType')
    const entityId = searchParams.get('entityId')

    const where: { entityType?: string; entityId?: string } = {}
    if (entityType) where.entityType = entityType
    if (entityId) where.entityId = entityId

    const revisions = await prisma.revision.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: 50,
    })

    return NextResponse.json(revisions)
  } catch (error) {
    console.error('Error fetching revisions:', error)
    return NextResponse.json({ error: 'Failed to fetch revisions' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { entityType, entityId, action, oldValue, newValue } = body

    if (!entityType || !entityId || !action) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const revision = await prisma.revision.create({
      data: {
        entityType,
        entityId,
        userId: session.user.id,
        userName: session.user.name || 'Unknown',
        action,
        oldValue: oldValue || null,
        newValue: newValue || null,
      },
    })

    return NextResponse.json(revision, { status: 201 })
  } catch (error) {
    console.error('Error creating revision:', error)
    return NextResponse.json({ error: 'Failed to create revision' }, { status: 500 })
  }
}