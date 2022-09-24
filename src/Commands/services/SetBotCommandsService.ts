/* eslint-disable unicorn/no-array-push-push */
import { Injectable } from '@nestjs/common';
import { Ctx } from 'nestjs-telegraf';

import { TContext } from '@sendByBot/Common/types/TContext';

@Injectable()
export class SetBotCommandsService {
  public async setCommands(@Ctx() ctx: TContext): Promise<void> {
    const commands = [];

    commands.push({
      command: 'start',
      description: 'Start',
    });

    commands.push({
      command: 'help',
      description: 'Help',
    });

    commands.push({
      command: 'list',
      description: 'List',
    });

    await ctx.setMyCommands(commands);
  }
}
