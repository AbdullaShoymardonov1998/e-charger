import { CustomerDto } from '@/modules/customers/dto/customer.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ValidateCustomerResponseDto extends CustomerDto {
  @ApiProperty({ description: 'Otp access token' })
  accessToken: string;
}
