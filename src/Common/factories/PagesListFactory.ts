import { TContext } from '@sendByBot/Common/types/TContext';

export class PagesListFactory {
  public constructor(private readonly i18n: TContext['i18n']) {}

  public createReply(rows: string[]): string {
    let response = this.i18n.t('commands.list.title') + '\n';

    response += rows.join('\n');

    return response;
  }
}
