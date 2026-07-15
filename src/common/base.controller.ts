import { Router, Response } from 'express';
import { IControllerRoute } from './route.interface.js';
import { ILoggerService } from '../loggerService/logger.service.interface.js';

export abstract class BaseController {
  private readonly _router: Router;

  constructor(private loggerService: ILoggerService) {
    this._router = Router();
  }

  get router() {
    return this._router;
  }

  public send<T>(res: Response, code: number, message: T) {
    res.type('application/jason');
    return res.status(code).json(message);
  }

  public ok<T>(res: Response, message: T) {
    return this.send(res, 200, message);
  }

  public created(res: Response) {
    return res.sendStatus(201);
  }

  protected bindRoutes(routes: IControllerRoute[]) {
    routes.forEach((route) => {
      this.loggerService.log(`[${route.method}] ${route.path}`);
      const middleware = route.middleware?.map((m) => m.execute.bind(m));
      const hendler = route.func.bind(this);
      const pipeline = middleware ? [...middleware, hendler] : hendler;
      this.router[route.method](route.path, pipeline);
    });
  }
}
