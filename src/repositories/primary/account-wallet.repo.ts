import { EntityRepository } from 'typeorm';
import { PrimaryRepo } from '../primary.repo';
import { AccountWalletEntity } from '~/entities/primary';

@EntityRepository(AccountWalletEntity)
export class AccountWalletRepo extends PrimaryRepo<AccountWalletEntity> {}
