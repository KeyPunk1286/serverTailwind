import { JwtPayload, verify } from "jsonwebtoken";
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
    verify(token, this.sicret, (err, payload) => {
      if (err) {
        return next()
      }
      if (typeof payload === 'object' && payload !== null) {
        req.user = {
          id: (payload as JwtPayload).id,
          email: (payload as JwtPayload).email
        }
      }
      next()
    })
  };
}