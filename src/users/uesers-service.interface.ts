import type { User } from "../generated/prisma/client.js";
import { UserLoginDto } from "./dto/user-login.dto.js";
import { UserRegisterDto } from "./dto/user-registration.dto.js";
import { UserUpdateDto } from "./dto/user-udate.dto.js";

export interface IUserService {
  registration: (dto: UserRegisterDto) => Promise<User>
  login: (dto: UserLoginDto) => Promise<string>
  getUser: (id?: number) => Promise<User | null>
  update: (dto: UserUpdateDto, userId?: number) => Promise<User>
}