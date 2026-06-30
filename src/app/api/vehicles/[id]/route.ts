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

    const vehicle = await prisma.vehicle.findUnique({
      where: { id: params.id },
    })

    if (!vehicle) {
      return NextResponse.json({ error: 'Vehicle not found' }, { status: 404 })
    }

    return NextResponse.json(vehicle)
  } catch (error) {
    console.error('Error fetching vehicle:', error)
    return NextResponse.json({ error: 'Failed to fetch vehicle' }, { status: 500 })
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

    const vehicle = await prisma.vehicle.update({
      where: { id: params.id },
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
        active,
      },
    })

    return NextResponse.json(vehicle)
  } catch (error) {
    console.error('Error updating vehicle:', error)
    return NextResponse.json({ error: 'Failed to update vehicle' }, { status: 500 })
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

    await prisma.vehicle.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting vehicle:', error)
    return NextResponse.json({ error: 'Failed to delete vehicle' }, { status: 500 })
  }
}