import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Username of user',
    example: 'admin',
  })
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Password of user',
    example: 'password',
  })
  password: string;
}
