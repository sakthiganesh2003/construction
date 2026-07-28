import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const { prisma } = await import('@/lib/prisma');
    const todayStart = new Date(); todayStart.setHours(0, 0, 0, 0);

    const [todayEntries, todayData, totalEntries] = await Promise.all([
      prisma.weighment.count({ where: { createdAt: { gte: todayStart } } }),
      prisma.weighment.aggregate({
        where: { createdAt: { gte: todayStart } },
        _sum: { netWeight: true, amount: true },
      }),
      prisma.weighment.count(),
    ]);

    return NextResponse.json({
      todayEntries,
      todayTonnage: (todayData._sum.netWeight ?? 0) / 1000,
      todayRevenue: todayData._sum.amount ?? 0,
      totalEntries,
    });
  } catch (err) {
    console.error('Dashboard API error:', err);
    return NextResponse.json({
      todayEntries: 0,
      todayTonnage: 0,
      todayRevenue: 0,
      totalEntries: 0,
    });
  }
}
