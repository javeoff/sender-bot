import { Ctx, On, Sender, Update } from 'nestjs-telegraf';
import { RenameCodeQuery } from '@sendByBot/CallbackQuery/queries/RenameCodeQuery';
import { GetCodeQuery } from '@sendByBot/CallbackQuery/queries/GetCodeQuery';
import { PrevPageQuery } from '@sendByBot/CallbackQuery/queries/PrevPageQuery';
import { TContext } from '@sendByBot/Common/types/TContext';
import { DeleteQuery } from '@sendByBot/CallbackQuery/queries/DeleteQuery';
import { ListQuery } from '@sendByBot/CallbackQuery/queries/ListQuery';
import { NextPageQuery } from '@sendByBot/CallbackQuery/queries/NextPageQuery';

@Update()
export class CallbackQueryController {
  constructor(
    private readonly listQuery: ListQuery,
    private readonly stickerDeleteQuery: DeleteQuery,
    private readonly getCodeQuery: GetCodeQuery,
    private readonly renameCodeQuery: RenameCodeQuery,
    private readonly prevPageQuery: PrevPageQuery,
    private readonly nextPageQuery: NextPageQuery,
  ) {}

  @On('callback_query')
  async onCallbackQuery(
    @Ctx() ctx: TContext,
    @Sender('id') userId: string,
  ) {
   await this.listQuery.onListQuery(ctx, userId);
   await this.stickerDeleteQuery.onDelete(ctx);
   await this.getCodeQuery.onGetCode(ctx);
   await this.renameCodeQuery.onRenameCode(ctx);
   await this.prevPageQuery.onPrevPage(ctx);
   await this.nextPageQuery.onNextPage(ctx);
  }
}
