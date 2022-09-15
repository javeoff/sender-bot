import { Module } from '@nestjs/common';
import { ClickHouseModule } from '@depyronick/nestjs-clickhouse';
import { ReadActionsService } from './services/ReadActionsService';
import { ProviderName } from '../Common/enums/ProviderName';
import { MigrationService } from './services/MigrationsService';
import { externalConfigService } from '../Config/services/ConfigService';
import { ConfigName } from '../Config/enums/ConfigName';
import { loadDotenv } from '../Common/utils/loadDotenv';

loadDotenv()

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
