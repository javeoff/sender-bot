import { Injectable } from '@nestjs/common';

import { loadDotenv } from '@sendByBot/Common/utils/loadDotenv';
import { ConfigName } from '@sendByBot/Config/enums/ConfigName';

loadDotenv();

@Injectable()
export class ConfigService {
  public get<ConfigItem extends ConfigName>(
    name: ConfigItem,
  ): NodeJS.ProcessEnv[ConfigItem] {
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
