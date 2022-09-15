import { Module } from '@nestjs/common';
import { ClickHouseModule } from '@depyronick/nestjs-clickhouse';
import { ReadActionsService } from './services/ReadActionsService';
import { ProviderName } from '../Common/enums/ProviderName';
import { MigrationService } from './services/MigrationsService';
import { ConfigName } from 'src/Config/enums/ConfigName';
import { externalConfigService } from '../Config/services/ConfigService';

@Module({
  providers: [
    MigrationService,
    ReadActionsService
  ],
  exports: [
    ReadActionsService,
  ],
  imports: [
    ClickHouseModule.register([{
      name: ProviderName.ANALYTICS_SERVER,
      host: externalConfigService.get(ConfigName.CLICKHOUSE_HOST),
      database: externalConfigService.get(ConfigName.CLICKHOUSE_DB),
      port: Number(externalConfigService.get(ConfigName.CLICKHOUSE_PORT)),
      username: externalConfigService.get(ConfigName.CLICKHOUSE_USER),
      password: externalConfigService.get(ConfigName.CLICKHOUSE_PASSWORD),
    }]),
  ],
})
export class AnalyticsModule {}
