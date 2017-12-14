import { Controller, Get, Request, Response, Next } from '@nestjs/common';

@Controller()
export class ChatController {

    constructor() { }

    @Get('chat')
    //使用Express的參數
    async chat( @Request() req, @Response() res, @Next() next) {
        //跟expressjs專案一樣，指定view路徑，後面帶變數可以直接render到view上
        res.render('./Chat/chat',{title:"聊天室"});
    }
}