import { Controller, Get, Post, Request, Response, Param, Next, HttpStatus, Body } from '@nestjs/common';
import { CreateUserDTO } from './DTO/create-users.dto';
import { UsersService } from '../Users/Services/users.service';

@Controller('users')
export class UsersController {

    //依賴注入，建議要使用，這是低耦合作法
    constructor(private userService: UsersService) { }

    @Get()
    //使用Express的參數
    async getAllUsers( @Request() req, @Response() res, @Next() next) {
        //Promise 有then catch方法可以調用
        await this.userService.getAllUsers()
            .then((users) => {
                //多種Http的Status可以使用
                res.status(HttpStatus.OK).json(users);
            })
            .catch((error) => {
                console.error(error);
                res.status(HttpStatus.INTERNAL_SERVER_ERROR);
            })
    }

    @Get('/:id')
    //使用Express的參數
    //@Param('id')可以直接抓id參數
    async getUser( @Response() res, @Param('id') id) {
        //+id ，+符號可以直接把string 轉換成number
        await this.userService.getUser(+id)
            .then((user) => {
                res.status(HttpStatus.OK).json(user);
            })
            .catch((error) => {
                console.error(error);
                res.status(HttpStatus.INTERNAL_SERVER_ERROR);
            })
    }

    @Post()
    async addUser( @Response() res, @Body() createUserDTO: CreateUserDTO) {
        //使用Rx.js，所以回傳可以做更多資料流的處理
        await this.userService.addUser(createUserDTO).subscribe((users) => {
            res.status(HttpStatus.OK).json(users);
        })
    }
}