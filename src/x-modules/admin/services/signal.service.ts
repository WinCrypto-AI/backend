import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { I18nService } from 'nestjs-i18n';
import { BindRepo } from '~/@core/decorator';
import { I18nTranslations } from '~/assets/i18n.generated';
import {
  AccountRepo,
  ChatGroupAccountRepo,
  ChatGroupRepo,
  MessageRepo,
} from '~/repositories/primary';

@Injectable()
export class SignalService {
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
}
