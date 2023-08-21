import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';

export class LoginUserResponseDto {
  @ApiProperty({ description: 'Access token' })
  accessToken: string;

  @ApiProperty({ description: 'User role', enum: UserRole })
  role: UserRole;

  @ApiProperty({ description: 'Username' })
  username: string;
}
