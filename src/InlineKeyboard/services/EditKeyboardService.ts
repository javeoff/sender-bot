import { Injectable } from '@nestjs/common';
import { InlineKeyboardMarkup } from 'typegram/markup';
import { CallbackQueryName } from '../../CallbackQuery/enums/CallbackQueryName';

@Injectable()
export class EditKeyboardService {
  getEditKeyboard(): InlineKeyboardMarkup {
    return {
      inline_keyboard: [
        [
          {
            text: "Изменить код",
            callback_data: CallbackQueryName.RENAME_CODE
          },
          {
            text: "Удалить",
            callback_data: CallbackQueryName.DELETE
          }
        ],
        [
          {
            text: "Список сохраненных данных",
            callback_data: CallbackQueryName.LIST
          }
        ]
      ]
    }
  }
}
