import { Controller, Get, Post, Request, Response, Next, HttpStatus, UseGuards } from '@nestjs/common';
import { RolesGuard } from '../Shared/Guards/roles.guard';
import { Roles } from '../Shared/decorators/roles.decorator';

@Controller()
@UseGuards(RolesGuard)
export class ChatController {

    constructor() { }

    @Get('toAddInChatRoom')
    //使用Express的參數
    async toAddInChatRoom( @Request() req, @Response() res, @Next() next) {
        //跟expressjs專案一樣，指定view路徑，後面帶變數可以直接render到view上
        res.render('./Chat/toAddInChatRoom', { title: "加入聊天室" });
    }

    @Post('addInChatRoom')
    //使用Express的參數
    async addInChatRoom( @Request() req, @Response() res, @Next() next) {
        /*
        1.以下是要建立路由警衛機制，刻意給每個有輸入名稱的使用者一個role，
        並且為了在聊天室顯示使用者名稱，透過cookie存放輸入名稱，這邊只是為了demo，
        實際存放名稱要考量更多資安問題。
        2.我們透過session存放account和role，在Guard機制裏頭，我們會去比對role。
         */
        let tmpAccount: string = req.body.Account;
        req.session.user={};
        req.session.user.account = tmpAccount;
        if (tmpAccount) {
            //role給予general角色
            req.session.user.roles = ["general"];
            //將名稱存放前端cookie，推播訊息時，前端會抓取名稱加上訊息再做推播。
            res.cookie('name', `${tmpAccount}`);
        }
        //跟expressjs專案一樣，指定view路徑，後面帶變數可以直接render到view上
        res.redirect('/chatRoom');
    }


    @Get('chatRoom')
    @Roles('general')
    //使用Express的參數
    async chatRoom( @Request() req, @Response() res, @Next() next) {
        //跟expressjs專案一樣，指定view路徑，後面帶變數可以直接render到view上
        res.render('./Chat/chatRoom', { title: "聊天室" });
    }
}