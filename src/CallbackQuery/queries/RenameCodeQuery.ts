import { Injectable } from '@nestjs/common';
import { SceneName } from '@sendByBot/Scenes/enums/SceneName';
import { Ctx } from 'nestjs-telegraf';
import { TContext } from '@sendByBot/Common/types/TContext';
import { CallbackQueryName } from '@sendByBot/CallbackQuery/enums/CallbackQueryName';
import { isQueryWithName } from '@sendByBot/CallbackQuery/guards/isQueryWithName';

@Injectable()
export class RenameCodeQuery {
  async onRenameCode(
    @Ctx() ctx: TContext,
  ) {
    if (!isQueryWithName(ctx, CallbackQueryName.RENAME_CODE)) {
      return;
    }

    ctx.scene.enter(SceneName.RENAME_CODE_SCENE);
  }
}
