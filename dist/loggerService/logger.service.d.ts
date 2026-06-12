import { Logger, ILogObj } from 'tslog';
import { ILoggerService } from './logger.service.interface.js';
import 'reflect-metadata';
export declare class LoggerService implements ILoggerService {
    logger: Logger<ILogObj>;
    constructor();
    log(...args: unknown[]): void;
    error(...args: unknown[]): void;
}
//# sourceMappingURL=logger.service.d.ts.map