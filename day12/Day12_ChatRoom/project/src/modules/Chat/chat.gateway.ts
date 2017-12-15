import { WebSocketGateway, SubscribeMessage, WsResponse, WebSocketServer, WsException, NestGateway } from '@nestjs/websockets';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';
import { CreateUserDTO } from '../Users/DTO/create-users.dto';
import { ChatService } from './chat.service';
import { Message } from './DTO/Messages.dto';
import Socket = SocketIO.Socket;


//WebSocket listen  port 81
@WebSocketGateway({ port: 81, namespace: 'messages' })
export class ChatGateway implements NestGateway {
    socket: Socket;
    constructor(private chatService: ChatService) { }

    afterInit(server) { }

    handleConnection(socket) {
        this.socket = socket;
        process.nextTick(() => {
            socket.emit('allMessages', this.chatService.getMessages());
        });
    }

    handleDisconnect(socket) { }
    //新增訊息
    @SubscribeMessage({ value: 'data' })
    AddMessage(sender, message: Message) {
        console.log(message);
        this.chatService.storeMessage(message);
        sender.emit('newMessage', message);
        sender.broadcast.emit('newMessage', message);
    }
    //使用者正在打字
    @SubscribeMessage({ value: 'isWriting' })
    IsWriting(sender, user: CreateUserDTO) {
        console.log('user',user);
        sender.broadcast.emit('isWriting', user);
    }
    //使用者沒在打字
    @SubscribeMessage({ value: 'isNotWriting' })
    IsNotWriting(sender) {
        sender.broadcast.emit('isNotWriting');
    }
}