import { NextFunction, Request, Response } from 'express';
import { Router } from 'express';

export interface IUserController {
  router: Router;
  login: (req: Request, res: Response, next: NextFunction) => Promise<void>;
  registration: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>;
  getUser: (req: Request, res: Response, next: NextFunction) => Promise<void>;
  update: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
