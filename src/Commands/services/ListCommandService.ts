import { Injectable } from '@nestjs/common';
import { StickersGetter } from '../../Stickers/services/StickersGetter';
import { ImagesGetter } from '../../Images/services/ImagesGetter';
import { VideosGetter } from '../../Videos/services/VideosGetter';
import { PagesService } from '../../CallbackQuery/services/PagesService';
import { PagesListFactory } from '../../Common/factories/PagesListFactory';

@Injectable()
export class ListCommandService {
  constructor(
    private readonly stickersGetter: StickersGetter,
    private readonly imagesGetter: ImagesGetter,
    private readonly videosGetter: VideosGetter,
    private readonly pagesService: PagesService,
  ) {}

  public async getResponse(userId: string): Promise<string> {
    const factory = new PagesListFactory();
    const {data: rows} = await this.pagesService.getPageRowsByUserId(userId);

    return factory.createReply(rows)
  }
}
