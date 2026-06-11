import express from "express";
import type { Express } from "express"
import { Server } from "http";

export class App { 
  app: Express;
  port: number;
  server!: Server;

  constructor(){
    this.app = express();
    this.port = 5000;
  }

  public init() {
    this.server = this.app.listen(this.port)
    console.log(`Server is running on port ${this.port}`);
   }
}