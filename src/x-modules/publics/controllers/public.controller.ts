import { DefController, DefGet, DefPost } from '~/@core/decorator';
import { PublicService } from '../services';
import { NSAccount } from '~/common/enums';
import { SystemValue } from '~/common/constants';
import { Body } from '@nestjs/common';
import { Address } from '@ton/core';
import { AddressReq } from '~/dto/common.dto';

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

  @DefPost('ton-address')
  tonAddress(@Body() body: AddressReq) {
    const toRawString = Address.parse(body.address).toRawString();
    const toString = Address.parse(body.address).toString();
    return {
      toRawString,
      toString,
    };
  }
}
