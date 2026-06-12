import { App } from "./app.js";
import { Container } from 'inversify';
import { LoggerService } from "./loggerService/logger.service.js";
import { TYPES } from "./types.js";
import { ExeptionFilter } from "./errors/exeption.filter.js";
const appContainer = new Container();
appContainer.bind(TYPES.ILoggerService).to(LoggerService);
appContainer.bind(TYPES.IExeptionFilter).to(ExeptionFilter);
appContainer.bind(TYPES.Application).to(App);
const app = appContainer.get(TYPES.Application);
app.init();
export { app, appContainer };
//# sourceMappingURL=main.js.map