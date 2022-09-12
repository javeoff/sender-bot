import { Inject, Injectable } from '@nestjs/common';
import { ProviderName } from '../../Common/enums/ProviderName';
import { Repository } from 'typeorm';
import { ImageEntity } from '../entities/ImageEntity';

@Injectable()
export class ImagesSetter {
  public constructor(
    @Inject(ProviderName.IMAGE_REPOSITORY)
    private readonly imageRepository: Repository<ImageEntity>,
  ) {}

  removeByImageId(imageId: string): void {
    void this.imageRepository.delete({
      image_id: imageId
    })
  }

  removeByImageUniqueId(imageId: string): void {
    void this.imageRepository.delete({
      unique_image_id: imageId
    })
  }

  add(item: ImageEntity) {
    void this.imageRepository.insert(item);
  }

  change(where: Partial<ImageEntity>, updateValue: Partial<ImageEntity>) {
    return this.imageRepository.update(where, updateValue);
  }
}
