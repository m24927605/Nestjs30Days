'use strict';

import { Sequelize } from 'sequelize-typescript';
import { Users } from './Users/users.entity';

export const databaseProviders = [
    {
        provide: 'SequelizeInstance',
        useFactory: async () => {
            const sequelize = new Sequelize({
                dialect: 'mssql',
                host: 'localhost',
                port: 1433,
                username: 'sa',
                password: 'Aa123456',
                database: 'IronManNest'
            });
            sequelize.addModels([Users]);
            await sequelize.sync();
            return sequelize;
        }
    }
]