import { DefController, DefPost } from '~/@core/decorator';
import { AuthService } from '../services';
import { Body } from '@nestjs/common';
import { TelegramLoginDto } from '~/dto/auth.dto';

@DefController('auth')
export class AuthMemberController {
  constructor(private readonly authService: AuthService) {}

  @DefPost('telegram-login')
  telegramLogin(@Body() body: TelegramLoginDto) {
    return this.authService.telegramLogin(body);
  }
}
