import { Column, Entity, Index } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PrimaryBaseEntity } from '../primary-base.entity';
import { NSAccount } from '~/common/enums';

@Entity('account')
export class AccountEntity extends PrimaryBaseEntity {
  @ApiProperty()
  @Column({ unique: true })
  @Index({ unique: true })
  telegramId: string;

  @ApiPropertyOptional()
  @Column({ nullable: true })
  name?: string;

  @ApiPropertyOptional()
  @Column({ nullable: true })
  username?: string;

  @ApiPropertyOptional()
  @Column({ nullable: true })
  @Index()
  email?: string;

  @ApiPropertyOptional()
  @Column({ default: NSAccount.EStatus.ACTIVE })
  status?: NSAccount.EStatus.ACTIVE;

  @ApiProperty()
  @Column({ nullable: true })
  walletAddress: string;

  @Column({
    nullable: true,
  })
  @ApiProperty()
  avatar?: string;

  @ApiPropertyOptional()
  @Column()
  @Index({ unique: true })
  referralCode: string;

  @Column({
    type: 'double precision',
    default: 0,
  })
  @ApiProperty({ default: 0 })
  balancePoint: number;

  @Column({
    type: 'double precision',
    default: 0,
  })
  @ApiProperty({ default: 0 })
  balanceTon: number;
}
