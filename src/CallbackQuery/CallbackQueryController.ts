import { Ctx, On, Sender, Update } from 'nestjs-telegraf';
import { DeleteQuery } from './queries/DeleteQuery';
import { ListQuery } from './queries/ListQuery';
import { TContext } from '../Common/types/TContext';
import { GetCodeQuery } from './queries/GetCodeQuery';
import { RenameCodeQuery } from './queries/RenameCodeQuery';
import { NextPageQuery } from './queries/NextPageQuery';
import { PrevPageQuery } from './queries/PrevPageQuery';

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
