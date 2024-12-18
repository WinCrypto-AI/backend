import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';
import * as jwt from 'jsonwebtoken';
import { User as IUserTelegraf } from 'telegraf/typings/core/types/typegram';
import { NSAccount } from '~/common/enums';

export class LoginReq {
  @ApiProperty()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}

export class JwtPayload implements jwt.JwtPayload {
  @ApiPropertyOptional()
  iss?: string | undefined;
  @ApiPropertyOptional()
  sub?: string | undefined;
  @ApiPropertyOptional()
  aud?: string | string[] | undefined;
  @ApiPropertyOptional()
  exp?: number | undefined;
  @ApiPropertyOptional()
  nbf?: number | undefined;
  @ApiPropertyOptional()
  iat?: number | undefined;
  @ApiPropertyOptional()
  jti?: string | undefined;
}

export class AccountSessionPayload extends JwtPayload {
  @ApiProperty()
  id: string;

  @ApiProperty()
  telegramId: string;

  /** Tên đăng nhập */
  @ApiProperty()
  username: string;

  @ApiProperty({ enum: NSAccount.EStatus })
  status: NSAccount.EStatus;

  @ApiPropertyOptional()
  fullName?: string;
}

export class AccountSessionDto extends AccountSessionPayload {
  @ApiProperty()
  accessToken: string;
  @ApiProperty()
  refreshToken: string;
  @ApiProperty()
  tokenType: 'Bearer' = 'Bearer';
}

export { IUserTelegraf };

export class TelegramLoginDto {
  @ApiProperty({ description: 'query_id from telegram', example: 'AAGcyiouAgAAAJzKKi6Kqawo' })
  query_id: string;
  @ApiProperty({
    description: 'user from telegram',
    example: {
      id: '5069523612',
      first_name: 'Quy',
      last_name: 'Nguyen',
      username: 'QuyNguyen034',
      language_code: 'vi',
      allows_write_to_pm: true,
    },
  })
  user: IUserTelegraf;
  @ApiProperty({ description: 'auth_date from telegram', example: '1719036024' })
  auth_date: string;
  @ApiProperty({
    description: 'hash from telegram',
    example: '6705e4fd3b3ae5851589fb9e8f68298da8cef9ca63003a2af22b935ea99044f1',
  })
  hash: string;
}
