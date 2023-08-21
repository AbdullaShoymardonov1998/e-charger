import { Controller, Body, Post, HttpStatus } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginUserResponseDto } from './dto/login-user-response.dto';
import { CreateOtpDto } from './dto/otp.dto';
import { OtpService } from './otp.service';
import { ValidateCustomerDto } from './dto/validate-customer';
import { ValidateCustomerResponseDto } from './dto/validate-customer-response.dto';

@ApiTags('Auth')
@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly otpService: OtpService,
  ) {}

  @Post('user/login')
  @ApiOperation({ description: 'User sign in. Response includes JWT token' })
  @ApiResponse({
    type: LoginUserResponseDto,
  })
  userLogin(@Body() loginUserDto: LoginUserDto): Promise<LoginUserResponseDto> {
    return this.authService.userLogin(loginUserDto);
  }

  @Post('customer/generate')
  @ApiOperation({
    description: 'User authentication. Response includes JWT token',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
  })
  async createOtp(@Body() otpDetails: CreateOtpDto): Promise<void> {
    await this.otpService.generateOtp(otpDetails);
  }

  @Post('customer/validate')
  @ApiOperation({
    description: 'User authentication. Response includes JWT token',
  })
  @ApiResponse({
    type: ValidateCustomerResponseDto,
  })
  async validateCustomer(
    @Body() otpDetails: ValidateCustomerDto,
  ): Promise<ValidateCustomerResponseDto> {
    return this.otpService.validateCustomer(otpDetails);
  }
}
