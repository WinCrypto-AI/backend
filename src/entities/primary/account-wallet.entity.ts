import { Column, Entity, Index } from 'typeorm';
import { PrimaryBaseEntity } from '../primary-base.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('account_wallet')
@Index(['chainId', 'accountId'], { unique: true })
export class AccountWalletEntity extends PrimaryBaseEntity {
  @Column({ type: 'uuid' })
  @Index()
  accountId: string;

  @Column()
  chainId: number;

  @Column()
  @Index()
  walletAddress: string;
}
