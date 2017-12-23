'use strict';

import { Users } from './users.entity';
import { Connection, Repository } from 'typeorm';
export const UsersProvider = {
    provide: 'UsersRepository',
    useFactory: (connection: Connection) => connection.getRepository(Users),
    inject: ['TypeORMInstance']
}