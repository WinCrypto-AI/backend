import { Column, Entity, Index } from 'typeorm';
import { PrimaryBaseEntity } from '../primary-base.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity('chat_group')
export class ChatGroupEntity extends PrimaryBaseEntity {
  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column({ unique: true })
  code: string;

  @ApiPropertyOptional()
  @Column({ nullable: true })
  desc?: string;
}
