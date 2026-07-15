import { Request, Response, NextFunction } from 'express';
import { IMiddleware } from './middleware.interface.js';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

export class ValidateMiddleware implements IMiddleware {
  constructor(private classToValidate: ClassConstructor<object>) {}
  execute({ body }: Request, res: Response, next: NextFunction): void {
    const instance = plainToClass(this.classToValidate, body);
    validate(instance).then((errors) => {
      if (errors.length > 0) {
        const formaterErrors = errors.map((error) => ({
          field: error.property,
          messages: Object.values(error.constraints || {}),
        }));
        res.status(422).send({
          status: 'error',
          errors: formaterErrors,
        });
      } else {
        next();
      }
    });
  }
}
