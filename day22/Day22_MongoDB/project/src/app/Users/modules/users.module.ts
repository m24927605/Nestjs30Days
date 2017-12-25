'use strict';

import { Module } from '@nestjs/common';
import { UsersServices } from '../users.service';
import { UsersProvider } from '../users.providers';
import { DatabaseModule } from '../../database.module';
import { UsersController } from './users.controller';

@Module({
    modules: [DatabaseModule],
    controllers: [UsersController],
    components: [
        UsersServices,
        ...UsersProvider
    ]
})
export class UsersModule { }