import { ClickHouseClient } from '@depyronick/nestjs-clickhouse';
import { Inject, Injectable } from '@nestjs/common';

import { ProviderName } from '@sendByBot/Common/enums/ProviderName';

@Injectable()
export class MigrationService {
  public constructor(
    @Inject(ProviderName.ANALYTICS_SERVER)
    private readonly analyticsServer: ClickHouseClient,
  ) {
    void this.createReadActionsTable();
  }

  public async createReadActionsTable(): Promise<unknown[] | void> {
    return this.analyticsServer
      .queryPromise(
        `CREATE TABLE read_actions (user_id UInt32, code String, timestamp UInt32,chat_type String,action_type String,lang String,is_premium UInt32) ENGINE = MergeTree ORDER BY timestamp`,
      )
      .catch((error) => console.error(error));
  }
}
