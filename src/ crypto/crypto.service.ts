import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { hash, compare } from 'bcrypt';
import type { IConfigService } from '../config/config.service.interface.js';
import type { ICryptoService } from './interfaces/crypto.service.interface.js';
import { TYPES } from '../types.js';

@injectable()
export class CryptoService implements ICryptoService {
  constructor(
    @inject(TYPES.IConfigService) private configService: IConfigService
  ) {}
  async hash(value: string): Promise<string> {
    const salt = Number(this.configService.get('SALT'));
    return hash(value, salt);
  }
  async compare(value: string, hash: string): Promise<boolean> {
    return compare(value, hash);
  }
}
