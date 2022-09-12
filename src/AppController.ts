import { Ctx, Hears, Help, Start, Update } from 'nestjs-telegraf';
import { TContext } from './Common/types/TContext';

@Update()
export class AppController {
  @Start()
  async start(@Ctx() ctx: TContext) {
    await ctx.replyWithMarkdown(`
      📦 Добро пожаловать в *BotSender*! 
    `);
    await ctx.reply(`
      Отправь мне любой медиафайл и ты сможешь использовать его в других чатах!
    `)
  }

  @Help()
  async help(@Ctx() ctx: TContext) {
    await ctx.reply('Send me a sticker');
  }

  @Hears(['hi'])
  async hears(@Ctx() ctx: TContext) {
    await ctx.reply('Hey there');
  }
}
