import { Injectable } from '@nestjs/common';
import { Ctx } from 'nestjs-telegraf';

import { Query } from '@sendByBot/CallbackQuery/decorators/Query';
import { CallbackQueryName } from '@sendByBot/CallbackQuery/enums/CallbackQueryName';
import { TContext } from '@sendByBot/Common/types/TContext';
import { SceneName } from '@sendByBot/Scenes/enums/SceneName';

@Injectable()
export class RenameCodeQuery {
  @Query(CallbackQueryName.RENAME_CODE)
  public onRenameCode(@Ctx() ctx: TContext): void {
    void ctx.scene.enter(SceneName.RENAME_CODE_SCENE);
  }
}
