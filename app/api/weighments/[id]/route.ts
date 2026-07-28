import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { prisma } = await import('@/lib/prisma');
    const { id } = await params;
    await prisma.weighment.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Weighment DELETE error:', err);
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { prisma } = await import('@/lib/prisma');
    const { id } = await params;
    const w = await prisma.weighment.findUnique({ where: { id } });
    if (!w) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(w);
  } catch (err) {
    console.error('Weighment GET error:', err);
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
}
