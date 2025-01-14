import { Column, Entity, Index } from 'typeorm';
import { PrimaryBaseEntity } from '../primary-base.entity';

@Entity()
export class AccountReferralEntity extends PrimaryBaseEntity {
  @Column({ type: 'uuid' })
  @Index()
  accountId: string;

  @Column({ type: 'uuid' })
  @Index()
  referralId: string;

  @Column({})
  @Index()
  referrerCode: string;

  @Column({ default: 0 })
  point: number;

  //   @Column({ nullable: true })
  //   partnerCode: string;
}
