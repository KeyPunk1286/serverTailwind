import type { JwtPayload } from './jwt-payload.interface.js';

export interface IJwtService {
  generateAccessToken(payload: JwtPayload): Promise<string>;

  generateRefreshToken(payload: JwtPayload): Promise<string>;

  verifyAccessToken(token: string): Promise<JwtPayload>;

  verifyRefreshToken(token: string): Promise<JwtPayload>;
}
