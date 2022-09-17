import { Ctx, Hears, Help, Start, Update } from 'nestjs-telegraf';
import { UsersSetter } from '@sendByBot/Users/services/UsersSetter';
import { SystemErrorFactory } from '@sendByBot/SystemError/factories/SystemErrorFactory';
import { TContext } from '@sendByBot/Common/types/TContext';
import { ErrorCode } from '@sendByBot/SystemError/enums/ErrorCode';
import { UsersGetter } from '@sendByBot/Users/services/UsersGetter';
import { UserEntity } from '@sendByBot/Users/entities/UserEntity';
import { LoggerService } from '@sendByBot/Logger/services/LoggerService';

@Update()
export class AppController {
  constructor(
    private readonly usersSetter: UsersSetter,
    private readonly usersGetter: UsersGetter,
    private readonly systemErrorFactory: SystemErrorFactory,
    private readonly logger: LoggerService,
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

  @Hears(['log'])
  async log(@Ctx() ctx: TContext) {
    this.logger.info('test log command');
    await ctx.reply('test log')
  }

  @Hears(['photoid'])
  async sendImage(@Ctx() ctx: TContext) {
    this.logger.info('Information log')
    throw this.systemErrorFactory.create(
      ErrorCode.OTHER,
      'Не найдено фото'
    )
  }
}
