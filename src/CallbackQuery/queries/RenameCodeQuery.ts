import { Injectable } from '@nestjs/common';
import { Ctx } from 'nestjs-telegraf';
import { TContext } from '../../Common/types/TContext';
import { isQueryWithName } from '../guards/isQueryWithName';
import { CallbackQueryName } from '../enums/CallbackQueryName';
import { SceneName } from '../../Scenes/enums/SceneName';

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
