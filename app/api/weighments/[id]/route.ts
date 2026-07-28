import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await prisma.weighment.delete({ where: { id } });
  return NextResponse.json({ success: true });
}

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const w = await prisma.weighment.findUnique({ where: { id } });
  if (!w) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(w);
}
