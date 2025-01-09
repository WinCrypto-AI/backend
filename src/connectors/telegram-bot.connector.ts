import { Telegraf } from 'telegraf';
import { configEnv } from '~/@config/env';
const { TELEGRAM_BOT_TOKEN_WIN_CRYPTO } = configEnv();

console.log(`-------------------`);
console.log({ TELEGRAM_BOT_TOKEN_WIN_CRYPTO });
console.log(`-------------------`);

const createTelegramBot = (botToken: string) => {
  const bot = new Telegraf(botToken);
  // Enable graceful stop
  process.once('SIGINT', () => bot.stop('SIGINT'));
  process.once('SIGTERM', () => bot.stop('SIGTERM'));
  return bot;
};

export const appBot = createTelegramBot(TELEGRAM_BOT_TOKEN_WIN_CRYPTO);
