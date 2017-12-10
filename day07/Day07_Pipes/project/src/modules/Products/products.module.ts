import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './Services/products.service';

@Module({
    //傳入ProductsController
    controllers: [ProductsController],
    //傳入ProductsService
    components: [ProductsService],
    //輸出ProductsService
    exports: [ProductsService]
})
export class ProductsModule { }