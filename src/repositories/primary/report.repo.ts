import { EntityRepository } from 'typeorm';
import { PrimaryRepo } from '../primary.repo';
import { ReportEntity } from '~/entities/primary';

@EntityRepository(ReportEntity)
export class ReportRepo extends PrimaryRepo<ReportEntity> {}
