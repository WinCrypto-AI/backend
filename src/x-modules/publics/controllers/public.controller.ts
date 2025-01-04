import { DefController, DefGet } from '~/@core/decorator';
import { PublicService } from '../services';
import { apeApiConnector } from '~/common/connectors';
import { NSAccount } from '~/common/enums';

@DefController('')
export class PublicController {
  constructor(private readonly publicService: PublicService) {}

  @DefGet('example')
  create() {
    return this.publicService.example();
  }

  @DefGet('payment-config')
  paymentConfig() {
    return [
      {
        type: NSAccount.EType.PAID_200,
        value: 0.1,
      },
      {
        type: NSAccount.EType.PAID_2000,
        value: 0.2,
      },
    ];
  }
}
