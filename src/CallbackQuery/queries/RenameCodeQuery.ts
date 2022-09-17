import { Injectable } from '@nestjs/common';
import { Ctx } from 'nestjs-telegraf';

import { CallbackQueryName } from '@sendByBot/CallbackQuery/enums/CallbackQueryName';
import { isQueryWithName } from '@sendByBot/CallbackQuery/guards/isQueryWithName';
import { TContext } from '@sendByBot/Common/types/TContext';
import { SceneName } from '@sendByBot/Scenes/enums/SceneName';

@Injectable()
export class RenameCodeQuery {
  public onRenameCode(@Ctx() ctx: TContext): void {
    if (!isQueryWithName(ctx, CallbackQueryName.RENAME_CODE)) {
      return;
    }

    void ctx.scene.enter(SceneName.RENAME_CODE_SCENE);
  }
}
