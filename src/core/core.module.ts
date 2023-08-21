import { Module } from '@nestjs/common';
import { PrismaModule } from '@/core/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  exports: [PrismaModule],
})
export class CoreModule {}
