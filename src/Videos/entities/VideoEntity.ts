import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { ProviderName } from '@sendByBot/Common/enums/ProviderName';

@Entity({
  name: ProviderName.VIDEO_REPOSITORY,
})
export class VideoEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public code!: string;

  @Column()
  public video_id!: string;

  @Column()
  public unique_video_id!: string;

  @Column()
  public user_id!: string;

  @Column()
  public thumb_id!: string;
}
