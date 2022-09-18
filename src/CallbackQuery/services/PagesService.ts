import { Injectable } from '@nestjs/common';

import { ListBuilder } from '@sendByBot/Common/builders/ListBuilder';
import { RowEntitiesFactory } from '@sendByBot/Common/factories/RowEntitiesFactory';

@Injectable()
export class PagesService {
  public constructor(private readonly listBuilder: ListBuilder) {}

  public async getPageRowsByUserId(
    userId: string,
    skip = 0,
    take = 5,
  ): Promise<{
    data: string[];
    hasNext: boolean;
  }> {
    const items = await this.listBuilder.getList(userId, skip, take + 1);
    const [lastItem] = items.splice(5);

    const hasNext = !!lastItem;

    const factory = new RowEntitiesFactory();

    factory.addImagesEntities(
      items.filter(({ table_name }) => table_name === 'image'),
    );
    factory.addStickerEntities(
      items.filter(({ table_name }) => table_name === 'sticker'),
    );
    factory.addVideosEntities(
      items.filter(({ table_name }) => table_name === 'video'),
    );

    return {
      data: factory.rows,
      hasNext,
    };
  }
}
