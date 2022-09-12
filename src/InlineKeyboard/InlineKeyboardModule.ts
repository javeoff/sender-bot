import { Module } from '@nestjs/common';
import { SceneKeyboardService } from './services/SceneKeyboardService';
import { EditKeyboardService } from './services/EditKeyboardService';
import { PagesKeyboardService } from './services/PagesKeyboardService';

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
