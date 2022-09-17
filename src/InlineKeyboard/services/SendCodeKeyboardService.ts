import { Injectable } from '@nestjs/common';
import { InlineKeyboardMarkup } from 'typegram/markup';

@Injectable()
export class SendCodeKeyboardService {
  public getKeyboard(code: string): InlineKeyboardMarkup {
    const firstRow = [];

    firstRow.push({
      text: 'Отправить стикер',
      switch_inline_query: code,
    });

    return {
      inline_keyboard: [firstRow],
    };
  }
}
