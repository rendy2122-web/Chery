const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  const h1 = await bcrypt.hash('admin123', 12);
  await prisma.user.upsert({
    where: { email: 'admin@chery.co.id' },
    update: {},
    create: { email: 'admin@chery.co.id', name: 'Super Admin', password: h1, role: 'SUPER_ADMIN', active: true }
  });
  console.log('Super Admin created');

  const h2 = await bcrypt.hash('content123', 12);
  await prisma.user.upsert({
    where: { email: 'content@chery.co.id' },
    update: {},
    create: { email: 'content@chery.co.id', name: 'Content Admin', password: h2, role: 'CONTENT_ADMIN', active: true }
  });
  console.log('Content Admin created');

  const h3 = await bcrypt.hash('viewer123', 12);
  await prisma.user.upsert({
    where: { email: 'viewer@chery.co.id' },
    update: {},
    create: { email: 'viewer@chery.co.id', name: 'Viewer', password: h3, role: 'VIEWER', active: true }
  });
  console.log('Viewer created');

  console.log('Seed completed!');
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());