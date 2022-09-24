import { Action, Ctx, Update } from 'nestjs-telegraf';

import { CallbackQueryName } from '@sendByBot/CallbackQuery/enums/CallbackQueryName';
import { TContext } from '@sendByBot/Common/types/TContext';
import { SceneName } from '@sendByBot/Scenes/enums/SceneName';

@Update()
export class SaveCustomizeQuery {
  @Action(CallbackQueryName.SAVE_CUSTOMIZE)
  public async onSave(@Ctx() ctx: TContext): Promise<void> {
    console.log(ctx.message, 'ctx.message', ctx.callbackQuery.data);

    if (
      ctx.callbackQuery.data === null ||
      typeof ctx.callbackQuery.data !== 'object'
    ) {
      return;
    }

    await ctx.scene.enter(SceneName.SEND_PHOTO_SCENE);
  }
}
