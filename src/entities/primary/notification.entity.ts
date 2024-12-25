import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { PrimaryBaseEntity } from '../primary-base.entity';

@Entity('notification')
export class NotificationEntity extends PrimaryBaseEntity {
  @Column()
  title: string;

  @Column()
  desc: string;

  @Column({ default: 'https://ui-avatars.com/api/?name=B&size=400&rounded=true' })
  iconUrl: string;
}
