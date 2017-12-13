import { Interceptor, NestInterceptor, ExecutionContext, HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Interceptor()
export class ExceptionInterceptor implements NestInterceptor {
    intercept(dataOrRequest, context: ExecutionContext, stream$: Observable<any>): Observable<any> {
        return stream$.catch((err) =>
            Observable.throw(
                new HttpException('Exception interceptor 發威，exception被catch到', HttpStatus.BAD_GATEWAY)
            ))
    }
}