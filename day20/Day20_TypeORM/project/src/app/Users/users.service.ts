'use strict';

import { Component, Inject } from '@nestjs/common';
import { Users } from './users.entity';
import { IUsers, IUsersService } from './interfaces/index';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Component()
export class UsersServices implements IUsersService {
    constructor(
        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>) { }

    public async findAll(): Promise<Array<Users>> {
        return await this.usersRepository.find();
    }

    //findOne()可以加入各種option，以下示範常見的where
    //注意findOne() 找到一筆就會立即return data，不會繼續往下找。
    public async findOne(options: Object): Promise<Users | null> {
        return await this.usersRepository.findOne(options);
    }

    //restful API很常用。
    public async findById(ID): Promise<Users | null> {
        return await this.usersRepository.findOneById(ID);
    }

    public async create(users: IUsers): Promise<Users> {
        return await this.usersRepository.save(users);
    }

    public async update(ID: number, newValue: IUsers): Promise<Users | null> {
        //先找出單筆資料
        let user = await this.usersRepository.findOneById(ID);
        //該筆資料不存在
        if (!user.ID) {
            console.error("user doesn't exist");
        }
        //呼叫user Model的方法
        await this.usersRepository.updateById(ID, newValue);
        return await this.usersRepository.findOneById(ID);
    }

    public async delete(ID: number): Promise<number> {
        //成功會回傳1，失敗回傳0
        await this.usersRepository.deleteById(ID);
        let user = await this.usersRepository.findOneById(ID);
        if (!user) {
            //刪除成功
            return 1;
        }
        else {
            //刪除失敗
            return 0;
        }
    }
}