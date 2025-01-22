import { Column, Entity, Index } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { PrimaryBaseEntity } from '../primary-base.entity';

@Entity('check_in')
export class CheckInEntity extends PrimaryBaseEntity {
  @ApiProperty()
  @Column({ unique: false })
  @Index()
  accountId: string;

  @ApiProperty()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  checkInDate: Date;
}
