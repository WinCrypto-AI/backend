import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { PrimaryBaseEntity } from '../primary-base.entity';
import { NSSignal } from '~/common/enums/NSSignal';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { NSAccount } from '~/common/enums';

@Entity('signal')
export class SignalEntity extends PrimaryBaseEntity {
  @Column()
  actionType: NSSignal.EActionType;

  @Column()
  type: NSSignal.EType;

  @Column()
  baseToken: string;

  @Column({ default: 'USDT' })
  quoteToken: string;

  @Column({ default: 'https://ui-avatars.com/api/?name=B&size=400&rounded=true' })
  baseTokenIcon: string;

  @Column({ default: 'https://ui-avatars.com/api/?name=B&size=400&rounded=true' })
  quoteTokenIcon: string;

  @Column({ type: 'decimal', precision: 10, scale: 4 })
  entryPrice: number;

  @Column({ type: 'decimal', precision: 10, scale: 4, nullable: true })
  recordedPrice?: number;

  @Column()
  startDate: Date;

  @Column({ nullable: true })
  imageUrl: string;

  @ApiPropertyOptional()
  @Column({ default: NSAccount.EType.FREE })
  accountType?: NSAccount.EType;
}
