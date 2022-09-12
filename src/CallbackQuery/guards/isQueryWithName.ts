import { CallbackQueryName } from '../enums/CallbackQueryName';
import { TContext } from '../../Common/types/TContext';

export const isQueryWithName = (ctx: TContext, name: CallbackQueryName): boolean =>
  ctx.callbackQuery.data === name;
