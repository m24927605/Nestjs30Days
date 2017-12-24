'use strict';

import { createConnection } from 'typeorm';

export const databaseProviders = [
    {
        provide: 'TypeORMInstance',
        useFactory: async () => await createConnection({
            type: 'mssql',
            host: 'localhost',
            port: 1433,
            username: 'sa',
            password: 'Aa123456',
            database: 'IronManNest',
            entities: [
                __dirname + '/Users/*.entity{.ts,.js}'
            ]
        })
    }
]