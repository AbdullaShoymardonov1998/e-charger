import { Module } from '@nestjs/common';
import { OcppService } from './ocpp.service';
import { OcppController } from './ocpp.controller';

@Module({
  providers: [OcppService],
  controllers: [OcppController],
})
export class OcppModule {}
