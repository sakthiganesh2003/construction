import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const material = await prisma.material.update({ where: { id }, data: body });
  return NextResponse.json(material);
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await prisma.material.update({ where: { id }, data: { isActive: false } });
  return NextResponse.json({ success: true });
}
