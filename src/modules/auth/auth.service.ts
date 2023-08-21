import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@/modules/users/users.service';
import * as bcrypt from 'bcryptjs';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtPayload } from './dto/jwt-payload';
import { LoginUserResponseDto } from './dto/login-user-response.dto';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.userService.findByUsername(username);
    if (!user) return null;

    const isPasswordSame = await bcrypt.compare(password, user.password);
    if (!(user && isPasswordSame)) return null;

    return user;
  }

  async userLogin(loginUserDto: LoginUserDto): Promise<LoginUserResponseDto> {
    const { username, password } = loginUserDto;

    const user = await this.validateUser(username, password);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = { id: user.id, username, role: user.role };
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
    });

    return { accessToken, role: user.role, username: user.username };
  }
}
