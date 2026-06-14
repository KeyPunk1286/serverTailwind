import { inject } from "inversify";
import { IConfigService } from "./config.service.interface.js";
import { config, DotenvConfigOutput, DotenvParseOutput } from "dotenv";
import { TYPES } from "../types.js";
import type { ILoggerService } from "../loggerService/logger.service.interface.js";

export class ConfigService implements IConfigService{
  private config: DotenvParseOutput
  constructor(@inject(TYPES.ILoggerService) private loggerService: ILoggerService) {
    const result: DotenvConfigOutput = config()
    if (result.error) {
      this.loggerService.log('[ConfigService] The .env file could not be read or is missing.')
    } else {
      this.loggerService.log('[ConfigService] The .env config is loaded')
      this.config = result.parsed as DotenvParseOutput
    }
  }
  get(key: string): string | undefined{
    const value = this.config[key]
    if (!value) {
      this.loggerService.error(`[ConfigService] Missing env variable: ${key}`)
    }
    return value
  };
}