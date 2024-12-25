import { EntityRepository } from 'typeorm';
import { PrimaryRepo } from '../primary.repo';
import { SignalEntity } from '~/entities/primary';

@EntityRepository(SignalEntity)
export class SignalRepo extends PrimaryRepo<SignalEntity> {}
