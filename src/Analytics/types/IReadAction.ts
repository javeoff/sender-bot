import { TReadActionType } from './TReadActionType';
import { TChatType } from './TChatType';

export interface IReadAction {
  userId: string;
  code: string;
  actionType: TReadActionType;
  chatType: TChatType;
  lang: string;
  isPremium: boolean;
  timestamp: number;
}
