import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ProviderName } from '@sendByBot/Common/enums/ProviderName';

@Entity({
  name: ProviderName.IMAGE_REPOSITORY,
})
export class ImageEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  code!: string;

  @Column()
  image_id!: string;

  @Column()
  unique_image_id!: string;

  @Column()
  user_id!: string;
}
