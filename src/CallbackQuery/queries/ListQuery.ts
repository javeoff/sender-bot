import { Ctx, Sender } from 'nestjs-telegraf';
import { ListCommandService } from '../../Commands/services/ListCommandService';
import { CallbackQueryName } from '../enums/CallbackQueryName';
import { TContext } from '../../Common/types/TContext';
import { Injectable } from '@nestjs/common';
import { isQueryWithName } from '../guards/isQueryWithName';

@Injectable()
export class ListQuery {
  constructor(
    private readonly listCommandService: ListCommandService
  ) {}

  async onListQuery(
    @Ctx() ctx: TContext,
    @Sender('id') userId: string,
  ) {
    if (!isQueryWithName(ctx, CallbackQueryName.LIST)) {
      return;
    }

    ctx.scene.leave()

    ctx.reply(
      await this.listCommandService.getResponse(userId)
    );
  }
}
