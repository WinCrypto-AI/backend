import { Injectable } from '@nestjs/common';
import { SocialContentBot } from '~/common/constants/SocialContentBot';
import { appBot } from '~/connectors';
const { EMOJI, convertHtmlToTelegramMessage, metaDataGame, reply_markup_user } = SocialContentBot;
const { htmlMessage, imageTitle } = metaDataGame;

@Injectable()
export class SetupService {
  initTelegramBot() {
    appBot.start(async ctx => {
      ctx.telegram.sendPhoto(ctx.chat.id, imageTitle, {
        caption: htmlMessage,
        reply_markup: reply_markup_user,
      });
    });
    appBot.telegram.setMyCommands([{ command: 'start', description: 'Start' }]);
    appBot.launch();
  }
}
