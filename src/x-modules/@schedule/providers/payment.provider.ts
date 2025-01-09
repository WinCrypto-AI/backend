import { Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { PaymentService } from '../services/payment.service';

@Injectable()
export class PaymentProvider {
  constructor(private readonly paymentService: PaymentService) {}

  @Interval(5 * 1000)
  async scanPaymentTon() {
    // try {
    //   console.log(`=====scanPaymentTon=====`);
    //   this.paymentService.listenDepositTon(20);
    //   console.log(`=====scanPaymentTon SUCCESS=====`);
    // } catch (error) {
    //   console.error(`=====scanPaymentTon ERROR=====`, error);
    // }
  }
}
