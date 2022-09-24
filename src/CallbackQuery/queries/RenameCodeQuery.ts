import { Action, Ctx, Update } from 'nestjs-telegraf';

import { CallbackQueryName } from '@sendByBot/CallbackQuery/enums/CallbackQueryName';
import { TContext } from '@sendByBot/Common/types/TContext';
import { SceneName } from '@sendByBot/Scenes/enums/SceneName';

@Update()
export class RenameCodeQuery {
  @Action(CallbackQueryName.RENAME_CODE)
  public async onRenameCode(@Ctx() ctx: TContext): Promise<void> {
    await ctx.scene.enter(SceneName.RENAME_CODE_SCENE);
  }
}
