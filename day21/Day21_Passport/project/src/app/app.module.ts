import { Module, NestModule } from '@nestjs/common';
import { UsersModule } from './Users/modules/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './Auth/auth.module';

@Module({
    modules: [UsersModule, AuthModule]
})
export class ApplicationModule { }