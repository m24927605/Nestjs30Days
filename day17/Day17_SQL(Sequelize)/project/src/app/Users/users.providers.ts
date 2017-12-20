'use strict';

import { Users } from './users.entity';

export const UsersProvider = {
    provide: 'UsersRepository',
    useValue: Users
}