import { Module } from '@nestjs/common';
import { ChargersService } from './chargers.service';
import { ChargersController } from './chargers.controller';
import { CoreModule } from '@/core/core.module';

@Module({
  imports: [CoreModule],
  providers: [ChargersService],
  controllers: [ChargersController],
})
export class ChargersModule {}
