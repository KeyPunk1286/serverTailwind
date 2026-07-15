import { UserEntity } from '../user-entity.js';
import type { User } from '../../generated/prisma/client.js'; //generated/prisma/client.js
import { UserUpdateDto } from '../dto/user-udate.dto.js';

export interface IUserRepository {
  create: (user: UserEntity) => Promise<User>;
  findByEmail: (email: string) => Promise<User | null>;
  getUserById: (id: number) => Promise<User | null>;
  userUdate: (dto: UserUpdateDto, userId: number) => Promise<User>;
  updateRefreshTokenHash: (
    userId: number,
    refreshTokenHash: string | null
  ) => Promise<void>;
}
