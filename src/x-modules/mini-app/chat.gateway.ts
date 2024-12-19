import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './services';

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(private readonly chatService: ChatService) {}

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('joinGroup')
  async handleJoinGroup(
    @MessageBody()
    data: {
      chatGroupId: string;
      accountId: string;
    },
    @ConnectedSocket() client: Socket,
  ) {
    client.join(data.chatGroupId);
    console.log(
      `Client ${client.id} , account: ${data.accountId} ,joined group ${data.chatGroupId}`,
    );
    this.chatService.addAccountToGroup(data);
  }

  @SubscribeMessage('sendMessage')
  async handleSendMessage(
    @MessageBody() data: { chatGroupId: string; senderId: string; content: string },
  ) {
    const message = await this.chatService.sendMessage(data);
    this.server.to(data.chatGroupId).emit('newMessage', message);
    return message;
  }
}
