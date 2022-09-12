import { Injectable } from '@nestjs/common';
import { InlineKeyboardMarkup } from 'typegram/markup';
import { CallbackQueryName } from '../../CallbackQuery/enums/CallbackQueryName';

@Injectable()
export class PagesKeyboardService {
  getPagesKeyboard(hideLeft?: boolean, hideRight?: boolean): InlineKeyboardMarkup {
    const firstRow = [];

    if (!hideLeft) {
      firstRow.push({
        text: '⬅️️',
        callback_data: CallbackQueryName.PREV_PAGE
      })
    }
    if (!hideRight) {
      firstRow.push({
        text: '➡️',
        callback_data: CallbackQueryName.NEXT_PAGE
      })
    }

    return {
      inline_keyboard: [
        firstRow
      ]
    }
  }
}
