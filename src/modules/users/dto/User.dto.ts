import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';

export class UserDto {
  @ApiProperty({ description: 'User Id' })
  id: string;

  @ApiProperty({ description: 'User username' })
  username: string;

  @ApiProperty({ description: 'User firstname' })
  firstName: string;

  @ApiProperty({ description: 'User lastname' })
  lastName: string;

  @ApiProperty({ description: 'User status' })
  isActive: boolean;

  @ApiProperty({ description: 'User role', enum: UserRole })
  role: UserRole;

  @ApiProperty({ description: 'User created date' })
  createdAt: Date;

  @ApiProperty({ description: 'User updated date' })
  updatedAt: Date;
}
