import { DataSource, DataSourceOptions } from 'typeorm';
import { ProviderName } from '@sendByBot/Common/enums/ProviderName';
import { ConfigService, externalConfigService } from '@sendByBot/Config/services/ConfigService';
import { ConfigName } from '@sendByBot/Config/enums/ConfigName';
import { loadDotenv } from '@sendByBot/Common/utils/loadDotenv';

export const ormProvider = {
  provide: ProviderName.DATA_SOURCE,
  useFactory: (configService: ConfigService) => {
    const config: DataSourceOptions = {
      type: 'postgres',
      host: configService.get(ConfigName.DB_HOST),
      port: Number(configService.get(ConfigName.DB_PORT)),
      username: configService.get(ConfigName.DB_USERNAME),
      password: configService.get(ConfigName.DB_PASSWORD),
      database: configService.get(ConfigName.DB_DATABASE),
      entities: ['src/**/entities/*.{js,ts}'],
      migrations: ["src/**/migrations/*.{js,ts}"],
      subscribers: ["src/**/subscribers/*.{js,ts}"],
      synchronize: true,
      logging: true,
    }

    const dataSource = new DataSource(config)
    return dataSource.initialize()
  },
  inject: [ConfigService],
}

loadDotenv()

export default new DataSource({
  type: 'postgres',
  host: externalConfigService.get(ConfigName.DB_HOST),
  port: Number(externalConfigService.get(ConfigName.DB_PORT)),
  username: externalConfigService.get(ConfigName.DB_USERNAME),
  password: externalConfigService.get(ConfigName.CLICKHOUSE_PASSWORD),
  database: externalConfigService.get(ConfigName.DB_DATABASE),
  entities: ['src/**/entities/*.{ts,js}'],
  migrations: ["src/**/migrations/*.{ts,js}"],
  subscribers: ["src/**/subscribers/*.{ts,js}"],
  synchronize: true,
  logging: true,
})
