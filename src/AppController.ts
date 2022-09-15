import { Ctx, Hears, Help, Start, Update } from 'nestjs-telegraf';
import { TContext } from './Common/types/TContext';
import { UsersSetter } from './Users/services/UsersSetter';
import { UserEntity } from './Users/entities/UserEntity';
import { UsersGetter } from './Users/services/UsersGetter';

@Update()
export class AppController {
  constructor(
    private readonly usersSetter: UsersSetter,
    private readonly usersGetter: UsersGetter,
  ) {}

  @Start()
  async start(
    @Ctx() ctx: TContext,
  ) {
    await ctx.replyWithMarkdown(ctx.i18n.t('welcome_message_title'));
    await ctx.replyWithMarkdown(ctx.i18n.t('welcome_message_description'));

    const isFirstUser = !await this.usersGetter.has(String(ctx.from.id));

    if (!isFirstUser) {
      return;
    }

    const user = new UserEntity();
    user.first_name = ctx.from.first_name;
    user.last_name = ctx.from.last_name;
    user.user_id = String(ctx.from.id);
    await this.usersSetter.add(user);
  }

  @Help()
  async help(
    @Ctx() ctx: TContext,
  ) {
    await ctx.reply('Send me a sticker');
  }

  @Hears(['hi'])
  async hears(@Ctx() ctx: TContext) {
    await ctx.reply('Hey there');
  }
}
