import express from "express";
import type { Express } from "express"
import { Server } from "http";
import { injectable, inject } from "inversify";
import 'reflect-metadata'
import { TYPES } from "./types.js";
import type { ILoggerService } from "./loggerService/logger.service.interface.js";
import  bodyParser   from "body-parser";
import type { IUserController } from "./users/user-controller.interface.js";
import { PrismaService } from "./database/prisma.service.js";

@injectable()
export class App { 
  app: Express;
  port: number;
  server!: Server;

  constructor(
    @inject(TYPES.ILoggerService) private loggerService: ILoggerService,
    @inject(TYPES.IUserController) private userController: IUserController,
    @inject(TYPES.PrismaService) private prismaService: PrismaService,
  ){
    this.app = express();
    this.port = 5000;
  }

  useMiddleware():void {
    this.app.use(bodyParser.json())
  }

  useRoutes():void {
    this.app.use('/users', this.userController.router)
  }

  public async init(): Promise<void> {
    this.useMiddleware()
    this.useRoutes()
    await this.prismaService.connect()
    this.server = this.app.listen(this.port)
    this.loggerService.log(`Server start http://localhost: ${this.port}`)
   }
}