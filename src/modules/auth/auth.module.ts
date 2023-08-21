import { Module } from '@nestjs/common';
import { AuthController } from '@/modules/auth/auth.controller';
import { AuthService } from '@/modules/auth/auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '@/modules/auth/jwt.strategy';
import { UsersService } from '@/modules/users/users.service';
import { CoreModule } from '@/core/core.module';
import { JWT_EXPIRES_IN } from '@/consts/jwt';
import { OtpService } from './otp.service';
import { CustomersService } from '../customers/customers.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: JWT_EXPIRES_IN,
      },
    }),
    CoreModule,
  ],
  providers: [
    AuthService,
    UsersService,
    JwtStrategy,
    OtpService,
    CustomersService,
  ],
  controllers: [AuthController],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
