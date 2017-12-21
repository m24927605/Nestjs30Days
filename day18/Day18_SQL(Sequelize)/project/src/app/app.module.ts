import { Module, NestModule } from '@nestjs/common';
import { UsersModule } from './Users/modules/users.module';

@Module({
    modules: [UsersModule]
})
export class ApplicationModule { }