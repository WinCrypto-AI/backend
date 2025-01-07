import { DefController, DefGet } from '~/@core/decorator';
import { PublicService } from '../services';
import { NSAccount } from '~/common/enums';
import { SystemValue } from '~/common/constants';

@DefController('')
export class PublicController {
  constructor(private readonly publicService: PublicService) {}

  @DefGet('example')
  create() {
    return this.publicService.example();
  }

  @DefGet('payment-config')
  paymentConfig() {
    const { PAYMENT_CONFIG } = SystemValue;
    return Object.keys(PAYMENT_CONFIG).map(type => ({
      type,
      value: PAYMENT_CONFIG[type],
    }));
  }
}
