'use strict';

import { Users } from '../users.entity';
import { IUsers } from './IUsers';

export interface IUsersService {
    findAll(): Promise<Array<Users>>;
    findById(ID: number): Promise<Users | null>;
    findOne(options: Object): Promise<Users | null>;
    //今天先完成Select部分，所以註解以下方法。
    /*create(users: IUsers): Promise<Users>;
    update(ID: number, newValue: IUsers): Promise<Users | null>;
    delete(ID: number): Promise<void>;*/
}