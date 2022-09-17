import { ClickHouseModule } from '@depyronick/nestjs-clickhouse';
import { Module } from '@nestjs/common';

import { ReadActionsService } from '@sendByBot/Analytics/services/ReadActionsService';
import { ProviderName } from '@sendByBot/Common/enums/ProviderName';
import { ConfigName } from '@sendByBot/Config/enums/ConfigName';
import { externalConfigService } from '@sendByBot/Config/services/ConfigService';

@Module({
  providers: [ReadActionsService],
  exports: [ReadActionsService],
  imports: [
    ClickHouseModule.register([
      {
        name: ProviderName.ANALYTICS_SERVER,
        host: externalConfigService.get(ConfigName.CLICKHOUSE_HOST),
        database: externalConfigService.get(ConfigName.CLICKHOUSE_DB),
        port: Number(externalConfigService.get(ConfigName.CLICKHOUSE_PORT)),
        username: externalConfigService.get(ConfigName.CLICKHOUSE_USER),
        password: externalConfigService.get(ConfigName.CLICKHOUSE_PASSWORD),
      },
    ]),
  ],
})
export class AnalyticsModule {}
