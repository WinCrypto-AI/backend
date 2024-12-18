import { EntityRepository } from 'typeorm';
import { PrimaryRepo } from '../primary.repo';
import { AccountEntity } from '~/entities/primary';

@EntityRepository(AccountEntity)
export class AccountRepo extends PrimaryRepo<AccountEntity> {}
