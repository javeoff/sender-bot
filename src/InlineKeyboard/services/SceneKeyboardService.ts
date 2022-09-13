import { Injectable } from '@nestjs/common';
import { InlineKeyboardMarkup } from 'typegram/markup';
import { CallbackQueryName } from '../../CallbackQuery/enums/CallbackQueryName';

@Injectable()
export class SceneKeyboardService {
  getKeyboard(isExisting: boolean): InlineKeyboardMarkup {
    const firstRow = [
      // {
      //   text: "Кастомизировать ★",
      //   callback_data: CallbackQueryName.CUSTOMIZE
      // }
    ];

    if (isExisting) {
      firstRow.push(
        {
          text: "Удалить",
          callback_data: CallbackQueryName.DELETE
        }
      )
    }

    const secondRow = [];

    if (isExisting) {
      secondRow.push(
        {
          text: "Узнать код",
          callback_data: CallbackQueryName.GET_CODE
        }
      );
    }

    return {
      inline_keyboard: [
        firstRow,
        secondRow,
      ]
    }
  }
}
