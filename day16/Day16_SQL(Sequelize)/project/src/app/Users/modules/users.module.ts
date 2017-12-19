'use strict';

import { Module } from '@nestjs/common';
import { UsersServices } from '../users.service';
import { UsersProvider } from '../users.providers';
import { DatabaseModule } from '../../database.module';

@Module({
    modules: [DatabaseModule],
    components: [
        UsersServices,
        UsersProvider
    ]
})
export class UsersModule { }