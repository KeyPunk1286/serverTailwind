import { App } from './app.js';
import {
  Container,
  ContainerModule,
  ContainerModuleLoadOptions,
} from 'inversify';
import { LoggerService } from './loggerService/logger.service.js';
import { TYPES } from './types.js';
import { ILoggerService } from './loggerService/logger.service.interface.js';
import { ExeptionFilter } from './errors/exeption.filter.js';
import { IExeptionFilter } from './errors/exeption.filter.interface.js';
import { IUserController } from './users/interfaces/user-controller.interface.js';
import { UserController } from './users/users-controller.js';
import { IConfigService } from './config/config.service.interface.js';
import { ConfigService } from './config/config.service.js';
import { PrismaService } from './database/prisma.service.js';
import { IUserRepository } from './users/interfaces/users.repository.interface.js';
import { UsersRepository } from './users/users-repository.js';
import { IUserService } from './users/interfaces/uesers-service.interface.js';
import { UsersService } from './users/users-service.js';

export const appBinding = new ContainerModule(
  (options: ContainerModuleLoadOptions) => {
    options
      .bind<ILoggerService>(TYPES.ILoggerService)
      .to(LoggerService)
      .inSingletonScope();
    options
      .bind<IExeptionFilter>(TYPES.IExeptionFilter)
      .to(ExeptionFilter)
      .inSingletonScope();
    options
      .bind<IUserController>(TYPES.IUserController)
      .to(UserController)
      .inSingletonScope();
    options
      .bind<IConfigService>(TYPES.IConfigService)
      .to(ConfigService)
      .inSingletonScope();
    options
      .bind<PrismaService>(TYPES.PrismaService)
      .to(PrismaService)
      .inSingletonScope();
    options
      .bind<IUserRepository>(TYPES.IUserRepository)
      .to(UsersRepository)
      .inSingletonScope();
    options
      .bind<IUserService>(TYPES.IUserService)
      .to(UsersService)
      .inSingletonScope();
    options.bind<App>(TYPES.Application).to(App).inSingletonScope();
  }
);

async function bootstrap() {
  const appContainer = new Container();
  await appContainer.load(appBinding);
  const app = appContainer.get<App>(TYPES.Application);
  app.init();
  return { appContainer, app };
}

export const appBootstrap = bootstrap();
appBootstrap.then(({ app: _app, appContainer: _appContainer }) => {
  console.log('App start');
});
