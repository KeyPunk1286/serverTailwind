import { PrismaClient } from '../generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { TYPES } from '../types.js';
import type { IConfigService } from '../config/config.service.interface.js';
import type { ILoggerService } from '../loggerService/logger.service.interface.js';

@injectable()
export class PrismaService {
  client: PrismaClient;
  constructor(
    @inject(TYPES.IConfigService) private configService: IConfigService,
    @inject(TYPES.ILoggerService) private loggerService: ILoggerService
  ) {
    const connectionString = this.configService.get('DATABASE_URL');
    const adapter = new PrismaPg({ connectionString });
    this.client = new PrismaClient({ adapter });
  }

  async connect(): Promise<void> {
    try {
      await this.client.$connect();
      await this.client.$queryRaw`SELECT 1`;
      this.loggerService.log(
        '[PrismaService] Successful connection to the database'
      );
    } catch (error) {
      this.loggerService.error(
        `[PrismaService] Database connection error ${error}`
      );
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    await this.client.$disconnect();
  }
}
