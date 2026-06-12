import type { Express } from "express";
import { Server } from "http";
import 'reflect-metadata';
import type { ILoggerService } from "./loggerService/logger.service.interface.js";
export declare class App {
    private loggerService;
    app: Express;
    port: number;
    server: Server;
    constructor(loggerService: ILoggerService);
    init(): void;
}
//# sourceMappingURL=app.d.ts.map