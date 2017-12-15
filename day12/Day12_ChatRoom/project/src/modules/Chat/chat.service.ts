import { Component } from '@nestjs/common';
import { Message } from './DTO/Messages.dto';

@Component()
export class ChatService {
    
    //消息陣列
    messages: Message[] = [];

    //取得消息
    getMessages(): Message[] {
        return this.messages;
    }

    //存放消息
    storeMessage(message: Message) {
        this.messages.push(message);
    }
}