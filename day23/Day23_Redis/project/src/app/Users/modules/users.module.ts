'use strict';

import { Module } from '@nestjs/common';
import { UsersServices } from '../users.service';
import { UsersController } from './users.controller';

@Module({
    controllers: [UsersController],
    components: [
        UsersServices
    ]
})
export class UsersModule { }