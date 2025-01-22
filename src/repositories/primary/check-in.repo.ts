import { EntityRepository } from 'typeorm';
import { PrimaryRepo } from '../primary.repo';
import { CheckInEntity } from '~/entities/primary';

@EntityRepository(CheckInEntity)
export class CheckInRepo extends PrimaryRepo<CheckInEntity> {}
