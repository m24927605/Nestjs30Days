import * as express from 'express';
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { UsersModule } from '../../src/modules/Users/users.module';
import { UsersService } from '../../src/modules/Users/Services/users.service';

describe('Users', () => {
    const server = express();
    //預期資料，測試要用
    const usersService = {
        getAllUsers: () => [
            { "_id": 1, "_name": "Michael", "_age": 25 },
            { "_id": 2, "_name": "Mary", "_age": 27 }
        ]
    };
    //使用Testing class
    beforeAll(async () => {
        const module = await Test.createTestingModule({
            modules: [UsersModule]
        })
            .overrideComponent(usersService).useValue(usersService)
            .compile()

        const app = module.createNestApplication(server);
        await app.init();
    });
    //測試你的Restful API
    it('/GET users',()=>{
        return request(server)
        .get('/users')
        //狀態碼
        .expect(200)
        //檢驗是否符合預期資料
        .expect(usersService.getAllUsers())
    })
});