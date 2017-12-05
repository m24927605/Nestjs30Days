import { Controller, Get, Post, Request, Response, Param, Next, HttpStatus, Body } from '@nestjs/common';
import { CreateUserDTO } from './DTO/create-users.dto';

@Controller('users')
export class UsersController {

    @Get()
    //使用Express的參數
    getAllUsers( @Request() req, @Response() res, @Next() next) {
        //假資料
        const users = [{ "Name": "Michael", "Age": 25 }];
        //多種HttpStatus可用
        res.status(HttpStatus.OK).json(users);
    }

    @Get('/:id')
    //使用Express的參數
    getUser( @Param() params) {
        return { "getUser": params.id };
    }

    @Post()
    //post過來的body要符合DTO class所描述的屬性
    addUser(@Body() createUserDTO:CreateUserDTO) {
        //顯示POST過來的body請求體
        console.log('姓名:',createUserDTO._name,'年紀:',createUserDTO._age);
    }
}