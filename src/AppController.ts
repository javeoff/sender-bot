import { UseGuards } from '@nestjs/common';
import { Ctx, Hears, Help, Start, Update } from 'nestjs-telegraf';

import { SetBotCommandsService } from '@sendByBot/Commands/services/SetBotCommandsService';
import { IsSubscribedGuard } from '@sendByBot/Common/guards/IsSubscriberGuard';
import { TContext } from '@sendByBot/Common/types/TContext';
import { LoggerService } from '@sendByBot/Logger/services/LoggerService';
import { ErrorCode } from '@sendByBot/SystemError/enums/ErrorCode';
import { SystemErrorFactory } from '@sendByBot/SystemError/factories/SystemErrorFactory';
import { UserEntity } from '@sendByBot/Users/entities/UserEntity';
import { UsersGetter } from '@sendByBot/Users/services/UsersGetter';
import { UsersSetter } from '@sendByBot/Users/services/UsersSetter';

function ForSubscriber(): MethodDecorator {
  return (target, propertyKey, descriptor) => {
    console.log(target, propertyKey, descriptor);
  };
}

@Update()
export class AppController {
  public constructor(
    private readonly systemErrorFactory: SystemErrorFactory,
    private readonly logger: LoggerService,
    private readonly usersSetter: UsersSetter,
    private readonly usersGetter: UsersGetter,
    private readonly setBotCommandsService: SetBotCommandsService,
  ) {}

  @Start()
  public async start(@Ctx() ctx: TContext): Promise<void> {
    // console.log(ctx.from.id);
    // console.log(await ctx.tg.getChat('-1001706567829,'));
    // console.log(await ctx.tg.getChatMember('-1001706567829', ctx.from.id));
    // console.log(await this.isSubscribed(ctx, '-1001706567829'));
    this.setBotCommandsService.setCommands(ctx);

    await ctx.replyWithMarkdown(ctx.i18n.t('welcome_message_title'));
    await ctx.replyWithMarkdown(ctx.i18n.t('welcome_message_description'));

    const isFirstUser = !(await this.usersGetter.has(String(ctx.from.id)));

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
  public async help(@Ctx() ctx: TContext): Promise<void> {
    await ctx.reply(
      '📦 <b>SendByBot</b> - Бот, который сохранит стикеры по имени! \n' +
        'Хватит искать нужный стикер в списке, напиши другу \n' +
        '@SendByBot [твой тег]\n' +
        'и выбери файл для отправки.\n',
    );
  }

  @Hears(['hi'])
  public async hears(@Ctx() ctx: TContext): Promise<void> {
    await ctx.reply('Hey there');
  }

  @Hears(['log'])
  public async log(@Ctx() ctx: TContext): Promise<void> {
    this.logger.info('test log command');
    await ctx.reply('test log');
  }

  @Hears(['photoid'])
  public async sendImage(): Promise<void> {
    this.logger.info('Information log');
    throw this.systemErrorFactory.create(ErrorCode.OTHER, 'Не найдено фото');
  }
}
