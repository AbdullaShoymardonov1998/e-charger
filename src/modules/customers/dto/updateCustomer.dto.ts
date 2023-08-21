import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateCustomerDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(25)
  @ApiProperty({ description: 'Customer name', example: 'John' })
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(25)
  @ApiProperty({ description: 'Customer surname', example: 'Doe' })
  lastName: string;
}
