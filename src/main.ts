import { App } from "./app.js"
import { Container, ContainerModule, ContainerModuleLoadOptions } from 'inversify'
import { LoggerService } from "./loggerService/logger.service.js"
import { TYPES } from "./types.js"
import { ILoggerService } from "./loggerService/logger.service.interface.js"
import { ExeptionFilter } from "./errors/exeption.filter.js"
import { IExeptionFilter } from "./errors/exeption.filter.interface.js"
import { IUserController } from "./users/user-controller.interface.js"
import { UserController } from "./users/users-controller.js"

export const appBinding = new ContainerModule((options: ContainerModuleLoadOptions) => {
  options.bind<ILoggerService>(TYPES.ILoggerService).to(LoggerService)
  options.bind<IExeptionFilter>(TYPES.IExeptionFilter).to(ExeptionFilter)
  options.bind<IUserController>(TYPES.IUserController).to(UserController)
  options.bind<App>(TYPES.Application).to(App)
})

async function bootstrap() {
  const appContainer = new Container()
  await appContainer.load(appBinding)
  const app = appContainer.get<App>(TYPES.Application)
  app.init()
  return{appContainer, app}
}

export const appBootstrap = bootstrap()
appBootstrap.then(({ app, appContainer }) => {
  console.log("App start");
});
