import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { ProviderName } from '@sendByBot/Common/enums/ProviderName';

@Entity({
  name: ProviderName.USER_REPOSITORY,
})
export class UserEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public user_id!: string;

  @Column()
  public first_name!: string;

  @Column()
  public last_name!: string;

  @Column()
  public username!: string;
}
