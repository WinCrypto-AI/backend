import { Column, Entity, Index } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PrimaryBaseEntity } from '../primary-base.entity';

@Entity('telegram_user')
export class TelegramUserEntity extends PrimaryBaseEntity {
  @ApiProperty()
  @Column()
  @Index({ unique: true })
  telegramId: string;

  @ApiPropertyOptional()
  @Column({ nullable: true })
  chatId: string;
}
