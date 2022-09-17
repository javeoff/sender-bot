import { CallbackQueryName } from '@sendByBot/CallbackQuery/enums/CallbackQueryName';
import { TContext } from '@sendByBot/Common/types/TContext';

export const isQueryWithName = (
  ctx: TContext,
  name: CallbackQueryName,
): boolean => ctx.callbackQuery.data === name;
