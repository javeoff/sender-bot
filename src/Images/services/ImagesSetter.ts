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

  public removeByImageId(imageId: string): void {
    void this.imageRepository.delete({
      image_id: imageId,
    });
  }

  public removeByImageUniqueId(imageId: string): void {
    void this.imageRepository.delete({
      unique_image_id: imageId,
    });
  }

  public add(item: ImageEntity): void {
    void this.imageRepository.insert(item);
  }

  public change(
    where: Partial<ImageEntity>,
    updateValue: Partial<ImageEntity>,
  ): Promise<UpdateResult> {
    return this.imageRepository.update(where, updateValue);
  }
}
