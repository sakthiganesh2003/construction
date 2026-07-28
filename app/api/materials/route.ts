import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const { prisma } = await import('@/lib/prisma');
    const materials = await prisma.material.findMany({ orderBy: { name: 'asc' } });
    return NextResponse.json(materials);
  } catch (err) {
    console.error('Materials GET error:', err);
    return NextResponse.json([]);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { prisma } = await import('@/lib/prisma');
    const body = await req.json();
    const material = await prisma.material.create({ data: body });
    return NextResponse.json(material, { status: 201 });
  } catch (err) {
    console.error('Materials POST error:', err);
    return NextResponse.json({ error: 'Failed to save material' }, { status: 500 });
  }
}
