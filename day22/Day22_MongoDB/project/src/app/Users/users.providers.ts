'use strict';

import { Connection, connection } from 'mongoose';
import { UsersSchema } from './schemas/users.schema';

export const UsersProvider = [
    {
        provide: 'UsersRepository',
        useFactory: (connection: Connection) => connection.model('Users', UsersSchema),
        inject: ['MongoDBConnection']
    }
]