import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './modules/app.module';
import { INestApplication } from '@nestjs/common/interfaces/nest-application.interface';
import * as express from 'express';//使用express模組

//創建express 實例
const instance = express();
//NestFactory.create()接受一個模組引數，和一個可選的express實例引數，並返回Promise。
const app: Promise<INestApplication> = NestFactory.create(ApplicationModule, instance);

app
  //Promise傳入nest的實例引數。
  .then(nestInstance =>
    //nest實例具有listen方法，傳入port引數，和一個可選的callback function。
    nestInstance.listen(3000, () => {
      console.log('Application based on Express is listening on port 3000');
    })
  )
  .catch((err) => {
    console.error('Application configured to listen on port 3000 failed to start', err);
  });
