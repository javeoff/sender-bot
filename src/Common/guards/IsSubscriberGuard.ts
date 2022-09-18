import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { TContext } from '../types/TContext';

@Injectable()
export class IsSubscribedGuard implements CanActivate {
  public async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const ctxTyped = ctx as unknown as { args: [TContext] };
    const context: TContext = ctxTyped.args[0];

    const sub = await this.getSubscribtion(context);

    console.log('123', sub);

    if (!sub) {
      void context.reply('Вы не подписаны на канал @sendbybot_news');
      return false;
    }

    return true;
  }

  private async getSubscribtion(context: TContext): Promise<{
    status: string;
  }> {
    try {
      const data = await context.tg.getChatMember(
        '-1001706567829',
        context.from.id,
      );

      return Object.assign({}, data);
    } catch {
      return;
    }
  }
}
