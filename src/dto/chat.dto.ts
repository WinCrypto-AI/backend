import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { PageRequest } from '~/@systems/utils';
import { NSChatGroup } from '~/common/enums';

export class CreateChatGroupReq {
  @ApiProperty()
  name: string;
  @ApiProperty()
  code: string;
  @ApiPropertyOptional()
  desc?: string;
}

export class AddAccountToChatGroupReq {
  @ApiProperty()
  chatGroupId: string;
  @ApiProperty()
  accountId: string;
  @ApiProperty()
  role?: NSChatGroup.ERole;
}

export class SendMessageReq {
  @ApiProperty()
  chatGroupId: string;
  @ApiProperty()
  senderId: string;
  @ApiProperty()
  content: string;
}

export class GetMessageReq extends PageRequest {
  @ApiProperty()
  @IsUUID('4')
  chatGroupId: string;
}
