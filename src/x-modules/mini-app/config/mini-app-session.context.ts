import { RequestContext } from '~/@core/context';
import { KeySessionContext } from '~/common/constants';
import { AccountSessionDto } from '~/dto/auth.dto';

export class MiniAppSessionContext {
  get lang() {
    return RequestContext.getAttribute<AccountSessionDto>(KeySessionContext.LANG_SESSION);
  }
  get accountData() {
    return RequestContext.getAttribute<AccountSessionDto>(KeySessionContext.ACCOUNT_SESSION);
  }

  get accessToken() {
    return this.accountData.accessToken;
  }
  get accountId() {
    return this?.accountData?.sub;
  }
  get username() {
    return this.accountData.username;
  }
}

export const miniAppSessionContext = new MiniAppSessionContext();
