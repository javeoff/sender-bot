import { Module } from '@nestjs/common';
import { ClickHouseModule } from '@depyronick/nestjs-clickhouse';
import { ReadActionsService } from './services/ReadActionsService';
import { ProviderName } from '../Common/enums/ProviderName';
import { MigrationService } from './services/MigrationsService';
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
      host: 'clickhouse_host',
      database: 'sendbot',
      port: 8123,
      username: 'root',
      password: 'root',
    }]),
  ],
})
export class AnalyticsModule {}
