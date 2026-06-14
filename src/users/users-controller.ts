import { inject, injectable } from "inversify";
import "reflect-metadata";
import { BaseController } from "../common/base.controller.js";
import { IUserController } from "./user-controller.interface.js";
import { TYPES } from "../types.js";
import type { ILoggerService } from "../loggerService/logger.service.interface.js";
import { Request, Response, NextFunction } from "express";
import { UserLoginDto } from "./dto/user-login.dto.js";
import { UserRegisterDto } from "./dto/user-registration.dto.js";
import { ValidateMiddleware } from "../common/validateMiddleware.js";

@injectable()
export class UserController extends BaseController implements IUserController{
  constructor(@inject(TYPES.ILoggerService)  loggerService: ILoggerService ) {
    super(loggerService)
    this.bindRoutes([
      {path: '/login', method: 'post', func: this.login, middleware: [new ValidateMiddleware(UserLoginDto)]},
      {path: '/registration', method: 'post', func: this.registration, middleware: [new ValidateMiddleware(UserRegisterDto)]},
    ])
  }
  async login(req: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction): Promise<void> {
    console.log(req.body);
    
  }
  async registration(req: Request<{}, {}, UserRegisterDto>, res: Response, next: NextFunction): Promise<void> { 
    console.log(req.body);
  }
 }