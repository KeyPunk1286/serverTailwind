import jwt from 'jsonwebtoken';
import type { StringValue } from 'ms';
import type { IConfigService } from '../config/config.service.interface.js';
import { TYPES } from '../types.js';
import { JwtPayload } from './interfaces/jwt-payload.interface.js';
import type { IJwtService } from './interfaces/jwt.service.interface.js';
import { inject, injectable } from 'inversify';

@injectable()
export class JwtService implements IJwtService {
  constructor(
    @inject(TYPES.IConfigService) private configService: IConfigService
  ) {}

  async generateAccessToken(payload: JwtPayload): Promise<string> {
    const accessSecret = this.configService.get('ACCESS_SECRET');
    return this.generateToken(payload, accessSecret, '15m');
  }

  async generateRefreshToken(payload: JwtPayload): Promise<string> {
    const refreshSecret = this.configService.get('REFRESH_SECRET');
    return this.generateToken(payload, refreshSecret, '30d');
  }

  async verifyAccessToken(token: string): Promise<JwtPayload> {
    const accessSecret = this.configService.get('ACCESS_SECRET');
    return this.verifyToken(token, accessSecret);
  }

  async verifyRefreshToken(token: string): Promise<JwtPayload> {
    const refreshSecret = this.configService.get('REFRESH_SECRET');
    return this.verifyToken(token, refreshSecret);
  }

  private generateToken(
    payload: JwtPayload,
    secret: string,
    expiresIn: StringValue | number
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      jwt.sign(
        payload,
        secret,
        {
          algorithm: 'HS256',
          expiresIn,
        },
        (error, token) => {
          if (error) {
            return reject(error);
          }
          if (!token) {
            return reject(new Error('Token generation failed.'));
          }
          resolve(token);
        }
      );
    });
  }
  private verifyToken(token: string, secret: string): Promise<JwtPayload> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, secret, (error, decoded) => {
        if (error) {
          return reject(error);
        }
        if (!decoded || typeof decoded === 'string') {
          return reject(new Error('Invalid token payload.'));
        }
        resolve(decoded as JwtPayload);
      });
    });
  }
}
