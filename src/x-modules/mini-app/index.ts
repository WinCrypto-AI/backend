import { ChildModule } from '~/@core/decorator';
import { MiddlewareConsumer, NestModule, RequestMethod } from '@nestjs/common';
import { RefixModule } from '../config-module';
import * as allService from './services';
import * as allController from './controllers';
import { MemberMiddleware } from './mini-app.middleware';

const serviceIn = [];

@ChildModule({
  prefix: RefixModule.miniApp,
  providers: [...Object.values(allService), ...serviceIn],
  controllers: [...Object.values(allController)],
})
export class MemberModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(MemberMiddleware)
      .exclude({
        path: `${RefixModule.miniApp}/auth/telegram-login`.trim(),
        method: RequestMethod.ALL,
      })
      .forRoutes({ path: `${RefixModule.miniApp}*`, method: RequestMethod.ALL });
  }
}
