import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { PrimaryBaseEntity } from '../primary-base.entity';

@Entity('report')
export class ReportEntity extends PrimaryBaseEntity {
  @Column()
  title: string;

  @Column({ default: '' })
  content: string;

  @Column({ default: 'https://ui-avatars.com/api/?name=B&size=400&rounded=true' })
  fileUrl: string;
}
