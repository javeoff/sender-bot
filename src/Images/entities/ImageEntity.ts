import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { ProviderName } from '@sendByBot/Common/enums/ProviderName';

@Entity({
  name: ProviderName.IMAGE_REPOSITORY,
})
export class ImageEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public code!: string;

  @Column()
  public image_id!: string;

  @Column()
  public unique_image_id!: string;

  @Column()
  public user_id!: string;
}
