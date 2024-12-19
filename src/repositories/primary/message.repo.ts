import { EntityRepository } from 'typeorm';
import { PrimaryRepo } from '../primary.repo';
import { MessageEntity } from '~/entities/primary';

@EntityRepository(MessageEntity)
export class MessageRepo extends PrimaryRepo<MessageEntity> {}
