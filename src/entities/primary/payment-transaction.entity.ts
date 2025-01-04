import { Column, Entity, Index } from 'typeorm';
import { PrimaryBaseEntity } from '../primary-base.entity';

@Entity()
export class PaymentTransactionEntity extends PrimaryBaseEntity {
  @Column({ type: 'uuid' })
  @Index()
  accountId: string;

  @Column()
  txHash: string;
  // deposit: fromAddress = user wallet, withdraw: fromAddress = GAME_WALLET
  @Column()
  fromAddress: string;
  // deposit: toAddress = GAME_WALLET, withdraw: toAddress = user wallet
  @Column()
  toAddress: string;

  @Column({ type: 'double precision' })
  value: number;

  @Column()
  token: string;

  @Column()
  decimal: number;

  @Column()
  onChainTimestamp: number;
}
