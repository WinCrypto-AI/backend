import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsUUID } from 'class-validator';

export class IdNumberReq {
  @ApiProperty()
  @IsNumber()
  id: number;
}
export class UUIDReq {
  @ApiProperty()
  @IsUUID('4')
  id: string;
}
export class EmptyPageResponse {
  data = [];
  @ApiProperty()
  total = 0;
}
