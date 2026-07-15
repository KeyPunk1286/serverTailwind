import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { IUserService } from './interfaces/uesers-service.interface.js';
import { TYPES } from '../types.js';
import type { IUserRepository } from './interfaces/users.repository.interface.js';
import type { ILoggerService } from '../loggerService/logger.service.interface.js';
import { User } from '../generated/prisma/client.js';
import { UserRegisterDto } from './dto/user-registration.dto.js';
import { UserEntity } from './user-entity.js';
import type { IConfigService } from '../config/config.service.interface.js';
import { HTTPErrors } from '../errors/http-error.class.js';
import { UserLoginDto } from './dto/user-login.dto.js';
import { UserUpdateDto } from './dto/user-udate.dto.js';
import { ILoginResponse } from './interfaces/user-response.interface.js';
import type { IJwtService } from '../jwt/interfaces/jwt.service.interface.js';
import type { ICryptoService } from '../ crypto/interfaces/crypto.service.interface.js';
import { RefreshTokenDto } from './dto/refresh-token.dto.js';
import { TokenPair } from './interfaces/token-pair.interface.js';

@injectable()
export class UsersService implements IUserService {
  constructor(
    @inject(TYPES.IUserRepository) private usersRepository: IUserRepository,
    @inject(TYPES.ILoggerService) private loggerService: ILoggerService,
    @inject(TYPES.IConfigService) private configService: IConfigService,
    @inject(TYPES.IJwtService) private jwtService: IJwtService,
    @inject(TYPES.ICryptoService) private cryptoService: ICryptoService
  ) {}

  async registration(dto: UserRegisterDto): Promise<User> {
    try {
      const newUser = new UserEntity(
        dto.email,
        dto.firstName,
        dto.lastName,
        dto.details
      );
      const salt = this.configService.get('SALT');
      await newUser.setPassword(dto.password, Number(salt));
      const existUser = await this.usersRepository.findByEmail(dto.email);
      if (existUser) {
        throw new HTTPErrors(409, 'User already exists', '[UsersService]');
      }
      return await this.usersRepository.create(newUser);
    } catch (error) {
      if (error instanceof HTTPErrors) {
        throw error;
      }
      throw new HTTPErrors(500, 'Server error', '[UsersService]');
    }
  }

  async login(dto: UserLoginDto): Promise<ILoginResponse> {
    try {
      const existUser = await this.usersRepository.findByEmail(dto.email);
      if (!existUser) {
        throw new HTTPErrors(
          401,
          'Invalid email or password',
          '[UsersService]'
        );
      }
      const userValid = new UserEntity(
        existUser.email,
        existUser.firstName,
        existUser.lastName,
        existUser.details,
        existUser.password
      );
      const isValid = await userValid.comparePass(dto.password);
      if (!isValid) {
        throw new HTTPErrors(
          401,
          'Invalid email or password',
          '[UsersService]'
        );
      }
      const tokens = await this.issueTokens(existUser);
      return { userData: existUser, tokens };
    } catch (error) {
      if (error instanceof HTTPErrors) {
        throw error;
      }
      throw new HTTPErrors(500, 'Server error', '[UsersService]');
    }
  }

  async refresh(dto: RefreshTokenDto): Promise<ILoginResponse> {
    const payload = await this.jwtService.verifyRefreshToken(dto.refreshToken);
    const user = await this.usersRepository.getUserById(Number(payload.sub));
    if (!user) {
      throw new HTTPErrors(401, 'Invalid refresh token', '[UsersService]');
    }
    const isRefreshTokenValid = await this.cryptoService.compare(
      dto.refreshToken,
      user.refreshTokenHash ?? ''
    );
    if (!isRefreshTokenValid) {
      throw new HTTPErrors(401, 'Invalid refresh token', '[UsersService]');
    }
    const tokens = await this.issueTokens(user);
    return {
      userData: user,
      tokens,
    };
  }

  async getUser(id?: number): Promise<User | null> {
    try {
      if (!id) {
        throw new HTTPErrors(400, 'Unauthorized', '[UsersService]');
      }
      const existUser = await this.usersRepository.getUserById(id);
      if (!existUser) {
        throw new HTTPErrors(404, 'User does not exist', '[UsersService]');
      }
      return existUser;
    } catch (error) {
      if (error instanceof HTTPErrors) {
        throw error;
      }
      throw new HTTPErrors(500, 'Server error', '[UsersService]');
    }
  }

  async update(dto: UserUpdateDto, userId?: number): Promise<User> {
    try {
      if (!userId) {
        throw new HTTPErrors(400, 'Unauthorized', '[UsersService]');
      }
      const existUser = await this.usersRepository.getUserById(userId);
      if (!existUser) {
        throw new HTTPErrors(404, 'User does not exist', '[UsersService]');
      }
      const userUpdate = await this.usersRepository.userUdate(dto, userId);
      return userUpdate;
    } catch (error) {
      if (error instanceof HTTPErrors) {
        throw error;
      }
      throw new HTTPErrors(500, 'Server error', '[UsersService]');
    }
  }

  async logout(userId: number): Promise<void> {
    await this.usersRepository.updateRefreshTokenHash(userId, null);
  }

  private async issueTokens(user: User): Promise<TokenPair> {
    const accessToken = await this.jwtService.generateAccessToken({
      sub: user.id.toString(),
    });
    const refreshToken = await this.jwtService.generateRefreshToken({
      sub: user.id.toString(),
    });
    const refreshTokenHash = await this.cryptoService.hash(refreshToken);
    await this.usersRepository.updateRefreshTokenHash(
      user.id,
      refreshTokenHash
    );
    return {
      accessToken,
      refreshToken,
    };
  }
}
