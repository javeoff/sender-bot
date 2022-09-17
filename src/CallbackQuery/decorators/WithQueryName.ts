import { createParamDecorator } from '@nestjs/common';
import { TContext } from '@sendByBot/Common/types/TContext';
import { CallbackQueryName } from '@sendByBot/CallbackQuery/enums/CallbackQueryName';

export const WithQueryName = createParamDecorator(
  (name: CallbackQueryName, ctx: TContext) => {
    if (ctx.callbackQuery.data !== name) {
      return;
    }

    return ctx;
  }
)
