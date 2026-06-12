import { Router, Response } from "express";
import { IControllerRoute } from "./route.interface.js";

export abstract class BaseController {
  private readonly _router: Router

  constructor() {
    this._router = Router()
  }

  get router() {
    return this._router
  }

  public send<T>(res: Response, code: number, message: T) {
    res.type('application/jaso')
    return res.status(code).json(message)
  }

  public ok<T>(res: Response, message: T) {
    return this.send(res, 200, message)
  }

  public created(res: Response) {
    return res.sendStatus(201)
  }

  protected bindRoutes(routes: IControllerRoute[]) {
    routes.forEach((route) => {
      const hendler = route.func.bind(this)
      this.router[route.method](route.path, hendler)
    })
  }

 }