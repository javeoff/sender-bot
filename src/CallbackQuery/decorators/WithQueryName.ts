import { CallbackQueryName } from '../enums/CallbackQueryName';
import { TContext } from '../../Common/types/TContext';
import { createParamDecorator } from '@nestjs/common';

export const WithQueryName = createParamDecorator(
  (name: CallbackQueryName, ctx: TContext) => {
    if (ctx.callbackQuery.data !== name) {
      return;
    }

    return ctx;
  }
)
