'use strict';

import { Controller, Get, Response, HttpStatus, Param, Body, Post, Request, Patch, Delete } from '@nestjs/common';
import { UsersServices } from '../users.service';
import { CreateUsersDTO } from '../DTO/createUsers.dto';

@Controller()
export class UsersController {

    constructor(private readonly usersServices: UsersServices) { }


    @Get('users/:id')
    public async getUser( @Response() res, @Param() param) {

        const users = await this.usersServices.findById(param.id);
        return res.status(HttpStatus.OK).json(users);
    }

    @Post('users')
    public async createUser( @Response() res, @Body() createUsersDTO: CreateUsersDTO) {

        const users = await this.usersServices.create(createUsersDTO);
        return res.status(HttpStatus.OK).json(createUsersDTO);
    }

    @Patch('users/:ID')
    public async updateUser( @Param() param, @Response() res, @Body() body) {

        const users = await this.usersServices.update(param.ID, body);
        return res.status(HttpStatus.OK).json(users);
    }

    @Delete('users/:ID')
    public async deleteUser( @Param() param, @Response() res) {

        const users = await this.usersServices.delete(param.ID);
        return res.status(HttpStatus.OK).json(users);
    }
}