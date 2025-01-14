import { EntityRepository } from 'typeorm';
import { PrimaryRepo } from '../primary.repo';
import { AccountReferralEntity } from '~/entities/primary';

@EntityRepository(AccountReferralEntity)
export class AccountReferralRepo extends PrimaryRepo<AccountReferralEntity> {}
