import { Inject, Injectable } from '@nestjs/common';
import { ClickHouseClient } from '@depyronick/nestjs-clickhouse';
import { ProviderName } from '@sendByBot/Common/enums/ProviderName';
import { IReadAction } from '@sendByBot/Analytics/types/IReadAction';

@Injectable()
export class ReadActionsService {
  constructor(
    @Inject(ProviderName.ANALYTICS_SERVER)
    private readonly analyticsServer: ClickHouseClient,
  ) {}

  async add(action: IReadAction) {
    void this.analyticsServer.insertPromise('read_actions', [
      {
        user_id: action.userId,
        code: action.code,
        chat_type: action.chatType,
        action_type: action.actionType,
        lang: action.lang,
        is_premium: action.isPremium ? 1 : 0,
        timestamp: action.timestamp,
      }
    ]).catch((e) => console.error(e));
  }
}
