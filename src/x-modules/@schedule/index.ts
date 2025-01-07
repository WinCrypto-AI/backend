import { Module } from '@nestjs/common';
import * as services from './services';
import * as providers from './providers';
@Module({
  providers: [...Object.values(services), ...Object.values(providers)],
})
export class ScheduleModule {}
