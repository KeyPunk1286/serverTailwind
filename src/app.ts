import express from "express";
import type { Express } from "express"
import { Server } from "http";
import { injectable, inject } from "inversify";
import 'reflect-metadata'
import { TYPES } from "./types.js";
import type { ILoggerService } from "./loggerService/logger.service.interface.js";

@injectable()
export class App { 
  app: Express;
  port: number;
  server!: Server;

  constructor(
    @inject(TYPES.ILoggerService) private loggerService: ILoggerService
  ){
    this.app = express();
    this.port = 5000;
  }

  public init() {
    this.server = this.app.listen(this.port)
    // console.log(`Server is running on port ${this.port}`);
    this.loggerService.log(`Server start http://localhost: ${this.port}`)
   }
}