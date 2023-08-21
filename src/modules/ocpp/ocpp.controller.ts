import { Controller, Param, Post } from '@nestjs/common';
import { OcppService } from './ocpp.service';

@Controller('ocpp')
export class OcppController {
  constructor(private readonly ocppService: OcppService) {}

  @Post(':id')
  async startRemoteTrancation(@Param('id') id: string) {
    return this.ocppService.startRemoteTransaction(id);
  }
}
