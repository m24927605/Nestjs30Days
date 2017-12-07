import { Module } from '@nestjs/common';
import { UsersController } from './Users/users.controller';
import { UsersService } from './Users/Services/users.service';
import { UsersModule } from './Users/users.module';

@Module({
  modules: [UsersModule]
})
export class ApplicationModule { }
