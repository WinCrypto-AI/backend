import { EntityRepository } from 'typeorm';
import { PrimaryRepo } from '../primary.repo';
import { ChatGroupEntity } from '~/entities/primary';

@EntityRepository(ChatGroupEntity)
export class ChatGroupRepo extends PrimaryRepo<ChatGroupEntity> {}
