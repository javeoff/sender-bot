import { Inject, Injectable } from '@nestjs/common';
import { Equal, ILike, Repository } from 'typeorm';

import { ProviderName } from '@sendByBot/Common/enums/ProviderName';
import { ImageEntity } from '@sendByBot/Images/entities/ImageEntity';

@Injectable()
export class ImagesGetter {
  public constructor(
    @Inject(ProviderName.IMAGE_REPOSITORY)
    private readonly imageRepository: Repository<ImageEntity>,
  ) {}

  public getById(userId: string, id: string): Promise<ImageEntity[]> {
    return this.imageRepository.findBy({
      user_id: Equal(userId),
      id: Equal(Number(id)),
    });
  }

  public getByCode(userId: string, code: string): Promise<ImageEntity[]> {
    return this.imageRepository.findBy({
      user_id: Equal(userId),
      code: ILike(`${code}%`),
    });
  }

  public getByUniqueId(
    userId: string,
    uniquePhotoId: string,
  ): Promise<ImageEntity[]> {
    return this.imageRepository.findBy({
      user_id: Equal(userId),
      unique_image_id: Equal(uniquePhotoId),
    });
  }

  public async hasByUniqueId(
    userId: string,
    uniquePhotoId: string,
  ): Promise<boolean> {
    const result = await this.getByUniqueId(userId, uniquePhotoId);

    return result?.length > 0;
  }

  public getAll(userId: string): Promise<ImageEntity[]> {
    return this.imageRepository.findBy({
      user_id: Equal(userId),
    });
  }
}
