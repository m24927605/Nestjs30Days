

import { Component, Inject } from '@nestjs/common';
import { Users } from './users.entity';
import { Model } from 'sequelize-typescript';
import { IUsers, IUsersService } from './interfaces/index';

@Component()
export class UsersServices implements IUsersService {
    constructor(
        @Inject('UsersRepository') private readonly usersRepository: typeof Users,
        @Inject('SequelizeInstance') private readonly sequelizeInstance) { }

    public async findAll():Promise<Array<Users>>{
        return await this.usersRepository.findAll<Users>();
    }

    public async findOne(options: Object): Promise<Users | null> {
        return await this.usersRepository.findOne<Users>(options);
    }

    public async findById(id: number): Promise<Users | null> {
        return await this.usersRepository.findById<Users>(id);
    }

    public async create(rentDetail: IUsers): Promise<Users> {
        return await this.sequelizeInstance.transaction(async transaction => {
            return await this.usersRepository.create<Users>(rentDetail, {
                returning: true,
                transaction,
            });
        });
    }

    public async update(id: number, newValue: IUsers): Promise<Users | null> {
        return await this.sequelizeInstance.transaction(async transaction => {
            let rentDetail = await this.usersRepository.findById<Users>(id, { transaction });
            if (!rentDetail){
                console.error("update 錯誤");
            }

            rentDetail = this._assign(rentDetail, newValue);
            return await rentDetail.save({
                returning: true,
                transaction,
            });
        });
    }

    public async delete(id: number): Promise<void> {
        return await this.sequelizeInstance.transaction(async transaction => {
            return await this.usersRepository.destroy({
                where: { id },
                transaction,
            });
        });
    }

    private _assign(rentDetail: IUsers, newValue: IUsers): Users {
        for (const key of Object.keys(rentDetail)) {
            if (rentDetail[key] !== newValue[key]) rentDetail[key] = newValue[key];
        }

        return rentDetail as Users;
    }
}