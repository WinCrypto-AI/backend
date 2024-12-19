import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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
