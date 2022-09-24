import { Inject, Injectable } from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm';

import { ProviderName } from '@sendByBot/Common/enums/ProviderName';
import { ImageEntity } from '@sendByBot/Images/entities/ImageEntity';

@Injectable()
export class ImagesSetter {
  public constructor(
    @Inject(ProviderName.IMAGE_REPOSITORY)
    private readonly imageRepository: Repository<ImageEntity>,
  ) {}

  public async removeByImageId(imageId: string): Promise<void> {
    await this.imageRepository.delete({
      image_id: imageId,
    });
  }

  public async removeByImageUniqueId(imageId: string): Promise<void> {
    await this.imageRepository.delete({
      unique_image_id: imageId,
    });
  }

  public async add(item: ImageEntity): Promise<void> {
    await this.imageRepository.insert(item);
  }

  public change(
    where: Partial<ImageEntity>,
    updateValue: Partial<ImageEntity>,
  ): Promise<UpdateResult> {
    return this.imageRepository.update(where, updateValue);
  }
}
