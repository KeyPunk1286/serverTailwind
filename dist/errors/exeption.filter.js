var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { HTTPErrors } from "./http-error.class.js";
import { inject, injectable } from "inversify";
import 'reflect-metadata';
import { TYPES } from "../types.js";
let ExeptionFilter = class ExeptionFilter {
    loggerService;
    constructor(loggerService) {
        this.loggerService = loggerService;
    }
    catch(err, req, res, next) {
        if (err instanceof HTTPErrors) {
            this.loggerService.error(`[${err.context}] error ${err.statusCode}: ${err.message}`);
            res.status(err.statusCode).send({ err: err.message });
        }
        else {
            res.status(500).send({ err: err.message });
        }
    }
    ;
};
ExeptionFilter = __decorate([
    injectable(),
    __param(0, inject(TYPES.ILoggerService)),
    __metadata("design:paramtypes", [Object])
], ExeptionFilter);
export { ExeptionFilter };
//# sourceMappingURL=exeption.filter.js.map