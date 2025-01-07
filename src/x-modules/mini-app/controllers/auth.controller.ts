import { DefController, DefGet, DefPost } from '~/@core/decorator';
import { AuthService } from '../services';
import { Body } from '@nestjs/common';
import { SyncWalletReq, TelegramLoginDto } from '~/dto/auth.dto';
import { miniAppSessionContext } from '../mini-app-session.context';

@DefController('auth')
export class AuthMemberController {
  constructor(private readonly authService: AuthService) {}

  @DefPost('telegram-login')
  telegramLogin(@Body() body: TelegramLoginDto) {
    return this.authService.telegramLogin(body);
  }

  @DefGet('account-info')
  accountInfo() {
    const { accountId } = miniAppSessionContext;
    return this.authService.accountInfo(accountId);
  }

  @DefPost('sync-wallet')
  syncWallet(@Body() body: SyncWalletReq) {
    const { accountId } = miniAppSessionContext;
    return this.authService.syncWallet(accountId, body);
  }
}
