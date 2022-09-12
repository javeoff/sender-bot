import { DataSource, DataSourceOptions } from 'typeorm';
import { ProviderName } from '../enums/ProviderName';
import { ConfigService, externalConfigService } from '../../Config/services/ConfigService';
import { ConfigName } from '../../Config/enums/ConfigName';

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
      entities: ['src/**/entites/*.{ts,js}'],
      migrations: ["src/**/migrations/*.{ts,js}"],
      subscribers: ["src/**/subscribers/*.{ts,js}"],
      synchronize: true,
      logging: false,
    }

    const dataSource = new DataSource(config)
    return dataSource.initialize()
  },
  inject: [ConfigService],
}

export default new DataSource({
  type: 'postgres',
  host: externalConfigService.get(ConfigName.DB_HOST),
  port: Number(externalConfigService.get(ConfigName.DB_PORT)),
  username: externalConfigService.get(ConfigName.DB_USERNAME),
  password: externalConfigService.get(ConfigName.DB_PASSWORD),
  database: externalConfigService.get(ConfigName.DB_DATABASE),
  entities: ['src/**/entites/*.{ts,js}'],
  migrations: ["src/**/migrations/*.{ts,js}"],
  subscribers: ["src/**/subscribers/*.{ts,js}"],
})
