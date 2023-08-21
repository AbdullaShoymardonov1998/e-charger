import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserRole } from '@prisma/client';

@Injectable()
export class UserGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return (
      user && (user.role === UserRole.ADMIN || user.role === UserRole.OWNER)
    );
  }
}
