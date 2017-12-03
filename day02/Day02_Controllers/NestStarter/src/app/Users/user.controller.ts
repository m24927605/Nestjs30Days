import { Controller, Get, Post, Request, Response, Param, Next, HttpStatus, Body } from '@nestjs/common';
import { CreateUserDto } from './DTO/create-users.dto';

@Controller('users')
export class UsersController {

    @Get()
    //使用Express的參數
    getAllUsers( @Request() req, @Response() res, @Next() next) {
        //假資料
        const users = [{ "Name": "Michael" }];
        //多種HttpStatus可用
        res.status(HttpStatus.OK).json(users);
    }

    @Get('/:id')
    //使用Express的參數
    getUser( @Param() params) {
        return { "getUser": params.id };
    }

    @Post()
    addUser( @Body() createUserDto: CreateUserDto) {
        console.log(createUserDto);
    }
}