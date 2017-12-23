import { Module, NestModule } from '@nestjs/common';
import { UsersModule } from './Users/modules/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    modules: [UsersModule]
})
export class ApplicationModule { }