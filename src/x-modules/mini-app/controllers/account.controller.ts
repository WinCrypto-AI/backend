import { Body, Query } from '@nestjs/common';
import { DefController, DefGet, DefPost } from '~/@core/decorator';
import { CreateReportReq, ListReportReq } from '~/dto/signal.dto';
import { UUIDReq } from '~/dto/common.dto';
import { AccountService, ReportService } from '../services';
import { miniAppSessionContext } from '../config';

@DefController('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @DefPost('daily-check-in')
  dailyCheckIn() {
    const { accountId } = miniAppSessionContext;
    return this.accountService.dailyCheckIn(accountId);
  }
}
