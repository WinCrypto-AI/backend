import { Body, Query } from '@nestjs/common';
import { DefController, DefGet, DefPost } from '~/@core/decorator';
import { CreateNotificationReq, CreateSignalReq, ListNotificationReq } from '~/dto/signal.dto';
import { UUIDReq } from '~/dto/common.dto';
import { NotificationService } from '../services';

@DefController('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @DefPost('create')
  create(@Body() body: CreateNotificationReq) {
    return this.notificationService.create(body);
  }

  @DefGet('list')
  list(@Query() params: ListNotificationReq) {
    return this.notificationService.list(params);
  }

  @DefGet('detail')
  detail(@Query() params: UUIDReq) {
    return this.notificationService.detail(params);
  }
}
