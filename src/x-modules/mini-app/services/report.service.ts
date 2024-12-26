import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { I18nService } from 'nestjs-i18n';
import { BindRepo } from '~/@core/decorator';
import { BusinessException } from '~/@systems/exceptions';
import { I18nTranslations } from '~/assets/i18n.generated';
import { UUIDReq } from '~/dto/common.dto';
import { CreateReportReq, ListReportReq } from '~/dto/signal.dto';
import { ReportRepo } from '~/repositories/primary';

@Injectable()
export class ReportService {
  constructor(
    private jwtService: JwtService,
    private readonly i18n: I18nService<I18nTranslations>,
  ) {}

  @BindRepo(ReportRepo)
  private reportRepo: ReportRepo;

  create(body: CreateReportReq) {
    return this.reportRepo.save(body);
  }

  list(params: ListReportReq) {
    return this.reportRepo.findPagination(
      {
        order: {
          createdDate: 'DESC',
        },
      },
      params,
    );
  }

  async detail(params: UUIDReq) {
    const report = await this.reportRepo.findOne(params?.id);
    if (!report) {
      throw new BusinessException('Report not existed');
    }
    return report;
  }
}
