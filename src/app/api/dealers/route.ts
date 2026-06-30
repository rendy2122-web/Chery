import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const dealers = await prisma.dealer.findMany({
      orderBy: { order: 'asc' },
    })

    return NextResponse.json(dealers)
  } catch (error) {
    console.error('Error fetching dealers:', error)
    return NextResponse.json({ error: 'Failed to fetch dealers' }, { status: 500 })
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
      name,
      slug,
      city,
      address,
      whatsapp,
      phone,
      email,
      businessHours,
      googleMapsUrl,
      imageUrl,
      services,
      branchPromo,
      active,
    } = body

    if (!name || !slug || !city || !address || !phone || !imageUrl) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const dealer = await prisma.dealer.create({
      data: {
        name,
        slug,
        city,
        address,
        whatsapp,
        phone,
        email,
        businessHours,
        googleMapsUrl,
        imageUrl,
        services,
        branchPromo,
        active: active ?? true,
      },
    })

    return NextResponse.json(dealer, { status: 201 })
  } catch (error) {
    console.error('Error creating dealer:', error)
    return NextResponse.json({ error: 'Failed to create dealer' }, { status: 500 })
  }
}