import { EntityRepository } from 'typeorm';
import { PrimaryRepo } from '../primary.repo';
import { TelegramUserEntity } from '~/entities/primary';

@EntityRepository(TelegramUserEntity)
export class TelegramUserRepo extends PrimaryRepo<TelegramUserEntity> {}
