'use strict';

import { Users } from '../users.entity';
import { IUsers } from './IUsers';

export interface IUsersService {
    findAll(): Promise<Array<IUsers>>;
    findById(ID: number): Promise<IUsers | null>;
    findOne(options: Object): Promise<IUsers | null>;
    create(users: IUsers): Promise<IUsers>;
    update(ID: number, newValue: IUsers): Promise<IUsers | null>;
    delete(ID: number): Promise<number>;
}