'use strict';

import { Component, Inject } from '@nestjs/common';
import { IUsers, IUsersService } from './interfaces/index';
import { Model } from 'mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUsersDTO } from './DTO/createUsers.dto';

@Component()
export class UsersServices implements IUsersService{
    constructor( @Inject('UsersRepository') private readonly usersRepository: Model<IUsers>) { }

    public async findAll(): Promise<Array<IUsers>> {
        return await this.usersRepository.find().exec();
    }

    //findOne()可以加入各種option，以下示範常見的where
    //注意findOne() 找到一筆就會立即return data，不會繼續往下找。
    public async findOne(options: Object): Promise<IUsers | null> {
        return await this.usersRepository.findOne(options).exec();
    }

    //restful API很常用。
    public async findById(_id): Promise<IUsers | null> {
        return await this.usersRepository.findById(_id).exec();
    }

    public async create(users: CreateUsersDTO): Promise<IUsers> {
        return await this.usersRepository.create(users);
    }

    public async update(_id: number, newValue: IUsers): Promise<IUsers | null> {
        //先找出單筆資料
        let user = await this.usersRepository.findById(_id).exec();
        //該筆資料不存在
        if (!user._id) {
            console.error("user doesn't exist");
        }
        //呼叫user Model的方法
        await this.usersRepository.findByIdAndUpdate(_id, newValue).exec();
        return await this.usersRepository.findById(_id).exec();
    }

    public async delete(_id: number): Promise<number> {
        //成功會回傳1，失敗回傳0
        await this.usersRepository.findByIdAndRemove(_id).exec();
        let user = await this.usersRepository.findById(_id).exec();
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