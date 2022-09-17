import { Injectable } from '@nestjs/common';
import { ConfigName } from '@sendByBot/Config/enums/ConfigName';
import { loadDotenv } from '@sendByBot/Common/utils/loadDotenv';

@Injectable()
export class ConfigService {
  constructor() {
    loadDotenv()
  }

  public get<ConfigItem extends ConfigName>(
    name: ConfigItem,
  ): NodeJS.ProcessEnv[ConfigItem] {
    loadDotenv()
    const configParam = process.env[name];

    if (!configParam) {
      throw new Error(`Не найден параметр конфига: ${name}`);
    }

    return configParam;
  }

  public get IsDev(): boolean {
    return this.get(ConfigName.NODE_ENV) === 'development';
  }
}

export const externalConfigService = new ConfigService();
