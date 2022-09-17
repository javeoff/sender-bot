import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ProviderName } from '@sendByBot/Common/enums/ProviderName';

@Entity({
  name: ProviderName.USER_REPOSITORY,
})
export class UserEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  user_id!: string;

  @Column()
  first_name!: string;

  @Column()
  last_name!: string;

  @Column()
  username!: string;
}
