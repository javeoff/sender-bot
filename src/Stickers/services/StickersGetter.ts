import { StickerEntity } from '../entities/StickerEntity';
import { Equal, ILike, Repository } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { ProviderName } from '../../Common/enums/ProviderName';

@Injectable()
export class StickersGetter {
  public constructor(
    @Inject(ProviderName.STICKER_REPOSITORY)
    private readonly stickerRepository: Repository<StickerEntity>,
  ) {}

  getById(userId: string, id: string): Promise<StickerEntity[]> {
    return this.stickerRepository.findBy({
      user_id: Equal(userId),
      id: Equal(Number(id)),
    });
  }

  getByUniqueId(userId: string, uniqueStickerId: string): Promise<StickerEntity[]> {
    return this.stickerRepository.findBy({
      user_id: Equal(userId),
      unique_sticker_id: Equal(uniqueStickerId),
    });
  }

  async hasByUniqueId(userId: string, uniqueStickerId: string): Promise<boolean> {
    return (await this.getByUniqueId(userId, uniqueStickerId)).length > 0;
  }

  getByCode(userId: string, code: string): Promise<StickerEntity[]> {
    return this.stickerRepository.findBy({
      user_id: Equal(userId),
      code: ILike(`${code}%`),
    });
  }

  getAll(userId: string): Promise<StickerEntity[]> {
    return this.stickerRepository.findBy({
      user_id: Equal(userId),
    });
  }
}
