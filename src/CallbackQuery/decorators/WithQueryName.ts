import { createParamDecorator } from '@nestjs/common';

import { CallbackQueryName } from '@sendByBot/CallbackQuery/enums/CallbackQueryName';
import { TContext } from '@sendByBot/Common/types/TContext';

export const WithQueryName = createParamDecorator(
  (name: CallbackQueryName, ctx: TContext) => {
    if (ctx.callbackQuery.data !== name) {
      return;
    }

    return ctx;
  },
);
