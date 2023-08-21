import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { JWT_SALT } from '../src/consts/jwt';
import { UserRole, PlugStatus, PlugTypes } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      username: 'admin',
      password: await bcrypt.hash('password', JWT_SALT),
      firstName: 'Admin',
      lastName: 'Admin',
      role: UserRole.ADMIN,
    },
  });
  const owner = await prisma.user.create({
    data: {
      username: 'owner',
      password: await bcrypt.hash('password', JWT_SALT),
      firstName: 'Owner',
      lastName: 'Owner',
      role: UserRole.OWNER,
    },
  });

  const station = await prisma.station.create({
    data: {
      name: 'E-charger station',
      address: 'Tashkent, Uzbekistan',
      longtitude: '41.311225758289005',
      latitude: '69.27955278476713',
      openTime: '09:00',
      closeTime: '18:00',
      owner: {
        connect: {
          id: owner.id,
        },
      },
    },
  });

  const charger = await prisma.charger.create({
    data: {
      name: 'Charger-1',
      station: {
        connect: {
          id: station.id,
        },
      },
    },
  });

  await prisma.plug.create({
    data: {
      type: PlugTypes.CCS_1,
      status: PlugStatus.AVAILABLE,
      voltage: '100V',
      charger: {
        connect: {
          id: charger.id,
        },
      },
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
