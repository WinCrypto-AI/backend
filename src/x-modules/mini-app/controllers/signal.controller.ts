import { Body, Query } from '@nestjs/common';
import { SignalService } from '../services';
import { DefController, DefGet, DefPost } from '~/@core/decorator';
import { CreateSignalReq, ListSignalReq } from '~/dto/signal.dto';

@DefController('signal')
export class SignalController {
  constructor(private readonly signalService: SignalService) {}

  @DefPost('create')
  create(@Body() body: CreateSignalReq) {
    return this.signalService.create(body);
  }

  @DefGet('list')
  list(@Query() params: ListSignalReq) {
    return this.signalService.list(params);
  }
}
