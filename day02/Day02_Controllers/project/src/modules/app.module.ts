import { Module } from '@nestjs/common';
import { UsersController } from './Users/users.controller';

@Module({
  modules: [],
  controllers: [UsersController],
  components: [],
})
export class ApplicationModule { }
