import { DataSource, DataSourceOptions } from 'typeorm';
import { ProviderName } from '../enums/ProviderName';
import { ConfigService } from '../../Config/services/ConfigService';
import { ConfigName } from '../../Config/enums/ConfigName';
import { loadDotenv } from '../utils/loadDotenv';

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

loadDotenv();

export default new DataSource({
  type: 'postgres',
  host: 'postgres_host',
  port: 5432,
  username: 'root',
  password:'root',
  database: 'sendbot',
  entities: ['src/**/entities/*.{ts,js}'],
  migrations: ["src/**/migrations/*.{ts,js}"],
  subscribers: ["src/**/subscribers/*.{ts,js}"],
  synchronize: true,
  logging: true,
})
