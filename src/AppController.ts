import { Ctx, Hears, Help, Start, Update } from 'nestjs-telegraf';
import { UsersSetter } from '@sendByBot/Users/services/UsersSetter';
import { SystemErrorFactory } from '@sendByBot/SystemError/factories/SystemErrorFactory';
import { TContext } from '@sendByBot/Common/types/TContext';
import { ErrorCode } from '@sendByBot/SystemError/enums/ErrorCode';
import { UsersGetter } from '@sendByBot/Users/services/UsersGetter';
import { UserEntity } from '@sendByBot/Users/entities/UserEntity';

@Update()
export class AppController {
  constructor(
    private readonly usersSetter: UsersSetter,
    private readonly usersGetter: UsersGetter,
    private readonly systemErrorFactory: SystemErrorFactory
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
    user.first_name = ctx.from?.first_name || '';
    user.last_name = ctx.from?.last_name || '';
    user.user_id = String(ctx.from.id);
    user.username = ctx.from?.username || '';
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

  @Hears(['photoid'])
  async sendImage(@Ctx() ctx: TContext) {
    throw this.systemErrorFactory.create(
      ErrorCode.OTHER,
      'Не найдено фото'
    )
  }
}
