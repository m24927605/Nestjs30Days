import * as jwt from 'jsonwebtoken';
import { Component, Inject } from '@nestjs/common';
import { UsersServices } from '../Users/users.service';

@Component()
export class AuthService {

    constructor(private readonly usersServices: UsersServices) { }

    public async createToken(id: number) {
        //token到期時間
        const expiresIn = 60 * 10;
        //重要，盡可能複雜些
        const secret = 'donttalk';
        /*
        payload不建議放淺顯易懂的敏感資料，如要放敏感資料最好有加密過，
        這邊以不重複的id作替代，對應的是資料表ID欄位。
        */
        const token = jwt.sign(id, secret, { expiresIn });
        return {
            expires_in: expiresIn,
            token: token
        }
    }

    public async validate(payload: object): Promise<boolean> {
        //給定where條件，依據token payload的ID作為where條件。
        let queryCondition = { where: { ID: payload['ID'] } };
        const user = await this.usersServices.findOne(queryCondition); console.log()
        //有該筆資料，回傳true
        if (user) {
            return true;
        }
        //沒該筆資料回傳false
        else {
            return false;
        }
    }
}