// import { JwtPayload, verify } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import type { IMiddleware } from "./middleware.interface.js";
import { Request, Response, NextFunction } from "express";

export class AuthMiddleware implements IMiddleware{
constructor(private sicret: string){}

  execute(req: Request, res: Response, next: NextFunction): void{
    const authHeader = req.headers.authorization
    if (!authHeader) {
      return next()
    }
    const token = authHeader?.split(" ")[1]
    if (!token) {
     return next()
    }
    jwt.verify(token, this.sicret, (err, payload) => {
      if (err) {
        return next()
      }
      if (typeof payload === 'object' && payload !== null) {
        req.user = {
          id: (payload as jwt.JwtPayload).id,
          email: (payload as jwt.JwtPayload).email
        }
      }
      next()
    })
  };
}