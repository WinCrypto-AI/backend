import { EntityRepository } from 'typeorm';
import { PrimaryRepo } from '../primary.repo';
import { ChatGroupAccountEntity } from '~/entities/primary';

@EntityRepository(ChatGroupAccountEntity)
export class ChatGroupAccountRepo extends PrimaryRepo<ChatGroupAccountEntity> {}
