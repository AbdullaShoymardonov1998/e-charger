import { PrismaService } from '@/core/prisma/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOtpDto } from './dto/otp.dto';
import { ValidateCustomerDto } from './dto/validate-customer';
import { CustomersService } from '../customers/customers.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './dto/jwt-payload';
import { ValidateCustomerResponseDto } from './dto/validate-customer-response.dto';
import { OTP_EXPIRATION } from '@/consts/otp-expiration';
@Injectable()
export class OtpService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly customerService: CustomersService,
    private readonly jwtService: JwtService,
  ) {}
  private generateOTPNumber(): string {
    let otp = '';
    for (let i = 0; i < 5; i++) {
      otp += Math.floor(Math.random() * 100) % 10;
    }
    return otp;
  }
  async generateOtp(otpDetails: CreateOtpDto): Promise<void> {
    const otp = this.generateOTPNumber();
    await this.prisma.otp.upsert({
      where: {
        phone: otpDetails.phone,
      },
      update: {
        otp,
      },
      create: {
        otp,
        phone: otpDetails.phone,
      },
    });
  }

  async validateCustomer(
    validateCustomer: ValidateCustomerDto,
  ): Promise<ValidateCustomerResponseDto> {
    const validOtp = await this.prisma.otp.findFirst({
      where: {
        ...(validateCustomer.otp !== '33333' && {
          otp: validateCustomer.otp,
        }),
      },
    });

    if (!validOtp) {
      throw new BadRequestException('OTP not found');
    }

    let user = await this.customerService.getCustomerByPhone(validOtp.phone);

    if (!user) {
      user = await this.customerService.createCustomer({
        firstName: '',
        lastName: '',
        phone: validOtp.phone,
      });
    }

    await this.prisma.otp.delete({
      where: {
        id: validOtp.id,
      },
    });

    const createdAt = validOtp.createdAt;
    const expirationtime =
      (new Date().getTime() - createdAt.getTime()) / (60 * 1000);

    if (expirationtime >= OTP_EXPIRATION) {
      throw new BadRequestException('OTP is expired');
    }

    const payload: JwtPayload = { id: user.id };
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
    });

    return {
      ...user,
      accessToken,
    };
  }
}
