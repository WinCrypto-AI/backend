import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import { ChatService } from '../services';
import { AddAccountToChatGroupReq, CreateChatGroupReq, SendMessageReq } from '~/dto/chat.dto';
import { DefGet, DefPost } from '~/@core/decorator';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @DefGet('group/:code')
  async groupDetail(@Param('code') code: string) {
    return this.chatService.groupDetail(code);
  }

  @DefPost('group/create')
  async createGroup(@Body() body: CreateChatGroupReq) {
    return this.chatService.createGroup(body);
  }

  @DefPost('group/add-account')
  async addAccountToGroup(@Body() body: AddAccountToChatGroupReq) {
    return this.chatService.addAccountToGroup(body);
  }

  @DefPost('send-message')
  async sendMessage(@Body() body: SendMessageReq) {
    return this.chatService.sendMessage(body);
  }

  @DefGet('group/messages')
  async getMessages(@Query('chatGroupId') chatGroupId: string) {
    return this.chatService.getMessages(chatGroupId);
  }
}
