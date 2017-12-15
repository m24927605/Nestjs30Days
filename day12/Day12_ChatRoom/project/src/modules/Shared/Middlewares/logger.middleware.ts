import { Middleware, ExpressMiddleware, NestMiddleware } from '@nestjs/common';
import { setTimeout } from 'timers';

//Middleware的裝飾器
@Middleware()
export class LoggerMiddleware implements NestMiddleware {
    //resolve可以傳參
     resolve(message: string): ExpressMiddleware {
        //會返回ExpressMiddleware
        return (req, res, next) => {
            //使用字符串
            console.log(`${message}`);
            console.log('執行middleware...');
            //呼叫next()方法，程式才會繼續往下執行，否則將停在此階段。
            next();
        }
    }
}

