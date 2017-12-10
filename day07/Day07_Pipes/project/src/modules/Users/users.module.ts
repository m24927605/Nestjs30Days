import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './Services/users.service';
import {ProductsModule} from '../Products/products.module';

@Module({
    //傳入ProductModule
    modules: [ProductsModule],
    //傳入UsersController
    controllers: [UsersController],
    //傳入UsersService
    components: [UsersService]
})
export class UsersModule {}