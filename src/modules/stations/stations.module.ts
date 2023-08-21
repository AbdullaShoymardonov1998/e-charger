import { Module } from '@nestjs/common';
import { StationsService } from './stations.service';
import { StationsController } from './stations.controller';
import { CoreModule } from '@/core/core.module';

@Module({
  imports: [CoreModule],
  providers: [StationsService],
  controllers: [StationsController],
})
export class StationsModule {}
