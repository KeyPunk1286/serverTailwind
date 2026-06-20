import { inject, injectable } from "inversify";
import "reflect-metadata"
import { IUserService } from "./interfaces/uesers-service.interface.js";
import { TYPES } from "../types.js";
import type { IUserRepository } from "./interfaces/users.repository.interface.js";
import type { ILoggerService } from "../loggerService/logger.service.interface.js";
import { User } from "../generated/prisma/client.js";
import { UserRegisterDto } from "./dto/user-registration.dto.js";
import { UserEntity } from "./user-entity.js";
import type { IConfigService } from "../config/config.service.interface.js";
import { HTTPErrors } from "../errors/http-error.class.js";
import { UserLoginDto } from "./dto/user-login.dto.js";
import jwt from "jsonwebtoken";
import { UserUpdateDto } from "./dto/user-udate.dto.js";
import { ILoginResponse } from "./interfaces/user-response.interface.js";


@injectable()
export class UsersService implements IUserService {
  constructor(
    @inject(TYPES.IUserRepository) private usersRepository: IUserRepository,
    @inject(TYPES.ILoggerService) private loggerService: ILoggerService,
    @inject(TYPES.IConfigService) private configService: IConfigService
  ) { }

  async registration(dto: UserRegisterDto): Promise<User> {
    try {
      const newUser = new UserEntity(dto.email, dto.firstName, dto.lastName, dto.details)
      const salt = this.configService.get("SALT")
      await newUser.setPassword(dto.password, Number(salt))
      const existUser = await this.usersRepository.findByEmail(dto.email)
      if (existUser) {
        throw new HTTPErrors(409, "User already exists", "[UsersService]")
      }
      return await this.usersRepository.create(newUser)
    } catch (error) {
      if (error instanceof HTTPErrors) {
        throw error;
      }
      throw new HTTPErrors(500, "Server error", "[UsersService]");
    }
  };

  async login(dto: UserLoginDto): Promise<ILoginResponse> {
    try {
      const existUser = await this.usersRepository.findByEmail(dto.email)
      if (!existUser) {
        throw new HTTPErrors(404, "User does not exist", "[UsersService]")
      }
      const userValid = new UserEntity(
        existUser.email,
        existUser.firstName,
        existUser.lastName,
        existUser.details,
        existUser.password
      )
      const isValid = await userValid.comparePass(dto.password)
      if (!isValid) {
        throw new HTTPErrors(401, "Wrong password", "[UsersService]")
      }
      const jwt = await this.sineJwt(existUser.id, existUser.email, this.configService.get("SECRET"))
      return {userData:existUser, jwt: jwt }
    } catch (error) {
      if (error instanceof HTTPErrors) {
        throw error
      }
      throw new HTTPErrors(500, "Server error", "[UsersService]")
    }
  };

  private sineJwt(id: number, email: string, secret: string): Promise<string> {
    return new Promise((resolve, reject) => {
      jwt.sign({
        id,
        email
      }, secret, { algorithm: "HS256" }, (err, token) => {
        if (err) {
          reject(err)
        } resolve(token as string)
      })
    })
  }

  async getUser(id?: number): Promise<User | null>{
    try {
      if (!id) {
        throw new HTTPErrors(400, "Unauthorized", "[UsersService]")
      }
      const existUser = await this.usersRepository.getUserById(id)
      if (!existUser) {
        throw new HTTPErrors(404, "User does not exist", "[UsersService]")
      }
      return existUser
    } catch (error) {
      if (error instanceof HTTPErrors) {
        throw error
      }
      throw new HTTPErrors(500, "Server error", "[UsersService]")
    }
  }

  async update(dto: UserUpdateDto, userId?: number): Promise<User>{
    try {
      if (!userId) {
       throw new HTTPErrors(400, "Unauthorized", "[UsersService]")
      }
      const existUser = await this.usersRepository.getUserById(userId)
      if (!existUser) {
        throw new HTTPErrors(404, "User does not exist", "[UsersService]")
      }
      const userUpdate = await this.usersRepository.userUdate(dto, userId)
      return userUpdate
    } catch (error) {
      if (error instanceof HTTPErrors) {
        throw error
      }
      throw new HTTPErrors(500, "Server error", "[UsersService]")
      
    }
  };
}