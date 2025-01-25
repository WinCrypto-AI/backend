import { Column, Entity, Index } from 'typeorm';
import { PrimaryBaseEntity } from '../primary-base.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity('message')
export class MessageEntity extends PrimaryBaseEntity {
  @ApiProperty()
  @Column({ type: 'uuid' })
  @Index()
  senderId: string;

  @ApiProperty()
  @Column({ type: 'uuid' })
  @Index()
  chatGroupId: string;

  @ApiProperty()
  @Column({ default: '' })
  content: string;

  @ApiPropertyOptional()
  @Column({ nullable: true })
  fileUrl?: string;
}
