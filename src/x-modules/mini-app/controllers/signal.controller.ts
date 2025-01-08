import { Body, Query } from '@nestjs/common';
import { SignalService } from '../services';
import { DefController, DefGet, DefPost } from '~/@core/decorator';
import { CreateSignalReq, ListSignalReq } from '~/dto/signal.dto';
import { UUIDReq } from '~/dto/common.dto';

@DefController('signal')
export class SignalController {
  constructor(private readonly signalService: SignalService) {}

  @DefGet('list')
  list(@Query() params: ListSignalReq) {
    return this.signalService.list(params);
  }
  @DefGet('detail')
  detail(@Query() params: UUIDReq) {
    return this.signalService.detail(params);
  }
}
