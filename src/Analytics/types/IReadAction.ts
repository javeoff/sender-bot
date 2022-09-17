import { TReadActionType } from '@sendByBot/Analytics/types/TReadActionType';
import { TChatType } from '@sendByBot/Analytics/types/TChatType';

export interface IReadAction {
  userId: string;
  code: string;
  actionType: TReadActionType;
  chatType: TChatType;
  lang: string;
  isPremium: boolean;
  timestamp: number;
}
