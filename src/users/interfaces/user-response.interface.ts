import type { User } from '../../generated/prisma/client.js';
import { TokenPair } from './token-pair.interface.js';

export interface IAuthTokens {
  accessToken: string;
  refreshToken: string;
}
export interface ILoginResponse {
  userData: User;
  tokens: TokenPair;
}
