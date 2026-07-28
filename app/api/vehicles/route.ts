import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const { prisma } = await import('@/lib/prisma');
    const vehicles = await prisma.vehicle.findMany({ orderBy: { vehicleNumber: 'asc' } });
    return NextResponse.json(vehicles);
  } catch (err) {
    console.error('Vehicles GET error:', err);
    return NextResponse.json([]);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { prisma } = await import('@/lib/prisma');
    const body = await req.json();
    const vehicle = await prisma.vehicle.create({ data: body });
    return NextResponse.json(vehicle, { status: 201 });
  } catch (err) {
    console.error('Vehicles POST error:', err);
    return NextResponse.json({ error: 'Failed to save vehicle' }, { status: 500 });
  }
}
