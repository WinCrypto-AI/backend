import { DefController, DefGet } from '~/@core/decorator';
import { PublicService } from '../services';
import { apeApiConnector } from '~/common/connectors';

@DefController('')
export class PublicController {
  constructor(private readonly publicService: PublicService) {}

  @DefGet('example')
  create() {
    return this.publicService.example();
  }
}
