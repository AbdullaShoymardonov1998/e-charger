import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateOwnerDto {
  @ApiProperty({ description: 'User username', example: 'john' })
  @IsString()
  @MinLength(3)
  @MaxLength(25)
  username: string;

  @IsString()
  @MinLength(6)
  @MaxLength(25)
  @ApiProperty({ description: 'Password username', example: 'password' })
  password: string;

  @IsString()
  @MinLength(2)
  @MaxLength(25)
  @ApiProperty({ description: 'User firstname', example: 'John' })
  firstName: string;

  @IsString()
  @MinLength(2)
  @MaxLength(25)
  @ApiProperty({ description: 'User lastname', example: 'Doe' })
  lastName: string;
}
