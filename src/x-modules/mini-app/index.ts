import { ChildModule } from '~/@core/decorator';
import { MiddlewareConsumer, NestModule, RequestMethod } from '@nestjs/common';
import { RefixModule } from '../config-module';
import * as allService from './services';
import * as allController from './controllers';
import { AccountMiddleware } from './config/account.middleware';
import { ChatGateway } from './chat.gateway';
import { TokenAccountMiddleware } from './config/token-account.middleware';
import { LangMiddleware } from './config/lang.middleware';

const serviceIn = [ChatGateway];

@ChildModule({
  prefix: RefixModule.miniApp,
  providers: [...Object.values(allService), ...serviceIn],
  controllers: [...Object.values(allController)],
})
export class MiniAppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TokenAccountMiddleware)
      .forRoutes({ path: `${RefixModule.miniApp}*`, method: RequestMethod.ALL });
    consumer
      .apply(LangMiddleware)
      .forRoutes({ path: `${RefixModule.miniApp}*`, method: RequestMethod.ALL });
    consumer
      .apply(AccountMiddleware)
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
        {
          path: `${RefixModule.miniApp}/publics/(.*)`.trim(),
          method: RequestMethod.ALL,
        },
        {
          path: `${RefixModule.miniApp}/admin/(.*)`.trim(),
          method: RequestMethod.ALL,
        },
      )
      .forRoutes({ path: `${RefixModule.miniApp}*`, method: RequestMethod.ALL });
  }
}
