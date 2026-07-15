import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { BaseController } from '../common/base.controller.js';
import { IUserController } from './interfaces/user-controller.interface.js';
import { TYPES } from '../types.js';
import type { ILoggerService } from '../loggerService/logger.service.interface.js';
import { Request, Response, NextFunction } from 'express';
import { UserLoginDto } from './dto/user-login.dto.js';
import { UserRegisterDto } from './dto/user-registration.dto.js';
import { ValidateMiddleware } from '../common/validateMiddleware.js';
import type { IUserService } from './interfaces/uesers-service.interface.js';
import { AuthGuard } from '../common/auth.guard.js';
import { UserUpdateDto } from './dto/user-udate.dto.js';
import { RefreshTokenDto } from './dto/refresh-token.dto.js';
import { HTTPErrors } from '../errors/http-error.class.js';

@injectable()
export class UserController extends BaseController implements IUserController {
  constructor(
    @inject(TYPES.ILoggerService) loggerService: ILoggerService,
    @inject(TYPES.IUserService) private userService: IUserService
  ) {
    super(loggerService);
    this.bindRoutes([
      {
        path: '/login',
        method: 'post',
        func: this.login,
        middleware: [new ValidateMiddleware(UserLoginDto)],
      },
      {
        path: '/refresh',
        method: 'post',
        func: this.refresh,
        middleware: [new ValidateMiddleware(RefreshTokenDto)],
      },
      {
        path: '/registration',
        method: 'post',
        func: this.registration,
        middleware: [new ValidateMiddleware(UserRegisterDto)],
      },
      {
        path: '/get-user',
        method: 'get',
        func: this.getUser,
        middleware: [new AuthGuard()],
      },
      {
        path: '/update-user',
        method: 'put',
        func: this.update,
        middleware: [new AuthGuard()],
      },
      {
        path: '/logout',
        method: 'post',
        func: this.logout,
        middleware: [new AuthGuard()],
      },
    ]);
  }
  async login(
    req: Request<{}, {}, UserLoginDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      console.log('controllerUser', req.body);

      const loginRes = await this.userService.login(req.body);
      console.log(loginRes);

      this.ok(res, loginRes);
    } catch (error) {
      next(error);
    }
  }

  async refresh(
    req: Request<{}, {}, RefreshTokenDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const result = await this.userService.refresh(req.body);
      this.ok(res, result);
    } catch (error) {
      next(error);
    }
  }

  async registration(
    req: Request<{}, {}, UserRegisterDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userExist = await this.userService.registration(req.body);
      this.ok(res, userExist);
    } catch (error) {
      next(error);
    }
  }

  async getUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = req.user?.id;
      const user = await this.userService.getUser(userId);
      this.ok(res, user);
    } catch (error) {
      next(error);
    }
  }

  async update(
    req: Request<{}, {}, UserUpdateDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = req.user?.id;
      const updateUserData = await this.userService.update(req.body, userId);
      this.ok(res, updateUserData);
    } catch (error) {
      next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) {
        throw new HTTPErrors(401, 'Unauthorized', '[UsersController]');
      }
      const userId = req.user.id;
      await this.userService.logout(userId);
      this.ok(res, 'Logged out successfully');
    } catch (error) {
      next(error);
    }
  }
}
