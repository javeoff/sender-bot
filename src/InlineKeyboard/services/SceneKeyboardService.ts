import { Injectable } from '@nestjs/common';
import { InlineKeyboardMarkup } from 'typegram/markup';
import { CallbackQueryName } from '../../CallbackQuery/enums/CallbackQueryName';
import { TContext } from '../../Common/types/TContext';

@Injectable()
export class SceneKeyboardService {
  getKeyboard(i18n: TContext['i18n'], isExisting: boolean): InlineKeyboardMarkup {
    const firstRow = [
      // {
      //   text: i18n.t('keyboards.scene.customize'),
      //   callback_data: CallbackQueryName.CUSTOMIZE
      // }
    ];

    if (isExisting) {
      firstRow.push(
        {
          text: i18n.t('keyboards.scene.delete'),
          callback_data: CallbackQueryName.DELETE
        }
      )
    }

    const secondRow = [];

    if (isExisting) {
      secondRow.push(
        {
          text: i18n.t('keyboards.scene.get_code'),
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
