import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { I18nService } from 'nestjs-i18n';
import { BindRepo } from '~/@core/decorator';
import { BusinessException } from '~/@systems/exceptions';
import { I18nTranslations } from '~/assets/i18n.generated';
import { UUIDReq } from '~/dto/common.dto';
import { CreateNotificationReq, ListNotificationReq } from '~/dto/signal.dto';
import { NotificationRepo } from '~/repositories/primary';

@Injectable()
export class NotificationService {
  constructor(
    private jwtService: JwtService,
    private readonly i18n: I18nService<I18nTranslations>,
  ) {}

  @BindRepo(NotificationRepo)
  private notificationRepo: NotificationRepo;

  create(body: CreateNotificationReq) {
    return this.notificationRepo.save(body);
  }

  list(params: ListNotificationReq) {
    return this.notificationRepo.findPagination({}, params);
  }

  async detail(params: UUIDReq) {
    const notification = await this.notificationRepo.findOne(params?.id);
    if (!notification) {
      throw new BusinessException('Notification not existed');
    }
    return notification;
  }
}
