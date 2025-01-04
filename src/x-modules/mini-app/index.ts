import { ChildModule } from '~/@core/decorator';
import { MiddlewareConsumer, NestModule, RequestMethod } from '@nestjs/common';
import { RefixModule } from '../config-module';
import * as allService from './services';
import * as allController from './controllers';
import { MiniAppMiddleware } from './mini-app.middleware';
import { ChatGateway } from './chat.gateway';

const serviceIn = [ChatGateway];

@ChildModule({
  prefix: RefixModule.miniApp,
  providers: [...Object.values(allService), ...serviceIn],
  controllers: [...Object.values(allController)],
})
export class MemberModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(MiniAppMiddleware)
      .exclude(
        {
          path: `${RefixModule.miniApp}/auth/telegram-login`.trim(),
          method: RequestMethod.ALL,
        },
        {
          path: `${RefixModule.miniApp}/chat/(.*)`.trim(),
          method: RequestMethod.ALL,
        },
        {
          path: `${RefixModule.miniApp}/signal/(.*)`.trim(),
          method: RequestMethod.ALL,
        },
        {
          path: `${RefixModule.miniApp}/notifications/(.*)`.trim(),
          method: RequestMethod.ALL,
        },
        {
          path: `${RefixModule.miniApp}/report/(.*)`.trim(),
          method: RequestMethod.ALL,
        },
      )
      .forRoutes({ path: `${RefixModule.miniApp}*`, method: RequestMethod.ALL });
  }
}
