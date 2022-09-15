import { Inject, Injectable } from '@nestjs/common';
import { ProviderName } from '../../Common/enums/ProviderName';
import { ClickHouseClient } from '@depyronick/nestjs-clickhouse';

@Injectable()
export class MigrationService {
  constructor(
    @Inject(ProviderName.ANALYTICS_SERVER)
    private readonly analyticsServer: ClickHouseClient,
  ) {
    void this.createReadActionsTable();
  }

  async createReadActionsTable() {
    return this.analyticsServer.queryPromise(
      `CREATE TABLE read_actions (user_id UInt32, code String, timestamp UInt32,chat_type String,action_type String,lang String,is_premium UInt32) ENGINE = MergeTree ORDER BY timestamp`
    ).catch((e) => console.error(e))
  }
}
