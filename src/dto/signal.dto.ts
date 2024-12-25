import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PageRequest } from '~/@systems/utils';
import { NSSignal } from '~/common/enums';

export class CreateSignalReq {
  @ApiProperty({
    enum: NSSignal.EActionType,
  })
  actionType: NSSignal.EActionType;

  @ApiProperty({
    enum: NSSignal.EType,
  })
  type: NSSignal.EType;

  @ApiProperty()
  baseToken: string;

  @ApiProperty()
  quoteToken: string;

  @ApiPropertyOptional({ default: 'https://ui-avatars.com/api/?name=B&size=400&rounded=true' })
  baseTokenIcon?: string;

  @ApiPropertyOptional({ default: 'https://ui-avatars.com/api/?name=B&size=400&rounded=true' })
  quoteTokenIcon?: string;

  @ApiProperty()
  entryPrice: number;

  @ApiPropertyOptional()
  recordedPrice?: number;

  @ApiProperty()
  startDate: Date;

  @ApiPropertyOptional()
  imageUrl?: string;
}

export class ListSignalReq extends PageRequest {}
