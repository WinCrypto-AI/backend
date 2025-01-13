import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { I18nService } from 'nestjs-i18n';
import { In } from 'typeorm';
import { BindRepo } from '~/@core/decorator';
import { BusinessException } from '~/@systems/exceptions';
import { I18nTranslations } from '~/assets/i18n.generated';
import { NSAccount } from '~/common/enums';
import { UUIDReq } from '~/dto/common.dto';
import { CreateReportReq, ListReportReq } from '~/dto/signal.dto';
import { AccountRepo, ReportRepo } from '~/repositories/primary';
import { miniAppSessionContext } from '../config/mini-app-session.context';

@Injectable()
export class ReportService {
  constructor(
    private jwtService: JwtService,
    private readonly i18n: I18nService<I18nTranslations>,
  ) {}

  @BindRepo(ReportRepo)
  private reportRepo: ReportRepo;

  @BindRepo(AccountRepo)
  private accountRepo: AccountRepo;

  async list(params: ListReportReq) {
    let accountType = NSAccount.EType.FREE;
    if (miniAppSessionContext?.accountId) {
      const account = await this.accountRepo.findOne(miniAppSessionContext?.accountId);
      if (account) {
        accountType = account.type;
      }
    }
    const listTypes = [NSAccount.EType.FREE];
    if (accountType === NSAccount.EType.PAID_200) {
      listTypes.push(NSAccount.EType.PAID_200);
    }
    if (accountType === NSAccount.EType.PAID_2000) {
      listTypes.push(NSAccount.EType.PAID_200, NSAccount.EType.PAID_2000);
    }
    return this.reportRepo.findPagination(
      {
        where: {
          accountType: In(listTypes),
        },
        order: {
          createdDate: params?.sort || 'DESC',
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
