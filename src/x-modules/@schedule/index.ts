import { Module } from '@nestjs/common';
import * as services from './services';
import * as providers from './providers';
import { AuthService } from '../mini-app/services';

const serviceIn = [AuthService];

@Module({
  providers: [...serviceIn, ...Object.values(services), ...Object.values(providers)],
})
export class ScheduleModule {}
