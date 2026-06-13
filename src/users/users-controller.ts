import { inject, injectable } from "inversify";
import "reflect-metadata";
import { BaseController } from "../common/base.controller.js";
import { IUserController } from "./user-controller.interface.js";
import { TYPES } from "../types.js";
import type { ILoggerService } from "../loggerService/logger.service.interface.js";
import { Request, Response, NextFunction } from "express";
import { UserLoginDto } from "./dto/user-login.dto.js";
import { UserRegisterDto } from "./dto/user-registration.dto.js";

@injectable()
export class UserController extends BaseController implements IUserController{
  constructor(@inject(TYPES.ILoggerService)  loggerService: ILoggerService ) {
     super(loggerService)
  }
  async login(req: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction): Promise<void> { }
  async registration(req: Request<{}, {}, UserRegisterDto>, res: Response, next: NextFunction): Promise<void> { }
 }