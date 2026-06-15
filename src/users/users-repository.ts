import { inject } from "inversify";
import { IUserRepository } from "./users.repository.interface.js";
import { TYPES } from "../types.js";
import { PrismaService } from "../database/prisma.service.js";
import type { User } from "../generated/prisma/client.js";
import { UserEntity } from "./user-entity.js";

export class UsersRepository implements IUserRepository{
  constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService) { }
  async create({ email, firstName, lastName, password, details }: UserEntity): Promise<User>{
    return await this.prismaService.client.user.create({
      data:{
      email,
      firstName,
      lastName,
      password,
      details
      }
    })
  }

  async findByEmail(email: string): Promise<User | null>{
    return await this.prismaService.client.user.findFirst({
      where:{email}
    })
  }
}