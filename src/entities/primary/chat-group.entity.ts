import { Column, Entity, Index } from 'typeorm';
import { PrimaryBaseEntity } from '../primary-base.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { NSChatGroup } from '~/common/enums';

@Entity('chat_group')
export class ChatGroupEntity extends PrimaryBaseEntity {
  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column({ unique: true })
  code: string;

  @ApiProperty()
  @Column({ default: NSChatGroup.EType.GLOBAL })
  type: NSChatGroup.EType;

  @ApiPropertyOptional()
  @Column({ nullable: true })
  desc?: string;
}
