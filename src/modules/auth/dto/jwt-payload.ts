import { UserRole } from '@prisma/client';
export interface JwtPayload {
  id: string;
  username?: string;
  role?: UserRole;
}
