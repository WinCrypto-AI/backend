import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Address } from '@ton/core';
import { I18nService } from 'nestjs-i18n';
import { In } from 'typeorm';
import { BindRepo, DefTransaction } from '~/@core/decorator';
import { BusinessException } from '~/@systems/exceptions';
import { I18nTranslations } from '~/assets/i18n.generated';
import { SystemValue } from '~/common/constants';
import { NSAccount } from '~/common/enums';
import { generateCodeHelper } from '~/common/helpers/generate-code.helper';
import { appBot } from '~/connectors';
import { IUserTelegraf, SyncWalletReq, TelegramLoginDto } from '~/dto/auth.dto';
import { AccountEntity, AccountReferralEntity } from '~/entities/primary';
import {
  AccountReferralRepo,
  AccountRepo,
  ChatGroupRepo,
  TelegramUserRepo,
} from '~/repositories/primary';
const { LIST_GROUP, GROUP_CODES } = SystemValue;

const GROUP_BY_ACCOUNT_TYPE = {
  [NSAccount.EType.FREE]: [GROUP_CODES.group_free, GROUP_CODES.group_free_vn],
  [NSAccount.EType.PAID_200]: [
    GROUP_CODES.group_free,
    GROUP_CODES.group_free_vn,
    GROUP_CODES.group_200u,
    GROUP_CODES.group_200u_vn,
  ],
  [NSAccount.EType.PAID_2000]: [
    GROUP_CODES.group_free,
    GROUP_CODES.group_free_vn,
    GROUP_CODES.group_200u,
    GROUP_CODES.group_200u_vn,
    GROUP_CODES.group_2000u,
    GROUP_CODES.group_2000u_vn,
  ],
};

const REFERRAL_POINT = {
  PARENT: 100,
  CHILD: 0,
};

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly i18n: I18nService<I18nTranslations>,
  ) {}

  @BindRepo(AccountRepo)
  private accountRepo: AccountRepo;

  @BindRepo(ChatGroupRepo)
  private chatGroupRepo: ChatGroupRepo;

  @BindRepo(AccountReferralRepo)
  private accountReferralRepo: AccountReferralRepo;

  @BindRepo(TelegramUserRepo)
  private telegramUserRepo: TelegramUserRepo;

  private getListGroupByAccountType(accountType: NSAccount.EType) {
    const codes = GROUP_BY_ACCOUNT_TYPE[accountType];
    return this.chatGroupRepo.find({
      select: ['id', 'name', 'code', 'type', 'mode'],
      where: {
        code: In(codes),
      },
    });
  }

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
      if (body?.user?.photoUrl) {
        Object.assign(updateData, {
          avatar: body?.user?.photoUrl,
        });
      }

      if (Object.keys(updateData).length) {
        await this.accountRepo.update({ id: account.id }, updateData);
      }
    }
    return this.createSessionData(account);
  }

  private async createSessionData(account: AccountEntity) {
    const [listGroup, totalRef] = await Promise.all([
      this.getListGroupByAccountType(account.type).catch(_ => []),
      this.accountReferralRepo.count({
        where: {
          referralId: account.id,
        },
      }),
    ]);
    const payload = {
      sub: account.id,
      ...account,
      listGroup,
    };
    return {
      accessToken: await this.jwtService.signAsync(payload),
      refreshToken: '',
      tokenType: 'Bearer',
      ...account,
      listGroup,
      totalRef,
    };
  }
  private async createNewAccountFromTelegramLogin(body: IUserTelegraf) {
    let account = new AccountEntity();
    account.telegramId = `${body.id}`;
    account.username = body.username;
    account.name = body.first_name + ' ' + body.last_name;
    account.avatar = body?.photoUrl;
    account.referralCode = generateCodeHelper.generateReferralCode();
    return this.accountRepo.save(account);
  }

  async syncWallet(accountId: string, body: SyncWalletReq) {
    const account = await this.accountRepo.findOne(accountId);
    if (!account) {
      throw new BusinessException('Account not existed ');
    }
    const hexAddress = Address.parse(body?.walletAddress).toRawString();
    account.walletAddress = hexAddress;
    return this.accountRepo.save(account);
  }

  async accountInfo(accountId: string) {
    const account = await this.accountRepo.findOne(accountId);
    if (!account) {
      throw new BusinessException('Account not existed ');
    }
    return this.createSessionData(account);
  }

  async getAccountByReferralCode(referralCode: string) {
    let account = await this.accountRepo.findOne({
      where: { referralCode: referralCode },
    });
    if (!account) {
      throw new BusinessException('Referral code not found');
    }
    return account;
  }

  async sendUserMessage(account: AccountEntity, message: string) {
    const accountUserTelegram = await this.telegramUserRepo.findOne({
      telegramId: account.telegramId,
    });
    appBot.telegram.sendMessage(accountUserTelegram.chatId, message).catch(_ => {});
  }

  @DefTransaction()
  async saveReferral(accountId: string, referralCode: string, partnerCode = '') {
    const account = await this.accountRepo.findOne(accountId);
    const referral = await this.getAccountByReferralCode(referralCode);
    if (!referral) {
      throw new BusinessException('Referral code not found');
    }

    let findReferral = await this.accountReferralRepo
      .createQueryBuilder('account_referral')
      .where(
        'account_referral.accountId = :accountId AND account_referral.referralId = :referralId',
        {
          accountId: account.id,
          referralId: referral.id,
        },
      )
      .orWhere(
        'account_referral.accountId = :accountId AND account_referral.referralId = :referralId',
        {
          accountId: referral.id,
          referralId: account.id,
        },
      )
      .getOne();

    if (findReferral) {
      throw new BusinessException('Oops Error! Cross referrals are not allowed!!');
    }

    if (account.id === referral.id) {
      throw new BusinessException('Cannot refer yourself');
    }

    const ar = await this.accountReferralRepo.findOne({ where: { accountId } });
    if (ar) {
      throw new BusinessException('Referral code already got');
    }

    const accountReferral = new AccountReferralEntity();
    accountReferral.accountId = accountId;
    accountReferral.referralId = referral.id;
    accountReferral.referrerCode = referralCode;
    accountReferral.point = REFERRAL_POINT.PARENT;
    await this.accountReferralRepo.save(accountReferral);
    referral.balancePoint += REFERRAL_POINT.PARENT;

    await Promise.all([this.accountRepo.save(referral)]);
    const referralMessage = `You just received +${REFERRAL_POINT.PARENT} $POINT referral coins from @${account.username}`;
    this.sendUserMessage(referral, referralMessage).catch(_ => {});
  }
}
