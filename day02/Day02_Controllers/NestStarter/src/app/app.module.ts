import { Module } from '@nestjs/common';
import { UsersController } from './Users/user.controller';

@Module({
    controllers: [UsersController]
})
export class ApplicationModule { }