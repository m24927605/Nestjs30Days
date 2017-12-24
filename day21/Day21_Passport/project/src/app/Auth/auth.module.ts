import * as passport from 'passport';
import {
    Module,
    NestModule,
    MiddlewaresConsumer,
    RequestMethod
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './Passport/jwt.strategy';
import { AuthController } from './auth.controller';
import { UsersServices } from '../Users/users.service';
import { UsersProvider } from '../Users/users.providers';
import { DatabaseModule } from '../database.module';
import { UsersController } from '../Users/modules/users.controller';

@Module({
    modules: [DatabaseModule],
    components: [UsersServices,UsersProvider, AuthService, JwtStrategy],
    controllers: [AuthController,UsersController]
})
export class AuthModule implements NestModule {
    //全域middleware
    public configure(consumber: MiddlewaresConsumer) {
        //apply、forRoute方法允許傳入多個參數
        consumber.apply(passport.authenticate('jwt', { session: false }))
            .forRoutes({ path: '/users', method: RequestMethod.ALL });
    }
}