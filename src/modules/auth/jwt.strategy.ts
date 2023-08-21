import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from './dto/jwt-payload';
import { UsersService } from '@/modules/users/users.service';
import { CustomersService } from '../customers/customers.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userService: UsersService,
    private readonly customerService: CustomersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: JwtPayload) {
    const { id, role } = payload;

    let user = null;
    if (role) {
      user = await this.userService.getProfile(id);
    } else {
      user = await this.customerService.getCustomerById(id);
    }

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
