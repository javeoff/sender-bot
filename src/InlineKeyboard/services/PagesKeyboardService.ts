import { Injectable } from '@nestjs/common';
import { InlineKeyboardMarkup } from 'typegram/markup';

import { CallbackQueryName } from '@sendByBot/CallbackQuery/enums/CallbackQueryName';

@Injectable()
export class PagesKeyboardService {
  public getPagesKeyboard(
    hideLeft?: boolean,
    hideRight?: boolean,
  ): InlineKeyboardMarkup {
    const firstRow = [];

    if (!hideLeft) {
      firstRow.push({
        text: '⬅️️',
        callback_data: CallbackQueryName.PREV_PAGE,
      });
    }
    if (!hideRight) {
      firstRow.push({
        text: '➡️',
        callback_data: CallbackQueryName.NEXT_PAGE,
      });
    }

    return {
      inline_keyboard: [firstRow],
    };
  }
}
