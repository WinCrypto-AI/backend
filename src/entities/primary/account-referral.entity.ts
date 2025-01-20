import { Column, Entity, Index } from 'typeorm';
import { PrimaryBaseEntity } from '../primary-base.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class AccountReferralEntity extends PrimaryBaseEntity {
  @ApiProperty({
    description: 'Đây là ID của tài khoản người được giới thiệu (người mới đăng ký).',
  })
  @Column({ type: 'uuid' })
  @Index()
  accountId: string;

  @ApiProperty({
    description: 'Đây là ID của tài khoản người giới thiệu (người đã giới thiệu accountId).',
  })
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
