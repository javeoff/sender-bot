import { Module } from '@nestjs/common';

import { EditKeyboardService } from '@sendByBot/InlineKeyboard/services/EditKeyboardService';
import { PagesKeyboardService } from '@sendByBot/InlineKeyboard/services/PagesKeyboardService';
import { SceneKeyboardService } from '@sendByBot/InlineKeyboard/services/SceneKeyboardService';
import { SendCodeKeyboardService } from '@sendByBot/InlineKeyboard/services/SendCodeKeyboardService';

@Module({
  providers: [
    SceneKeyboardService,
    EditKeyboardService,
    PagesKeyboardService,
    SendCodeKeyboardService,
  ],
  exports: [
    SceneKeyboardService,
    EditKeyboardService,
    PagesKeyboardService,
    SendCodeKeyboardService,
  ],
})
export class InlineKeyboardModule {}
