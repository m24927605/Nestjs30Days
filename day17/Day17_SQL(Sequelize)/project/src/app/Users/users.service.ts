

import { Component, Inject } from '@nestjs/common';
import { Users } from './users.entity';
import { Model } from 'sequelize-typescript';
import { IUsers, IUsersService } from './interfaces/index';

@Component()
export class UsersServices implements IUsersService {
    constructor(
        @Inject('UsersRepository') private readonly usersRepository: typeof Users) { }

    public async findAll():Promise<Array<Users>>{
        return await this.usersRepository.findAll<Users>();
    }

    //findOne()可以加入各種option，以下示範常見的where
    //注意findOne() 找到一筆就會立即return data，不會繼續往下找。
    public async findOne(options: Object): Promise<Users | null> {
        return await this.usersRepository.findOne<Users>(options);
    }

    //restful API很常用。
    public async findById(id: number): Promise<Users | null> {
        return await this.usersRepository.findById<Users>(id);
    }
}