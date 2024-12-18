import { Injectable } from '@nestjs/common';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { I18nTranslations } from '~/assets/i18n.generated';
@Injectable()
export class PublicService {
  constructor(private readonly i18n: I18nService<I18nTranslations>) {}
  example() {
    return this.i18n.t('payment.notification.purchase_card.body', {
      args: {
        amount: 100_000,
        cardNumber: '123456789',
      },
    });
  }
}
