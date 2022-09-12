export class PagesListFactory {
  createReply(rows: string[]): string {
    let response = 'Список сохраненных медиафайлов:\n';
    response += rows.join('\n');

    return response;
  }
}
