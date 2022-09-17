import { Module } from '@nestjs/common';
import { SceneKeyboardService } from '@sendByBot/InlineKeyboard/services/SceneKeyboardService';
import { EditKeyboardService } from '@sendByBot/InlineKeyboard/services/EditKeyboardService';
import { PagesKeyboardService } from '@sendByBot/InlineKeyboard/services/PagesKeyboardService';

@Module({
  providers: [
    SceneKeyboardService,
    EditKeyboardService,
    PagesKeyboardService,
  ],
  exports: [
    SceneKeyboardService,
    EditKeyboardService,
    PagesKeyboardService,
  ],
})
export class InlineKeyboardModule {}
