import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { CoreModule } from '@/core/core.module';

@Module({
  imports: [CoreModule],
  providers: [CustomersService],
  controllers: [CustomersController],
})
export class CustomersModule {}
