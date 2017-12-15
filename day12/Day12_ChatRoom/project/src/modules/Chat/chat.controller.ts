import { Controller, Get, Request, Response, Next, HttpStatus } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller()
export class ChatController {

    constructor(private chatService: ChatService) { }

    @Get('chat')
    //使用Express的參數
    async chat( @Request() req, @Response() res, @Next() next) {
        //跟expressjs專案一樣，指定view路徑，後面帶變數可以直接render到view上
        res.render('./Chat/chat', { title: "聊天室" });
    }

    @Get('messages')
    async getAllMessages( @Response() res) {
        const messages = await this.chatService.getMessages();
        res.status(HttpStatus.OK).json(messages);
    }
}