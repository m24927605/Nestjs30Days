

import { Component, Inject } from '@nestjs/common';
import { Users } from './users.entity';
import { Model } from 'sequelize-typescript';
import { IUsers, IUsersService } from './interfaces/index';

@Component()
export class UsersServices implements IUsersService {
    constructor(
        @Inject('UsersRepository') private readonly usersRepository: typeof Users) { }

    public async findAll(): Promise<Array<Users>> {
        return await this.usersRepository.findAll<Users>();
    }

    //findOne()可以加入各種option，以下示範常見的where
    //注意findOne() 找到一筆就會立即return data，不會繼續往下找。
    public async findOne(options: Object): Promise<Users | null> {
        return await this.usersRepository.findOne<Users>(options);
    }

    //restful API很常用。
    public async findById(ID: number): Promise<Users | null> {
        return await this.usersRepository.findById<Users>(ID);
    }

    public async create(users: IUsers): Promise<Users> {
        return await this.usersRepository.create<Users>(users);
    }

    public async update(ID: number, newValue: IUsers): Promise<Users | null> {

        //先找出單筆資料
        let user = await this.usersRepository.findById<Users>(ID);
        //該筆資料不存在
        if (!user.ID) {
            console.error("user doesn't exist");
        }
        //覆寫過的user物件
        user = this._assign(user, newValue);
        //呼叫user Model的方法
        return await user.save({ returning: true });
    }

    public async delete(ID: number): Promise<number> {
        //成功會回傳1，失敗回傳0
        return await this.usersRepository.destroy({
            where: { ID }
        })
    }

    //將新資料物件與舊資料物件做逐一屬性值比對，不一樣就覆寫舊資料物件的值。
    private _assign(user: IUsers, newValue: IUsers): Users {
        //遍歷舊資料屬性，資料在dataValues屬性裡
        for (const key of Object.keys(user["dataValues"])) {
            //兩個物件同屬性不同值
            if (user[key] !== newValue[key]) {
                //覆寫舊資料物件，給予新資料物件的值
                user[key] = newValue[key];
            }
        }
        //返回一個user Model
        return user as Users;
    }

}