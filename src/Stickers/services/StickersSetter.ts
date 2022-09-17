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

  public removeByUniqueStickerId(id: string): void {
    void this.stickerRepository.delete({
      unique_sticker_id: id,
    });
  }

  public add(item: StickerEntity): void {
    void this.stickerRepository.insert(item);
  }

  public change(
    where: Partial<StickerEntity>,
    updateValue: Partial<StickerEntity>,
  ): Promise<UpdateResult> {
    return this.stickerRepository.update(where, updateValue);
  }
}
