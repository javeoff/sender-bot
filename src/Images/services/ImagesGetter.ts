import { Inject, Injectable } from '@nestjs/common';
import { ProviderName } from '../../Common/enums/ProviderName';
import { Equal, ILike, Repository } from 'typeorm';
import { ImageEntity } from '../entities/ImageEntity';

@Injectable()
export class ImagesGetter {
  public constructor(
    @Inject(ProviderName.IMAGE_REPOSITORY)
    private readonly imageRepository: Repository<ImageEntity>,
  ) {}

  getById(userId: string, id: string): Promise<ImageEntity[]> {
    return this.imageRepository.findBy({
      user_id: Equal(userId),
      id: Equal(Number(id)),
    });
  }

  getByCode(userId: string, code: string): Promise<ImageEntity[]> {
    return this.imageRepository.findBy({
      user_id: Equal(userId),
      code: ILike(`${code}%`),
    });
  }

  getByUniqueId(userId: string, uniquePhotoId: string): Promise<ImageEntity[]> {
    return this.imageRepository.findBy({
      user_id: Equal(userId),
      unique_image_id: Equal(uniquePhotoId),
    });
  }

  async hasByUniqueId(userId: string, uniquePhotoId: string): Promise<boolean> {
    return (await this.getByUniqueId(userId, uniquePhotoId))?.length > 0;
  }

  getAll(userId: string): Promise<ImageEntity[]> {
    return this.imageRepository.findBy({
      user_id: Equal(userId),
    });
  }
}
