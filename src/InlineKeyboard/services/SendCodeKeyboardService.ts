import { Injectable } from '@nestjs/common';
import TelegrafI18n from 'telegraf-i18n';
import { InlineKeyboardMarkup } from 'typegram/markup';

@Injectable()
export class SendCodeKeyboardService {
  public getKeyboard(code: string, i18n: TelegrafI18n): InlineKeyboardMarkup {
    const firstRow = [];

    firstRow.push({
      text: i18n.t('keyboards.send'),
      switch_inline_query: code,
    });

    return {
      inline_keyboard: [firstRow],
    };
  }
}
