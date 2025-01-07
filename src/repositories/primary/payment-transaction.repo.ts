import { EntityRepository } from 'typeorm';
import { PrimaryRepo } from '../primary.repo';
import { PaymentTransactionEntity } from '~/entities/primary';

@EntityRepository(PaymentTransactionEntity)
export class PaymentTransactionRepo extends PrimaryRepo<PaymentTransactionEntity> {}
