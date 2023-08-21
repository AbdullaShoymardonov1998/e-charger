import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'customers Name', example: 'John' })
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'customers Surname', example: 'Doe' })
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'customers phone number',
    example: '+99890-000-00-00',
  })
  phone: string;
}
