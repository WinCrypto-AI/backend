import { Column, Entity, Index } from 'typeorm';
import { PrimaryBaseEntity } from '../primary-base.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('message')
export class MessageEntity extends PrimaryBaseEntity {
  @ApiProperty()
  @Column({ default: '' })
  content: string;

  @ApiProperty()
  @Column({ type: 'uuid' })
  @Index()
  senderId: string;

  @ApiProperty()
  @Column({ type: 'uuid' })
  @Index()
  chatGroupId: string;
}
