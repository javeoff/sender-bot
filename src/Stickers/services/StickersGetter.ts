import { Inject, Injectable } from '@nestjs/common';
import { Equal, ILike, Repository } from 'typeorm';

import { ProviderName } from '@sendByBot/Common/enums/ProviderName';
import { StickerEntity } from '@sendByBot/Stickers/entities/StickerEntity';

@Injectable()
export class StickersGetter {
  public constructor(
    @Inject(ProviderName.STICKER_REPOSITORY)
    private readonly stickerRepository: Repository<StickerEntity>,
  ) {}

  public getById(userId: string, id: string): Promise<StickerEntity[]> {
    return this.stickerRepository.findBy({
      user_id: Equal(userId),
      id: Equal(Number(id)),
    });
  }

  public getByUniqueId(
    userId: string,
    uniqueStickerId: string,
  ): Promise<StickerEntity[]> {
    return this.stickerRepository.findBy({
      user_id: Equal(userId),
      unique_sticker_id: Equal(uniqueStickerId),
    });
  }

  public async hasByUniqueId(
    userId: string,
    uniqueStickerId: string,
  ): Promise<boolean> {
    const result = await this.getByUniqueId(userId, uniqueStickerId);

    return result.length > 0;
  }

  public getByCode(userId: string, code: string): Promise<StickerEntity[]> {
    return this.stickerRepository.findBy({
      user_id: Equal(userId),
      code: ILike(`${code}%`),
    });
  }

  public getAll(userId: string): Promise<StickerEntity[]> {
    return this.stickerRepository.findBy({
      user_id: Equal(userId),
    });
  }
}
