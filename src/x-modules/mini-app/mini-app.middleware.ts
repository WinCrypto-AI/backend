import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { configEnv } from '~/@config/env';
import { RequestContext } from '~/@core/context';
import { KeyHeader, KeySessionContext } from '~/common/constants';
import { AccountSessionDto, AccountSessionPayload } from '~/dto/auth.dto';

@Injectable()
export class MemberMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}
  async use(req: Request, res: Response, next: Function) {
    console.log('--------MemberMiddleware-----------');
    const { JWT_SECRET } = configEnv();
    try {
      const { headers = {} } = req;
      if (!headers || !headers[KeyHeader.AUTHORIZATION]) {
        throw new UnauthorizedException('Unauthorized');
      }
      const accessTokenBearer = headers[KeyHeader.AUTHORIZATION] as string;
      const accessToken = accessTokenBearer.replace('Bearer', '').trim();

      if (!accessToken) {
        throw new UnauthorizedException('Unauthorized');
      }
      try {
        const payload = await this.jwtService.verifyAsync<AccountSessionPayload>(accessToken, {
          secret: JWT_SECRET,
        });
        RequestContext.setAttribute<AccountSessionDto>(KeySessionContext.ACCOUNT_SESSION, {
          accessToken,
          refreshToken: '',
          tokenType: 'Bearer',
          ...payload,
        });
        next();
      } catch (error) {
        console.log(`==========`, error);
        throw new UnauthorizedException('Unauthorized');
      }
    } catch (error) {
      next(new UnauthorizedException('Unauthorized'));
    }
  }
}
