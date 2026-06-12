import { Router } from "express";
export class BaseController {
    _router;
    constructor() {
        this._router = Router();
    }
    get router() {
        return this._router;
    }
    send(res, code, message) {
        res.type('application/jaso');
        return res.status(code).json(message);
    }
    ok(res, message) {
        return this.send(res, 200, message);
    }
    created(res) {
        return res.sendStatus(201);
    }
    bindRoutes(routes) {
        routes.forEach((route) => {
            const hendler = route.func.bind(this);
            this.router[route.method](route.path, hendler);
        });
    }
}
//# sourceMappingURL=base.controller.js.map