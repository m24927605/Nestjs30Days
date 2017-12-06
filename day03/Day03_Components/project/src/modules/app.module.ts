import { Module } from '@nestjs/common';
import { UsersController } from './Users/users.controller';
import { UsersService } from './Users/Services/users.service';

@Module({
  modules: [],
  controllers: [UsersController],
  components: [UsersService],
})
export class ApplicationModule { }
