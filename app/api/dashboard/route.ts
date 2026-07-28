import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const todayStart = new Date(); todayStart.setHours(0,0,0,0);

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
}
