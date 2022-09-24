import { Injectable } from '@nestjs/common';
import { InlineKeyboardMarkup } from 'typegram/markup';

import { CallbackQueryName } from '@sendByBot/CallbackQuery/enums/CallbackQueryName';
import { KeyboardBuilder } from '@sendByBot/Common/utils/builders/KeyboardBuilder';

@Injectable()
export class CustomizeKeyboardService {
  public getKeyboard(withSaveButton = false): InlineKeyboardMarkup {
    const keyboard = new KeyboardBuilder();

    keyboard.add({
      text: 'Ухудшить',
      callback_data: CallbackQueryName.WORSE,
    });

    keyboard.add({
      text: 'Обесцветить',
      callback_data: CallbackQueryName.DISCOLOR,
    });

    keyboard.addRow();

    if (withSaveButton) {
      keyboard.add({
        text: 'Сохранить',
        callback_data: CallbackQueryName.SAVE_CUSTOMIZE,
      });
    }

    return keyboard.create();
  }
}
