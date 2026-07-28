import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { prisma } = await import('@/lib/prisma');
    const { searchParams } = new URL(req.url);
    const date  = searchParams.get('date');
    const mat   = searchParams.get('material');
    const query = searchParams.get('q');
    const limit = searchParams.get('limit');

    const where: any = {};
    if (date) {
      const d = new Date(date);
      const next = new Date(d); next.setDate(next.getDate() + 1);
      where.createdAt = { gte: d, lt: next };
    }
    if (mat)   where.materialName = { contains: mat };
    if (query) where.OR = [
      { vehicleNumber: { contains: query } },
      { partyName:     { contains: query } },
      { slipNumber:    { contains: query } },
    ];

    const weighments = await prisma.weighment.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      ...(limit ? { take: parseInt(limit) } : {}),
    });
    return NextResponse.json(weighments);
  } catch (err) {
    console.error('Weighments GET error:', err);
    return NextResponse.json([]);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { prisma } = await import('@/lib/prisma');
    const body = await req.json();
    const { vehicleNumber, driverName, partyName, materialId, grossWeight, tareWeight, remarks, vehicleId } = body;

    const material = await prisma.material.findUnique({ where: { id: materialId } });
    if (!material) return NextResponse.json({ error: 'Material not found' }, { status: 404 });

    const netWeight  = grossWeight - tareWeight;
    const amount     = (netWeight / 1000) * material.ratePerTon;
    const todayStr   = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const todayStart = new Date(); todayStart.setHours(0, 0, 0, 0);
    const count      = await prisma.weighment.count({ where: { createdAt: { gte: todayStart } } });
    const slipNumber = `VBM-${todayStr}-${String(count + 1).padStart(3, '0')}`;

    const weighment = await prisma.weighment.create({
      data: {
        slipNumber, vehicleNumber, driverName, partyName,
        materialName: material.name,
        grossWeight, tareWeight, netWeight,
        ratePerTon: material.ratePerTon, amount,
        remarks: remarks || null,
        vehicleId: vehicleId || null,
        materialId,
      },
    });
    return NextResponse.json(weighment, { status: 201 });
  } catch (err) {
    console.error('Weighments POST error:', err);
    return NextResponse.json({ error: 'Failed to save weighment. Database not available.' }, { status: 500 });
  }
}
