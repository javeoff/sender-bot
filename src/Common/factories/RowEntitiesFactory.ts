interface IPartialEntity {
  id: number;
  code: string;
}

export class RowEntitiesFactory {
  private entitiesRows: string[] = [];

  public addStickerEntities(newEntities: IPartialEntity[]): void {
    newEntities.map((entity) => {
      this.entitiesRows.push(this.createRow(entity, 'edit_sticker'));
    });
  }

  public addImagesEntities(newEntities: IPartialEntity[]): void {
    newEntities.map((entity) => {
      this.entitiesRows.push(this.createRow(entity, 'edit_image'));
    });
  }

  public addVideosEntities(newEntities: IPartialEntity[]): void {
    newEntities.map((entity) => {
      this.entitiesRows.push(this.createRow(entity, 'edit_video'));
    });
  }

  public get rows(): string[] {
    return this.entitiesRows;
  }

  private createRow(entity: IPartialEntity, prefix: string): string {
    return `/${prefix}_${entity.id} - ${entity.code}`;
  }
}
