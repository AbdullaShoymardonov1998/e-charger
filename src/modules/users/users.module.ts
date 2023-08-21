import { Module } from '@nestjs/common';
import { UsersController } from '@/modules/users/users.controller';
import { UsersService } from '@/modules/users/users.service';
import { CoreModule } from '@/core/core.module';

@Module({
  imports: [CoreModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
