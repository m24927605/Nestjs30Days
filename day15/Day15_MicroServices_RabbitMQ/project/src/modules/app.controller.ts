import { Controller, Get } from '@nestjs/common';
import { MessagePattern, Transport, Client, ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs/Observable';
import { RabbitMQClient } from './Shared/Services/rabbitmq.client';

@Controller()
export class AppController {
  //記得註解掉此行，我們要使用RabbitMQ的服務
  //@Client({ transport: Transport.TCP})
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

  //策略模式，自定義一個策略名稱amqp
  @MessagePattern({ cmd: 'amqp' })
  //傳入data
  useRabbitMQ(data: string): Observable<string> {
    return Observable.of(data);
  }

  @Get('/rabbitMQ')
  callRabbitMQ(): Observable<string> {
    //呼叫使用一個策略，選定amqp
    const pattern = { cmd: 'amqp' };
    //send()要傳入兩個參數，pattern 和 data，pattern選擇哪種策略，data則是要傳遞的訊息。
    const data = 'use RabbitMQ';
    //透過RabbitMQ消息隊列方式傳遞訊息，注意queue要跟server.ts建立的RabbitMQServer的queue一樣
    this.client = new RabbitMQClient('amqp://rmtahlzz:Jqyq1OnzF7qWPzQXmcwAQly_aRsTrd1z@mustang.rmq.cloudamqp.com/rmtahlzz', 'example');
    return this.client.send<string>(pattern, data);
  }
}