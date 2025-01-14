import { Injectable } from '@nestjs/common';
import { SocialContentBot } from '~/common/constants/SocialContentBot';
import { appBot } from '~/connectors';
import { TelegramLoginDto } from '~/dto/auth.dto';
import * as crypto from 'crypto';
import { configEnv } from '~/@config/env';
import { JwtService } from '@nestjs/jwt';
import { I18nService } from 'nestjs-i18n';
import { I18nTranslations } from '~/assets/i18n.generated';
import { AuthService } from '~/x-modules/mini-app/services';
import { BindRepo } from '~/@core/decorator';
import { AccountRepo, TelegramUserRepo } from '~/repositories/primary';
import { TelegramUserEntity } from '~/entities/primary';
const { EMOJI, convertHtmlToTelegramMessage, metaDataGame, reply_markup_user } = SocialContentBot;
const { htmlMessage, imageTitle } = metaDataGame;
const { TELEGRAM_BOT_TOKEN_WIN_CRYPTO } = configEnv();
@Injectable()
export class SetupService {
  constructor(
    private jwtService: JwtService,
    private readonly i18n: I18nService<I18nTranslations>,
    private readonly authService: AuthService,
  ) {}

  @BindRepo(AccountRepo)
  private accountRepo: AccountRepo;

  @BindRepo(TelegramUserRepo)
  private telegramUserRepo: TelegramUserRepo;

  initTelegramBot() {
    appBot.start(async ctx => {
      const handleSyncUserAndReferral = async () => {
        try {
          const args = ctx?.args || [];
          const user = ctx.message.from;
          const query_id = ctx.message.message_id.toString();
          const auth_date = Math.floor(Date.now() / 1000).toString();
          const dataCheckString = Object.entries({
            query_id,
            user,
            auth_date,
          })
            .sort()
            .map(([k, v]) => {
              if (typeof v === 'object' && v !== null) {
                v = JSON.stringify(v);
              }

              return `${k}=${v}`;
            })
            .join('\n');
          const secret = crypto
            .createHmac('sha256', 'WebAppData')
            .update(TELEGRAM_BOT_TOKEN_WIN_CRYPTO);
          const hash = crypto
            .createHmac('sha256', secret.digest())
            .update(dataCheckString)
            .digest('hex');
          const loginDto: TelegramLoginDto = {
            auth_date,
            hash,
            query_id,
            user,
          };
          let referralCode = '';
          let partnerCode = '';
          if (args.length > 0) {
            const params = (args[0] || '').split('_');
            if (params.length > 1) {
              referralCode = params[0];
              partnerCode = params[1];
            } else {
              referralCode = params.join();
            }
          }
          if (referralCode) {
            const account = await this.authService.telegramLogin(loginDto);
            await this.authService.saveReferral(account.id, referralCode, partnerCode);
          }
        } catch (error) {
          console.error(error);
        }
      };
      console.log(`=====START COMMAND USER=====`);
      if (ctx.chat.type === 'private') {
        const telegramId = ctx.message.from.id || '';
        const chatId = ctx?.chat?.id || '';
        handleSyncUserAndReferral();
        if (chatId && telegramId) {
          const item = await this.telegramUserRepo.findOne({
            where: {
              telegramId,
            },
          });
          if (!item) {
            this.telegramUserRepo.save(
              Object.assign(new TelegramUserEntity(), {
                telegramId,
                chatId,
              }),
            );
          }
        }
      }

      ctx.telegram.sendPhoto(ctx.chat.id, imageTitle, {
        caption: htmlMessage,
        reply_markup: reply_markup_user,
      });
    });
    appBot.command('referral_code', async ctx => {
      const telegramId = ctx.message.from.id || '';
      const account = await this.accountRepo.findOne({
        where: {
          telegramId,
        },
      });
      if (account?.referralCode) {
        const link = `https://t.me/win_crypto_ai_bot?start=${account?.referralCode}`;
        const message = `Referral Code: ${account?.referralCode} \nLink: ${link}`;
        ctx.reply(message);
      }
    });
    appBot.telegram.setMyCommands([
      { command: 'start', description: 'Start' },
      { command: 'referral_code', description: 'GET referral code' },
    ]);
    appBot.launch();
  }
}
