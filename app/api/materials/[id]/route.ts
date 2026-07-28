import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { prisma } = await import('@/lib/prisma');
    const { id } = await params;
    const body = await req.json();
    const material = await prisma.material.update({ where: { id }, data: body });
    return NextResponse.json(material);
  } catch (err) {
    console.error('Material PUT error:', err);
    return NextResponse.json({ error: 'Failed to update material' }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { prisma } = await import('@/lib/prisma');
    const { id } = await params;
    await prisma.material.update({ where: { id }, data: { isActive: false } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Material DELETE error:', err);
    return NextResponse.json({ error: 'Failed to delete material' }, { status: 500 });
  }
}
