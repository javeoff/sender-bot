import { Inject, Injectable } from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm';

import { ProviderName } from '@sendByBot/Common/enums/ProviderName';
import { StickerEntity } from '@sendByBot/Stickers/entities/StickerEntity';

@Injectable()
export class StickersSetter {
  public constructor(
    @Inject(ProviderName.STICKER_REPOSITORY)
    private readonly stickerRepository: Repository<StickerEntity>,
  ) {}

  public async removeByUniqueStickerId(id: string): Promise<void> {
    await this.stickerRepository.delete({
      unique_sticker_id: id,
    });
  }

  public async add(item: StickerEntity): Promise<void> {
    await this.stickerRepository.insert(item);
  }

  public change(
    where: Partial<StickerEntity>,
    updateValue: Partial<StickerEntity>,
  ): Promise<UpdateResult> {
    return this.stickerRepository.update(where, updateValue);
  }
}
