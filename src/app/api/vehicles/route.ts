import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const vehicles = await prisma.vehicle.findMany({
      orderBy: { order: 'asc' },
      select: {
        id: true,
        name: true,
        slug: true,
        category: true,
        priceFrom: true,
        description: true,
        shortDescription: true,
        exteriorImage: true,
        interiorImage: true,
        gallery: true,
        keyFeatures: true,
        specifications: true,
        safetyFeatures: true,
        technologyFeatures: true,
        brochureUrl: true,
        testDriveCta: true,
        active: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    return NextResponse.json(vehicles)
  } catch (error) {
    console.error('Error fetching vehicles:', error)
    return NextResponse.json({ error: 'Failed to fetch vehicles' }, { status: 500 })
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
      category,
      priceFrom,
      description,
      shortDescription,
      exteriorImage,
      interiorImage,
      gallery,
      keyFeatures,
      specifications,
      safetyFeatures,
      technologyFeatures,
      brochureUrl,
      testDriveCta,
      active,
    } = body

    if (!name || !slug || !category || priceFrom === undefined || !description || !exteriorImage) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const vehicle = await prisma.vehicle.create({
      data: {
        name,
        slug,
        category,
        priceFrom,
        description,
        shortDescription,
        exteriorImage,
        interiorImage,
        gallery: JSON.stringify(gallery || []),
        keyFeatures: JSON.stringify(keyFeatures || []),
        specifications: JSON.stringify(specifications || {}),
        safetyFeatures: JSON.stringify(safetyFeatures || []),
        technologyFeatures: JSON.stringify(technologyFeatures || []),
        brochureUrl,
        testDriveCta,
        active: active ?? true,
      },
    })

    return NextResponse.json(vehicle, { status: 201 })
  } catch (error) {
    console.error('Error creating vehicle:', error)
    return NextResponse.json({ error: 'Failed to create vehicle' }, { status: 500 })
  }
}