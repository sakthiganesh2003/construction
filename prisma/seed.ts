import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database with 3 dummy weighments...');

  // ── Materials ─────────────────────────────────────────────────
  const sand = await prisma.material.upsert({
    where: { name: 'River Sand' },
    update: {},
    create: { name: 'River Sand', unit: 'Ton', ratePerTon: 1500 },
  });
  const blueMetal = await prisma.material.upsert({
    where: { name: 'Blue Metal 12mm' },
    update: {},
    create: { name: 'Blue Metal 12mm', unit: 'Ton', ratePerTon: 1800 },
  });
  const granite = await prisma.material.upsert({
    where: { name: 'Granite Gravel' },
    update: {},
    create: { name: 'Granite Gravel', unit: 'Ton', ratePerTon: 2500 },
  });
  const mSand = await prisma.material.upsert({
    where: { name: 'M-Sand' },
    update: {},
    create: { name: 'M-Sand', unit: 'Ton', ratePerTon: 1200 },
  });
  const quarryDust = await prisma.material.upsert({
    where: { name: 'Quarry Dust' },
    update: {},
    create: { name: 'Quarry Dust', unit: 'Ton', ratePerTon: 800 },
  });
  const blueMetal6 = await prisma.material.upsert({
    where: { name: 'Blue Metal 6mm' },
    update: {},
    create: { name: 'Blue Metal 6mm', unit: 'Ton', ratePerTon: 2000 },
  });
  console.log('✅ 6 materials seeded');

  // ── Vehicles ──────────────────────────────────────────────────
  const v1 = await prisma.vehicle.upsert({
    where: { vehicleNumber: 'TN39AB1234' },
    update: {},
    create: { vehicleNumber: 'TN39AB1234', driverName: 'Rajan M', ownerName: 'Murugan Transports', tareWeight: 8200 },
  });
  const v2 = await prisma.vehicle.upsert({
    where: { vehicleNumber: 'TN45CD5678' },
    update: {},
    create: { vehicleNumber: 'TN45CD5678', driverName: 'Selvam K', ownerName: 'KS Lorry Service', tareWeight: 9500 },
  });
  const v3 = await prisma.vehicle.upsert({
    where: { vehicleNumber: 'TN22EF9012' },
    update: {},
    create: { vehicleNumber: 'TN22EF9012', driverName: 'Balu R', ownerName: 'Balu & Bros', tareWeight: 7800 },
  });
  console.log('✅ 3 vehicles seeded');

  // ── 3 Dummy Weighments ────────────────────────────────────────
  const today = new Date().toISOString().slice(0, 10).replace(/-/g, '');

  const w1Data = { gross: 26400, tare: 8200, mat: sand,     vehicle: v1, party: 'Ramesh Constructions', slip: `VBM-${today}-001` };
  const w2Data = { gross: 29000, tare: 9500, mat: blueMetal, vehicle: v2, party: 'Kumar Builders',        slip: `VBM-${today}-002` };
  const w3Data = { gross: 23600, tare: 7800, mat: granite,   vehicle: v3, party: 'Veera Infra Projects',  slip: `VBM-${today}-003` };

  for (const w of [w1Data, w2Data, w3Data]) {
    const netWeight = w.gross - w.tare;
    const amount    = (netWeight / 1000) * w.mat.ratePerTon;
    await prisma.weighment.upsert({
      where: { slipNumber: w.slip },
      update: {},
      create: {
        slipNumber:    w.slip,
        vehicleNumber: w.vehicle.vehicleNumber,
        driverName:    w.vehicle.driverName,
        partyName:     w.party,
        materialName:  w.mat.name,
        grossWeight:   w.gross,
        tareWeight:    w.tare,
        netWeight,
        ratePerTon:    w.mat.ratePerTon,
        amount,
        vehicleId:     w.vehicle.id,
        materialId:    w.mat.id,
      },
    });
  }

  console.log('✅ 3 weighments seeded:');
  console.log(`   ${w1Data.slip} — TN39AB1234 | River Sand  | Net: ${(w1Data.gross - w1Data.tare)/1000}T | ₹${((w1Data.gross-w1Data.tare)/1000)*sand.ratePerTon}`);
  console.log(`   ${w2Data.slip} — TN45CD5678 | Blue Metal  | Net: ${(w2Data.gross - w2Data.tare)/1000}T | ₹${((w2Data.gross-w2Data.tare)/1000)*blueMetal.ratePerTon}`);
  console.log(`   ${w3Data.slip} — TN22EF9012 | Granite     | Net: ${(w3Data.gross - w3Data.tare)/1000}T | ₹${((w3Data.gross-w3Data.tare)/1000)*granite.ratePerTon}`);
  console.log('🎉 Done!');
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
