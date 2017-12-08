import { Module, RequestMethod, UseFilters } from '@nestjs/common';
import { UsersController } from './Users/users.controller';
import { UsersService } from './Users/Services/users.service';
import { UsersModule } from './Users/users.module';
import { LoggerMiddleware } from './Shared/Middlewares/logger.middleware';
import { SimpleMiddleware } from './Shared/Middlewares/simple.middleware';
import { NestModule, MiddlewaresConsumer } from '@nestjs/common/interfaces';
import { ProductsController } from './Products/products.controller';
import { HttpExceptionFilter } from './Shared/ExceptionFilters/http-exception.filter';

@Module({
  modules: [UsersModule]
})
//load HttpExceptionFilter
@UseFilters(new HttpExceptionFilter())
//NestModule本身是個Interface，建議要implements。
export class ApplicationModule implements NestModule {
  configure(consumer: MiddlewaresConsumer): void {
    //apply、forRoute方法允許傳入多個參數
    consumer.apply([LoggerMiddleware,SimpleMiddleware])
      //with方法可以傳入參數到middleware
      .with('來自根模組的參數')
      .forRoutes(
      //load進Controllers
      UsersController,
      ProductsController
      )
  }
}
