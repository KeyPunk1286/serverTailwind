import express from "express";
import type { Express } from "express"
import { Server } from "http";
import { injectable, inject } from "inversify";
import 'reflect-metadata'
import { TYPES } from "./types.js";
import type { ILoggerService } from "./loggerService/logger.service.interface.js";
import  bodyParser   from "body-parser";
import type { IUserController } from "./users/interfaces/user-controller.interface.js";
import { PrismaService } from "./database/prisma.service.js";
import { AuthMiddleware } from "./common/auth.middleware.js";
import type { IConfigService } from "./config/config.service.interface.js";
import type { IExeptionFilter } from "./errors/exeption.filter.interface.js";
import cors from "cors";

@injectable()
export class App { 
  app: Express;
  port: number;
  server!: Server;

  constructor(
    @inject(TYPES.ILoggerService) private loggerService: ILoggerService,
    @inject(TYPES.IExeptionFilter) private exeptionFilter: IExeptionFilter,
    @inject(TYPES.IUserController) private userController: IUserController,
    @inject(TYPES.PrismaService) private prismaService: PrismaService,
    @inject(TYPES.IConfigService) private configService: IConfigService
  ){
    this.app = express();
    this.port = 5000;
  }

  useMiddleware():void {
    this.app.use(bodyParser.json())
    this.app.use(cors({
      origin: '*'
    }))
    const authMiddleware = new AuthMiddleware(this.configService.get('SECRET'))
    this.app.use(authMiddleware.execute.bind(authMiddleware))
  }

  useRoutes():void {
    this.app.use('/users', this.userController.router)
  }

  useExeptionFilter(): void{
    this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter))
  }

  public async init(): Promise<void> {
    this.useMiddleware()
    this.useRoutes()
    await this.prismaService.connect()
    this.server = this.app.listen(this.port)
    this.loggerService.log(`Server start http://localhost: ${this.port}`)
   }
}