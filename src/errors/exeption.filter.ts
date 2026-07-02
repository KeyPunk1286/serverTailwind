import { Request, Response } from 'express';
import { IExeptionFilter } from './exeption.filter.interface.js';
import { HTTPErrors } from './http-error.class.js';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { TYPES } from '../types.js';
import type { ILoggerService } from '../loggerService/logger.service.interface.js';

@injectable()
export class ExeptionFilter implements IExeptionFilter {
  constructor(
    @inject(TYPES.ILoggerService) private loggerService: ILoggerService
  ) {}
  catch(err: Error | HTTPErrors, req: Request, res: Response): void {
    if (err instanceof HTTPErrors) {
      this.loggerService.error(
        `[${err.context}] error ${err.statusCode}: ${err.message}`
      );
      res.status(err.statusCode).send({ err: err.message });
    } else {
      res.status(500).send({ err: err.message });
    }
  }
}
