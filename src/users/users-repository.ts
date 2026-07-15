import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { IUserRepository } from './interfaces/users.repository.interface.js';
import { TYPES } from '../types.js';
import { PrismaService } from '../database/prisma.service.js';
import type { User } from '../generated/prisma/client.js';
import { UserEntity } from './user-entity.js';
import { UserUpdateDto } from './dto/user-udate.dto.js';

@injectable()
export class UsersRepository implements IUserRepository {
  constructor(
    @inject(TYPES.PrismaService) private prismaService: PrismaService
  ) {}
  async create({
    email,
    firstName,
    lastName,
    password,
    details,
  }: UserEntity): Promise<User> {
    return await this.prismaService.client.user.create({
      data: {
        email,
        firstName,
        lastName,
        password,
        details,
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.prismaService.client.user.findFirst({
      where: { email },
    });
  }

  async getUserById(id: number): Promise<User | null> {
    return await this.prismaService.client.user.findUnique({
      where: { id },
    });
  }

  async userUdate(dto: UserUpdateDto, userId: number): Promise<User> {
    return await this.prismaService.client.user.update({
      where: { id: userId },
      data: {
        email: dto.email,
        firstName: dto.firstName,
        lastName: dto.lastName,
        details: dto.details,
      },
    });
  }

  async updateRefreshTokenHash(
    userId: number,
    refreshTokenHash: string | null
  ): Promise<void> {
    await this.prismaService.client.user.update({
      where: {
        id: userId,
      },
      data: {
        refreshTokenHash,
      },
    });
  }
}
