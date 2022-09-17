import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ProviderName } from '@sendByBot/Common/enums/ProviderName';

@Entity({
  name: ProviderName.STICKER_REPOSITORY,
})
export class StickerEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  code!: string;

  @Column()
  sticker_id!: string;

  @Column()
  unique_sticker_id!: string;

  @Column()
  user_id!: string;
}
