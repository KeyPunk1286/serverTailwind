import { Logger, ILogObj } from 'tslog';
import { ILoggerService } from './logger.service.interface.js';
import { injectable } from 'inversify';
import 'reflect-metadata';

@injectable()
export class LoggerService implements ILoggerService {
  logger: Logger<ILogObj>;

  constructor() {
    this.logger = new Logger();
  }

  public log(...args: unknown[]) {
    this.logger.info(...args);
  }

  public error(...args: unknown[]): void {
    this.logger.error(...args);
  }
}
