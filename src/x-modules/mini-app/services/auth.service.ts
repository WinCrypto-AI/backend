import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { I18nService } from 'nestjs-i18n';
import { BindRepo } from '~/@core/decorator';
import { BusinessException } from '~/@systems/exceptions';
import { I18nTranslations } from '~/assets/i18n.generated';
import { generateCodeHelper } from '~/common/helpers/generate-code.helper';
import { IUserTelegraf, TelegramLoginDto } from '~/dto/auth.dto';
import { AccountEntity } from '~/entities/primary';
import { AccountRepo } from '~/repositories/primary';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly i18n: I18nService<I18nTranslations>,
  ) {}

  @BindRepo(AccountRepo)
  private accountRepo: AccountRepo;
  async telegramLogin(body: TelegramLoginDto) {
    const {
      user: { id: telegramId },
    } = body;

    if (!telegramId) {
      throw new BusinessException('Telegram login failed');
    }
    let account = await this.accountRepo.findOne({ where: { telegramId } });
    if (!account) {
      account = await this.createNewAccountFromTelegramLogin(body.user);
    } else {
      const updateData = {};
      const username = body.user.username;
      const name = `${body.user.first_name || ''} ${body.user.last_name || ''}`.trim();
      if (username !== account.username) {
        Object.assign(updateData, {
          username,
        });
      }
      if (name !== account.name) {
        Object.assign(updateData, {
          name,
        });
      }
      if (Object.keys(updateData).length) {
        await this.accountRepo.update({ id: account.id }, updateData);
      }
    }

    return this.createSessionData(account);
  }

  private async createSessionData(account: AccountEntity) {
    const payload = {
      sub: account.id,
      ...account,
    };
    return {
      accessToken: await this.jwtService.signAsync(payload),
      refreshToken: '',
      tokenType: 'Bearer',
      ...account,
    };
  }
  private async createNewAccountFromTelegramLogin(body: IUserTelegraf) {
    let account = new AccountEntity();
    account.telegramId = `${body.id}`;
    account.username = body.username;
    account.name = body.first_name + ' ' + body.last_name;
    account.referralCode = generateCodeHelper.generateReferralCode();

    return this.accountRepo.save(account);
  }
}
