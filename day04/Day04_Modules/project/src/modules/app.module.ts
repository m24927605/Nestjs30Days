import { Module } from '@nestjs/common';
import { UsersController } from './Users/users.controller';
import { UsersService } from './Users/Services/users.service';
import { UsersModule } from './Users/users.module';
import { ProductsModule } from './Products/products.module';

@Module({
  modules: [UsersModule, ProductsModule]
})
export class ApplicationModule { }
