import { Controller, Get, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {

    @Get()
    getAllUsers() {
        const users = [{ "Name": "Michael" }];
        return users;
    }

    @Get('/:id')
    getUser() { }

    @Post()
    addUser() { }
}