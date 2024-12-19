import { Column, Entity, Index } from 'typeorm';
import { PrimaryBaseEntity } from '../primary-base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { NSChatGroup } from '~/common/enums';

@Entity('chat_group_account')
@Index(['chatGroupId', 'accountId'], { unique: true })
export class ChatGroupAccountEntity extends PrimaryBaseEntity {
  @ApiProperty()
  @Column({ type: 'uuid' })
  @Index()
  chatGroupId: string;

  @ApiProperty()
  @Column({ type: 'uuid' })
  @Index()
  accountId: string;

  @ApiProperty()
  @Column({ default: NSChatGroup.ERole })
  role: NSChatGroup.ERole;

  @ApiProperty()
  @Column({ default: true })
  isActive: boolean;
}
