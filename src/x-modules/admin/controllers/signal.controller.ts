import { SignalService } from '../services';
import { DefController } from '~/@core/decorator';

@DefController('signal')
export class SignalController {
  constructor(private readonly signalService: SignalService) {}
}
