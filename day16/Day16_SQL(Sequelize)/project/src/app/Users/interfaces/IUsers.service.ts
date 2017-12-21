'use strict';

import { Users } from '../users.entity';
import { IUsers } from './IUsers';

export interface IUsersService {
    findAll(): Promise<Array<Users>>;
    findById(ID: number): Promise<Users | null>;
    findOne(options: Object): Promise<Users | null>;
    create(users: IUsers): Promise<Users>;
    update(ID: number, newValue: IUsers): Promise<Users | null>;
    delete(ID: number): Promise<number>;
}