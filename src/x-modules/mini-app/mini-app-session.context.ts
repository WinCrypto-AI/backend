import { RequestContext } from '~/@core/context';
import { KeySessionContext } from '~/common/constants';
import { AccountSessionDto } from '~/dto/auth.dto';

export class AccountSessionContext {
  get sessionData() {
    return RequestContext.getAttribute<AccountSessionDto>(KeySessionContext.ACCOUNT_SESSION);
  }

  get accessToken() {
    return this.sessionData.accessToken;
  }
  get memberId() {
    return this?.sessionData?.sub;
  }
  get username() {
    return this.sessionData.username;
  }
}

export const accountSessionContext = new AccountSessionContext();
