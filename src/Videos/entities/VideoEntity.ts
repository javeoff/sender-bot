import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ProviderName } from '../../Common/enums/ProviderName';

@Entity({
  name: ProviderName.VIDEO_REPOSITORY,
})
export class VideoEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  code!: string;

  @Column()
  video_id!: string;

  @Column()
  unique_video_id!: string;

  @Column()
  user_id!: string;

  @Column()
  thumb_id: string;
}
