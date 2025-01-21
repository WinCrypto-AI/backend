import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { RequestContext } from '~/@core/context';
import { KeyHeader, KeySessionContext } from '~/common/constants';

@Injectable()
export class LangMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}
  async use(req: Request, res: Response, next: Function) {
    console.log('--------LangMiddleware-----------');
    const { headers = {} } = req;
    if (!headers || !headers[KeyHeader.LANG]) {
      RequestContext.setAttribute<string>(KeySessionContext.LANG_SESSION, 'en');
      next();
    } else {
      RequestContext.setAttribute<string>(
        KeySessionContext.LANG_SESSION,
        headers[KeyHeader.LANG] as string,
      );
      next();
    }
  }
}
