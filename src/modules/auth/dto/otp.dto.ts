import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOtpDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Phone Number', example: '998901234567' })
  phone: string;
}
