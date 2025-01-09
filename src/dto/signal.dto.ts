import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PageRequest } from '~/@systems/utils';
import { NSAccount, NSSignal } from '~/common/enums';

export class CreateSignalReq {
  @ApiProperty({
    enum: NSSignal.EActionType,
  })
  actionType: NSSignal.EActionType;

  @ApiProperty()
  type: string;

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

  @ApiPropertyOptional({ default: NSAccount.EType.FREE, enum: NSAccount.EType })
  accountType?: NSAccount.EType;

  @ApiPropertyOptional()
  note?: string;
}

export class ListSignalReq extends PageRequest {
  // @ApiPropertyOptional({ default: NSAccount.EType.FREE, enum: NSAccount.EType })
  // accountType?: NSAccount.EType;
}

export class CreateNotificationReq {
  @ApiProperty()
  title: string;

  @ApiProperty()
  desc: string;

  @ApiPropertyOptional({ default: 'https://ui-avatars.com/api/?name=B&size=400&rounded=true' })
  iconUrl: string;
}

export class ListNotificationReq extends PageRequest {}

export class CreateReportReq {
  @ApiProperty()
  title: string;

  @ApiProperty({ default: '' })
  content: string;

  @ApiPropertyOptional({ default: 'https://ui-avatars.com/api/?name=B&size=400&rounded=true' })
  fileUrl: string;

  @ApiPropertyOptional({ default: NSAccount.EType.FREE, enum: NSAccount.EType })
  accountType?: NSAccount.EType;
}

export class ListReportReq extends PageRequest {}
