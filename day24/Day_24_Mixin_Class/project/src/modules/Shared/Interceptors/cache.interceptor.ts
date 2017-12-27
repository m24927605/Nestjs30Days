
import { Interceptor, NestInterceptor, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Interceptor()
export abstract class CacheInterceptor implements NestInterceptor {
  protected abstract readonly isCached: () => boolean;
  intercept(): Observable<any> {
    if (this.isCached()) {
      return Observable.of([{ "data": "isCached true" }]);
    }
    return Observable.of([{ "data": "isCached false" }]);
  }
}