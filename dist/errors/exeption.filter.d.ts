import { Request, Response, NextFunction } from "express";
import { IExeptionFilter } from "./exeption.filter.interface.js";
import { HTTPErrors } from "./http-error.class.js";
import 'reflect-metadata';
import type { ILoggerService } from "../loggerService/logger.service.interface.js";
export declare class ExeptionFilter implements IExeptionFilter {
    private loggerService;
    constructor(loggerService: ILoggerService);
    catch(err: Error | HTTPErrors, req: Request, res: Response, next: NextFunction): void;
}
//# sourceMappingURL=exeption.filter.d.ts.map