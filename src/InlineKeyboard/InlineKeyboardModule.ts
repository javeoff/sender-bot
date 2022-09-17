import { Module } from '@nestjs/common';

import { EditKeyboardService } from '@sendByBot/InlineKeyboard/services/EditKeyboardService';
import { PagesKeyboardService } from '@sendByBot/InlineKeyboard/services/PagesKeyboardService';
import { SceneKeyboardService } from '@sendByBot/InlineKeyboard/services/SceneKeyboardService';

@Module({
  providers: [SceneKeyboardService, EditKeyboardService, PagesKeyboardService],
  exports: [SceneKeyboardService, EditKeyboardService, PagesKeyboardService],
})
export class InlineKeyboardModule {}
