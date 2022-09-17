import { TContext } from '@sendByBot/Common/types/TContext';
import { CallbackQueryName } from '@sendByBot/CallbackQuery/enums/CallbackQueryName';

export const isQueryWithName = (ctx: TContext, name: CallbackQueryName): boolean =>
  ctx.callbackQuery.data === name;
