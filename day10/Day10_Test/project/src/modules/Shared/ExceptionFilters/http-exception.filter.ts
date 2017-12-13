import { ExceptionFilter, Catch } from '@nestjs/common';
import { HttpException } from '@nestjs/core';

//記得使用Catch裝飾器，可以傳入無數個參數。
@Catch(HttpException)
//建議要implements ExceptionFilter，實作它的interface
export class HttpExceptionFilter implements ExceptionFilter {
    //傳入HttpException
    catch(exception: HttpException, response) {
        const status = exception.getStatus();
        const message = '我是Exception Log Message';

        //做log動作
        console.log(`exception status:`, status);
        console.log(`exception message:`, message);

        //調整response的json內容
        response.status(status).json({
            statusCode: status,
            message: message,
        });
    }
}