import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { UsersService } from '../Users/Services/users.service';
@Module({
    //傳入ChatController
    controllers: [ChatController],
    //傳入ChatGateway
    components:[ChatGateway,ChatService,UsersService]
})
export class ChatModule { }