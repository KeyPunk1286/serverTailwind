import { UserEntity } from "./user-entity.js";
import type { User } from "../generated/prisma/client.js";

export interface IUserRepository{
  create:(user: UserEntity) => Promise<User>
  findByEmail:(email: string) => Promise<User | null>
}