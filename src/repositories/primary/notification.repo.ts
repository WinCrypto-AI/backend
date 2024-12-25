import { EntityRepository } from 'typeorm';
import { PrimaryRepo } from '../primary.repo';
import { NotificationEntity } from '~/entities/primary';

@EntityRepository(NotificationEntity)
export class NotificationRepo extends PrimaryRepo<NotificationEntity> {}
