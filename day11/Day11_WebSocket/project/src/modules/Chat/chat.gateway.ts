import { WebSocketGateway, SubscribeMessage, WsResponse, WebSocketServer, WsException } from '@nestjs/websockets';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';

//WebSocket listen  port 81
@WebSocketGateway(81)
export class ChatGateway {
    @WebSocketServer() server;

    //訂閱事件名稱
    @SubscribeMessage('wannaChat')
    onEvent(client, message): WsResponse<string> {
        //要聽的事件
        const event = 'wannaChat';
        //接收來自client端傳過來的訊息。
        console.log(message);
        //準備一段回應client端的訊息。
        const response = `Hi,I'm Chat Server.`;
        /*WsResponse的interface結構
        export interface WsResponse<T> {
            event: string;
            data: T;
        }
        */
        //直接推向指定的event，data的值則是我們要推的訊息。
        //這樣做法，有點像是http post完後給一個response。
        return { event, data: response };
    }
}