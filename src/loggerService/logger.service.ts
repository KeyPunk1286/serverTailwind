import { Logger, ILogObj } from 'tslog'

export class LoggerService {
  logger: Logger<ILogObj>;

  constructor() {
    this.logger = new Logger();
  }
  
  public log(...args: unknown[]) {
    this.logger.info(...args);
  }

 }
