import { App } from "./app.js"
import { Container } from 'inversify'
import { LoggerService } from "./loggerService/logger.service.js"
import { TYPES } from "./types.js"
import { ILoggerService } from "./loggerService/logger.service.interface.js"
import { ExeptionFilter } from "./errors/exeption.filter.js"
import { IExeptionFilter } from "./errors/exeption.filter.interface.js"

const appContainer = new Container() 
appContainer.bind<ILoggerService>(TYPES.ILoggerService).to(LoggerService)
appContainer.bind<IExeptionFilter>(TYPES.IExeptionFilter).to(ExeptionFilter)
appContainer.bind<App>(TYPES.Application).to(App)
const app = appContainer.get<App>(TYPES.Application)
app.init()

export { app, appContainer }

