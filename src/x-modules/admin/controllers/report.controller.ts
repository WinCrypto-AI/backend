import { Body, Query } from '@nestjs/common';
import { DefController, DefGet, DefPost } from '~/@core/decorator';
import { CreateReportReq, ListReportReq } from '~/dto/signal.dto';
import { UUIDReq } from '~/dto/common.dto';
import { ReportService } from '../services';

@DefController('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @DefPost('create')
  create(@Body() body: CreateReportReq) {
    return this.reportService.create(body);
  }

  @DefGet('list')
  list(@Query() params: ListReportReq) {
    return this.reportService.list(params);
  }

  @DefGet('detail')
  detail(@Query() params: UUIDReq) {
    return this.reportService.detail(params);
  }
}
