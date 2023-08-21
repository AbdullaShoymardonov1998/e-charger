import { Module } from '@nestjs/common';
import { UsersModule } from '@/modules/users/users.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { CoreModule } from '@/core/core.module';
import { ConfigModule } from '@nestjs/config';
import { StationsModule } from './modules/stations/stations.module';
import { ChargersModule } from './modules/chargers/chargers.module';
import { CustomersModule } from './modules/customers/customers.module';
import { OcppModule } from './modules/ocpp/ocpp.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    UsersModule,
    AuthModule,
    CoreModule,
    StationsModule,
    ChargersModule,
    CustomersModule,
    OcppModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
