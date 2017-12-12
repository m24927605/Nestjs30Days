
import { Guard, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs/Observable';
import { Reflector } from '@nestjs/core';

@Guard()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) { }

    canActivate(req, context: ExecutionContext): boolean {
        const { parent, handler } = context;
        const roles = this.reflector.get<string[]>('roles', handler);
        if (!roles) {
            return true;
        }
        /*req.user是假資料，這是在模擬登入後，有一組user資訊放在req object裡，
        也可以放在session等，登入資訊的roles表示角色權限，是陣列，一個帳號可能有多個角色。
        而Ted的角色是general，能夠請求通過帶有@Roles('general')裝飾器的目標。
        */
        req.user = { "account": "Ted", "roles": ["general"] };
        const user = req.user;
        const hasRole = () => !!user.roles.find((role) => !!roles.find((item) => item === role));
        return user && user.roles && hasRole();
    }
}