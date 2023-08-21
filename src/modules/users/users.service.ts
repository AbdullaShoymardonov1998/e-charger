import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/core/prisma/prisma.service';
import { User } from '@prisma/client';
import { UserDto } from './dto/user.dto';
import { CreateOwnerDto } from './dto/create-owner.dto';
import * as bcrypt from 'bcryptjs';
import { JWT_SALT } from '@/consts/jwt';
import { UserRole } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findByUsername(username: string): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        username,
      },
    });

    return user;
  }

  async getProfile(id: string): Promise<UserDto> {
    const user: UserDto = await this.prisma.user.findUniqueOrThrow({
      where: { id },
      select: {
        id: true,
        username: true,
        firstName: true,
        lastName: true,
        isActive: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return user;
  }

  async createOwner(ownerDetails: CreateOwnerDto): Promise<UserDto> {
    const user = await this.prisma.user.create({
      data: {
        firstName: ownerDetails.firstName,
        lastName: ownerDetails.lastName,
        username: ownerDetails.username,
        password: await bcrypt.hash(ownerDetails.password, JWT_SALT),
        role: UserRole.OWNER,
      },
    });

    return user;
  }
}
