'use strict';

import { Module } from '@nestjs/common';
import { databaseProviders } from './database.provider';

@Module({
    components: [...databaseProviders],
    exports: [...databaseProviders]
})

export class DatabaseModule { }