import { Inject, Injectable } from '@nestjs/common';
import { ProviderName } from '../../Common/enums/ProviderName';
import { Repository } from 'typeorm';
import { StickerEntity } from '../entities/StickerEntity';

@Injectable()
export class StickersSetter {
  public constructor(
    @Inject(ProviderName.STICKER_REPOSITORY)
    private readonly stickerRepository: Repository<StickerEntity>,
  ) {}

  removeByUniqueStickerId(id: string) {
    void this.stickerRepository.delete({
      unique_sticker_id: id
    })
  }

  add(item: StickerEntity) {
    void this.stickerRepository.insert(item);
  }

  change(where: Partial<StickerEntity>, updateValue: Partial<StickerEntity>) {
    return this.stickerRepository.update(where, updateValue);
  }
}