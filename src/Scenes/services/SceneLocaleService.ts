export class SceneLocaleService {
  public getSuccessLoadMediaMessage(entityName: string): string {
    return `Отлично! Отправь код для ${entityName}, чтобы сохранить в базу.`;
  }

  public getSuccessSaveMediaMessage(code: string): string {
    return 'Код успешно сохранен!\n' +
    `Ввод: @sendbybot ${code}`;
  }
}
