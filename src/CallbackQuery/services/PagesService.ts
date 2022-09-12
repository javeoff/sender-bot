import { Injectable } from '@nestjs/common';
import { RowEntitiesFactory } from '../../Common/factories/RowEntitiesFactory';
import { ListBuilder } from '../../Common/builders/ListBuilder';

@Injectable()
export class PagesService {
  constructor(
    private readonly listBuilder: ListBuilder,
  ) {}

  async getPageRowsByUserId(userId: string, skip = 0, take = 5): Promise<{
    data: string[];
    hasNext: boolean;
  }> {
    const items = await this.listBuilder.getList(userId, skip, take + 1);
    const [lastItem] = items.splice(5);

    const hasNext = !!lastItem;
    console.log(items, hasNext, lastItem);

    const factory = new RowEntitiesFactory();
    factory.addImagesEntities(items.filter(({table_name}) =>
      table_name === 'images'
    ))
    factory.addStickerEntities(items.filter(({table_name}) =>
      table_name === 'sticker'
    ))
    factory.addVideosEntities(items.filter(({table_name}) =>
      table_name === 'video'
    ))

    return {
      data: factory.rows,
      hasNext,
    };
  }
}
