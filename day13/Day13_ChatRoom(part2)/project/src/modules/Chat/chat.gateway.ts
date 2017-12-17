import { WebSocketGateway, SubscribeMessage, WsResponse, WebSocketServer, WsException, NestGateway } from '@nestjs/websockets';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';
import { CreateUserDTO } from '../Users/DTO/create-users.dto';
import Socket = SocketIO.Socket;
import { UseGuards } from '@nestjs/common';
import { Roles } from '../Shared/decorators/roles.decorator';
import { WebSocketRolesGuard } from '../Shared/Guards/webSocket.roles.guard';

//WebSocket listen  port 81，namespace:messages
@WebSocketGateway({ port: 81, namespace: 'messages' })
//Gateway Guard
@UseGuards(WebSocketRolesGuard)
export class ChatGateway implements NestGateway {
    //使用Socket.IO的API
    socket: Socket;
    constructor() { }

    afterInit(server) { }

    handleConnection(socket) { }

    handleDisconnect(socket) { }
    //新增訊息
    @SubscribeMessage({ value: 'pushMessage' })
    @Roles('general')
    AddMessage(sender, message: object) {
        //推訊息給自己的前端畫面。
        sender.emit('newMessage', message);
        //推訊息給其他已建立連線的前端畫面。
        sender.broadcast.emit('newMessage', message);
    }
}