import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { I18nService } from 'nestjs-i18n';
import { BindRepo } from '~/@core/decorator';
import { BusinessException } from '~/@systems/exceptions';
import { I18nTranslations } from '~/assets/i18n.generated';
import { generateCodeHelper } from '~/common/helpers/generate-code.helper';
import { IUserTelegraf, TelegramLoginDto } from '~/dto/auth.dto';
import { AddAccountToChatGroupReq, CreateChatGroupReq, SendMessageReq } from '~/dto/chat.dto';
import { AccountEntity } from '~/entities/primary';
import {
  AccountRepo,
  ChatGroupAccountRepo,
  ChatGroupRepo,
  MessageRepo,
} from '~/repositories/primary';

@Injectable()
export class ChatService {
  constructor(
    private jwtService: JwtService,
    private readonly i18n: I18nService<I18nTranslations>,
  ) {}

  @BindRepo(AccountRepo)
  private accountRepo: AccountRepo;

  @BindRepo(ChatGroupRepo)
  private chatGroupRepo: ChatGroupRepo;

  @BindRepo(ChatGroupAccountRepo)
  private chatGroupAccountRepo: ChatGroupAccountRepo;

  @BindRepo(MessageRepo)
  private messageRepo: MessageRepo;

  groupDetail(code: string) {
    return this.chatGroupRepo.findOne({
      where: {
        code,
      },
    });
  }

  createGroup(body: CreateChatGroupReq) {
    return this.chatGroupRepo.save(body);
  }

  addAccountToGroup(body: AddAccountToChatGroupReq) {
    return this.chatGroupAccountRepo.save(body);
  }

  async getMessages(chatGroupId: string) {
    const res = await this.messageRepo.find({
      where: { chatGroupId },
      order: { createdDate: 'ASC' },
    });
    console.log(`-------------------`);
    console.log({
      res,
      chatGroupId,
    });
    console.log(`-------------------`);
    return res;
  }
  async sendMessage(body: SendMessageReq) {
    const account = await this.accountRepo
      .findOne({
        select: ['name', 'telegramId', 'avatar', 'username'],
        where: {
          id: body?.senderId,
        },
      })
      .catch(_ => ({
        name: 'guest',
        telegramId: null,
        avatar: '',
        username: 'guest',
      }));
    const message = await this.messageRepo.save(body);
    return {
      message,
      account,
    };
  }
}
