import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class ValidateCustomerDto {
  @IsInt()
  @ApiProperty({ description: 'Otp Number', example: '12345' })
  otp: string;
}
