import { Guard, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs/Observable';
import { Reflector } from '@nestjs/core';

@Guard()
export class WebSocketRolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) { }

    canActivate(data, context: ExecutionContext): boolean {
        const { parent, handler } = context;
        const roles = this.reflector.get<string[]>('roles', handler);
        if (!roles) {
            return true;
        }
        /*
        跟Route Guard有點不一樣，req改成data，data泛指傳遞過來的訊息。
        為了 demo用，data是前端push過來的訊息，裏頭有roles 陣列，放著該前端使用者的角色。
        */
        const hasRole = () => !!data.roles.find((role) => !!roles.find((item) => item === role));
        return data && data.roles && hasRole();
    }
}