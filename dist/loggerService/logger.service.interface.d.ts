import { Logger, ILogObj } from 'tslog';
export interface ILoggerService {
    logger: Logger<ILogObj>;
    log: (...args: unknown[]) => void;
    error: (...args: unknown[]) => void;
}
//# sourceMappingURL=logger.service.interface.d.ts.map