import { ClickHouseClient } from '@depyronick/nestjs-clickhouse';
import { Inject, Injectable } from '@nestjs/common';

import { IReadAction } from '@sendByBot/Analytics/types/IReadAction';
import { ProviderName } from '@sendByBot/Common/enums/ProviderName';

@Injectable()
export class ReadActionsService {
  public constructor(
    @Inject(ProviderName.ANALYTICS_SERVER)
    private readonly analyticsServer: ClickHouseClient,
  ) {}

  public async add(action: IReadAction): Promise<void> {
    await this.analyticsServer
      .insertPromise('read_actions', [
        {
          user_id: action.userId,
          code: action.code,
          chat_type: action.chatType,
          action_type: action.actionType,
          lang: action.lang,
          is_premium: action.isPremium ? 1 : 0,
          timestamp: action.timestamp,
        },
      ])
      .catch((error) => console.error(error));
  }
}
