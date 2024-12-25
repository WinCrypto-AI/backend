import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { I18nService } from 'nestjs-i18n';
import { BindRepo } from '~/@core/decorator';
import { BusinessException } from '~/@systems/exceptions';
import { I18nTranslations } from '~/assets/i18n.generated';
import { UUIDReq } from '~/dto/common.dto';
import { CreateSignalReq, ListSignalReq } from '~/dto/signal.dto';
import { AccountRepo, SignalRepo } from '~/repositories/primary';

@Injectable()
export class SignalService {
  constructor(
    private jwtService: JwtService,
    private readonly i18n: I18nService<I18nTranslations>,
  ) {}

  @BindRepo(AccountRepo)
  private accountRepo: AccountRepo;

  @BindRepo(SignalRepo)
  private signalRepo: SignalRepo;

  create(body: CreateSignalReq) {
    return this.signalRepo.save(body);
  }

  list(params: ListSignalReq) {
    return this.signalRepo.findPagination({}, params);
  }

  async detail(params: UUIDReq) {
    const signal = await this.signalRepo.findOne(params?.id);
    if (!signal) {
      throw new BusinessException('Signal not existed');
    }
    return signal;
  }
}
