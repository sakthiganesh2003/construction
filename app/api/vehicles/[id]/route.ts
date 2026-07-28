import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { prisma } = await import('@/lib/prisma');
    const { id } = await params;
    const body = await req.json();
    const vehicle = await prisma.vehicle.update({ where: { id }, data: body });
    return NextResponse.json(vehicle);
  } catch (err) {
    console.error('Vehicle PUT error:', err);
    return NextResponse.json({ error: 'Failed to update vehicle' }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { prisma } = await import('@/lib/prisma');
    const { id } = await params;
    await prisma.vehicle.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Vehicle DELETE error:', err);
    return NextResponse.json({ error: 'Failed to delete vehicle' }, { status: 500 });
  }
}
