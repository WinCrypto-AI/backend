import { Injectable } from '@nestjs/common';
import { Timeout } from '@nestjs/schedule';
import { BindRepo } from '~/@core/decorator';
import { SystemValue } from '~/common/constants';
import { ChatGroupRepo } from '~/repositories/primary';
import { SetupService } from '../services';

@Injectable()
export class ExampleProvider {
  constructor(private readonly setupService: SetupService) {}
  @BindRepo(ChatGroupRepo)
  private chatGroupRepo: ChatGroupRepo;

  @Timeout(1000)
  showLogs() {
    console.log(`=====showLogs ExampleProvider=====`);
  }

  @Timeout(1000)
  async initGroup() {
    console.log(`===== initGroup =====`);
    try {
      // + group free
      // + Group $200

      // CTV MOI_GIOI 2000

      // + Channel OG
      // + Channel Broker

      const { LIST_GROUP: listGroup } = SystemValue;
      for (const { code, name, type } of listGroup) {
        const group = await this.chatGroupRepo.findOne({
          where: {
            code,
          },
        });
        if (!group) {
          await this.chatGroupRepo.save({
            code,
            name,
            type,
          });
        }
      }
    } catch (error) {
      console.log(`=====initGroup=====`, error);
    }
  }

  @Timeout(1000)
  async initTelegramBot() {
    try {
      console.log(`=====initTelegramBott=====`);
      this.setupService.initTelegramBot();
      console.log(`=====initTelegramBott SUCCESS=====`);
    } catch (error) {
      console.error(`=====initTelegramBott ERROR=====`, error);
    }
  }
}
