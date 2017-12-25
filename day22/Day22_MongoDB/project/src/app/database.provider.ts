'use strict';

import * as mongoose from 'mongoose';

export const databaseProviders = [
    {
        provide: 'MongoDBConnection',
        useFactory: async (): Promise<mongoose.Connection> => {
            (mongoose as any).Promise = global.Promise;
            return await mongoose.connect('mongodb://localhost:27017/IronManNest', {
                useMongoClient: true
            })
        }
    }
]