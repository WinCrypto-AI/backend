import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { configEnv } from '~/@config/env';
import { KeyHeader } from '~/common/constants';
import { AccountSessionPayload } from '~/dto/auth.dto';

@Injectable()
export class AccountMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}
  async use(req: Request, res: Response, next: Function) {
    console.log('--------MiniAppMiddleware-----------');
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
        await this.jwtService.verifyAsync<AccountSessionPayload>(accessToken, {
          secret: JWT_SECRET,
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
