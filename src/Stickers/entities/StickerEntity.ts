import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { ProviderName } from '@sendByBot/Common/enums/ProviderName';

@Entity({
  name: ProviderName.STICKER_REPOSITORY,
})
export class StickerEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public code!: string;

  @Column()
  public sticker_id!: string;

  @Column()
  public unique_sticker_id!: string;

  @Column()
  public user_id!: string;
}
