import { Controller, Get } from '@nestjs/common';
import { MessagePattern, Transport, Client, ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs/Observable';

@Controller()
export class AppController {
  @Client({ transport: Transport.TCP})
  client: ClientProxy;

  //策略模式，自定義一個策略名稱sayHi
  @MessagePattern({ cmd: 'sayHi' })
  //傳入data
  sayHi(data: string): Observable<string> {
    return Observable.of("Hi,I'm MicroService.");
  }

  @Get()
  call(): Observable<string> {
    //呼叫使用一個策略，選定sayHi
    const pattern = { cmd: 'sayHi' };
    //由於send()要傳入兩個參數，pattern 和 data，data這邊給定空字串。
    const data = '';
    return this.client.send<string>(pattern, data);
  }
}