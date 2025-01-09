import { Markup } from 'telegraf';

const convertHtmlToTelegramMessage = (html: string = '') => {
  // Thay thế các thẻ không được hỗ trợ bằng các ký tự xuống dòng
  html = html.replace(/<\/?p[^>]*>/g, '\n');
  html = html.replace(/<br\s*\/?>/g, '\n');
  // Các thẻ HTML được Telegram hỗ trợ
  const supportedTags = ['b', 'i', 'a', 'code', 'pre', 'u', 's', 'strike', 'tg-spoiler'];
  supportedTags.forEach(tag => {
    const regexOpen = new RegExp(`<${tag}[^>]*>`, 'g');
    const regexClose = new RegExp(`</${tag}>`, 'g');
    html = html.replace(regexOpen, `<${tag}>`);
    html = html.replace(regexClose, `</${tag}>`);
  });
  // Xử lý thẻ img để hiển thị hình ảnh
  html = html.replace(/<img[^>]+src="([^">]+)"[^>]*>/g, (match, src) => {
    return `<a href="${src}">&#8205;</a>`;
  });
  // Xóa bỏ các thẻ HTML không được hỗ trợ còn lại
  html = html.replace(/<\/?[^>]+(>|$)/g, '');

  // Xóa các dòng trống thừa
  html = html.replace(/\n\s*\n/g, '\n');
  return html.trim();
};

const imageTitle = `https://cdn.nftfeed.guru/files/a7b52461fed842ca8c27596b42248643Wincryptpcoverapp16x9.jpg`;
const htmlMessage = `
🎉 Welcome to WinCrypto – Your Ultimate Companion for Your Crypto Journey!  

💡 WinCrypto is a decentralized Miniapp built on the TON Network, seamlessly integrated with Telegram, offering an easy and efficient way to explore the world of crypto.  

Here, you can:  
✅ Access essential crypto knowledge tailored for beginners.  
✅ Receive accurate trading signals powered by technical and on-chain analysis.  
✅ Stay updated with market news and trends from trusted sources.  

🚀 Discover, learn, and trade with WinCrypto – where every opportunity begins!
`.trim();

const EMOJI = {
  medals: ['🥇', '🥈', '🥉', '🚀'],
  common: ['👑', '🎖️', '🏆', '⭐', '💎', '🎯'],
};

const WEB_APP_DOMAIN = 'https://wincrypto.ai';

const webAppButtons = [
  {
    text: '🚀 OPEN 🚀',
    web_app: { url: WEB_APP_DOMAIN },
  },
];

const socialButtons = [
  Markup.button.url('Group', 'https://wincrypto.ai/'),
  Markup.button.url('Twitter', 'https://wincrypto.ai/'),
  Markup.button.url('Website', 'https://wincrypto.ai/'),
];

const reply_markup_user = {
  inline_keyboard: [
    [...webAppButtons],
    //    [...socialButtons]
  ],
  one_time_keyboard: true,
  resize_keyboard: true,
};

const reply_markup_group = {
  inline_keyboard: [[...socialButtons]],
  one_time_keyboard: true,
  resize_keyboard: true,
};

export const SocialContentBot = {
  convertHtmlToTelegramMessage,
  EMOJI,
  metaDataGame: {
    imageTitle,
    htmlMessage,
  },
  reply_markup_user,
  reply_markup_group,
};
