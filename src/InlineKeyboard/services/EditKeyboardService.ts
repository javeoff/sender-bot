import { Injectable } from '@nestjs/common';
import { InlineKeyboardMarkup } from 'typegram/markup';
import { TContext } from '@sendByBot/Common/types/TContext';
import { CallbackQueryName } from '@sendByBot/CallbackQuery/enums/CallbackQueryName';

@Injectable()
export class EditKeyboardService {
  getEditKeyboard(i18n: TContext['i18n']): InlineKeyboardMarkup {
    return {
      inline_keyboard: [
        [
          {
            text: i18n.t("keyboards.edit.rename_code"),
            callback_data: CallbackQueryName.RENAME_CODE
          },
          {
            text: i18n.t("keyboards.edit.delete"),
            callback_data: CallbackQueryName.DELETE
          }
        ],
        [
          {
            text: i18n.t("keyboards.edit.list"),
            callback_data: CallbackQueryName.LIST
          }
        ]
      ]
    }
  }
}
