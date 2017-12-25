import * as passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Component, Inject } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Component()
export class JwtStrategy extends Strategy {
    constructor(private readonly authService: AuthService) {
        super({
            //用來帶入驗證的函式
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            //設成true就可以在verify的callback中使用 
            passReqToCallback: true,
            secretOrKey: 'donttalk',
        },
            async (req, payload, next) => await this.verify(req, payload, next)
        );
        passport.use(this);
    }

    public async verify(req, payload, done) {
        //呼叫authService.validate()，會去撈表確認有無資料
        const isValid = await this.authService.validate(payload);
        if (!isValid) {
            return done('驗證失敗', false);
        }
        done(null, payload);
    }
}