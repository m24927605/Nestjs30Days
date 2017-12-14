import { Interceptor, NestInterceptor, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

@Interceptor()
export class LoggingInterceptor implements NestInterceptor {
    /*
   1.dataOrRequest參數代表你可以傳入expressjs中的request object、或經由microservice、websocket傳遞的data。
   2.ExecutionContext帶有兩個成員，parent和handler，其中，parent代表哪個Controller，handler是route handler的參考。
   3.stream$ 是Observable，可以使用各種Observable的方法。
   */
    intercept(dataOrRequest, context: ExecutionContext, stream$: Observable<any>): Observable<any> {
        console.log('在執行方法之前...');
        const now = Date.now();
        /*Observable do 解釋請看http://cn.rx.js.org/class/es6/Observable.js~Observable.html#instance-method-do
         */
        return stream$.do(() => { console.log(`在執行方法之後...${Date.now() - now}ms`) })
    }
}