import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { TContext } from '@sendByBot/Common/types/TContext';

@Injectable()
export class IsQueryWithName implements CanActivate {
  public constructor(private reflector: Reflector) {}

  public async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const queries: string[] = this.reflector.get<string[]>(
      'roles',
      ctx.getHandler(),
    );

    if (!queries) {
      return false;
    }

    const ctxTyped = ctx as unknown as { args: [TContext] };
    const context: TContext = ctxTyped.args[0];
    // const queryName: string = ctx.getArgs()[0];

    return queries.includes(context.callbackQuery.data);
  }
}
