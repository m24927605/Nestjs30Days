'use strict';

import { Controller, Get, Response, HttpStatus, Param, Body, Post, Request, Patch, Delete } from '@nestjs/common';
import { UsersServices } from '../users.service';

@Controller()
export class UsersController {

    constructor(private readonly usersServices: UsersServices) { }

    @Get('users')
    public async getUsers( @Response() res) {
        const users = await this.usersServices.findAll();
        return res.status(HttpStatus.OK).json(users);
    }

    @Get('users/find')
    public async findUser( @Response() res) {
        //給定where條件
        let queryCondition = { where: { Name: 'Mary' } };
        const users = await this.usersServices.findOne(queryCondition);
        return res.status(HttpStatus.OK).json(users);
    }

    @Get('users/:id')
    public async getUser( @Response() res, @Param() param) {

        const users = await this.usersServices.findById(param.id);
        return res.status(HttpStatus.OK).json(users);
    }

    @Post('users')
    public async createUser( @Response() res, @Body() body) {

        const users = await this.usersServices.create(body);
        return res.status(HttpStatus.OK).json(users);
    }

    @Patch('users/:ID')
    public async updateUser( @Param() param, @Response() res, @Body() body) {

        const users = await this.usersServices.update(param.ID,body);
        return res.status(HttpStatus.OK).json(users);
    }

    @Delete('users/:ID')
    public async deleteUser( @Param() param, @Response() res) {

        const users = await this.usersServices.delete(param.ID);
        return res.status(HttpStatus.OK).json(users);
    }
}