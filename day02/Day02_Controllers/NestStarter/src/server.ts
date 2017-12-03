import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app/app.module';
import { INestApplication } from '@nestjs/common/interfaces/nest-application.interface';
import * as express from 'express';//使用express模組
import * as bodyParser from 'body-parser';

//創建express 實例
const instance = express();
//使用bodyParser模組，body轉json
instance.use(bodyParser.json());
//NestFactory.create()接受一個模組參數，和一個可選的express實例參數，並返回Promise。
const app: Promise<INestApplication> = NestFactory.create(ApplicationModule, instance);

app
  //Promise傳入nest的實例參數。
  .then(nestInstance =>
    //nest實例具有listen方法，傳入port參數，和一個可選的callback function。
    nestInstance.listen(3000, () => {
      console.log('Application based on Express is listening on port 3000');
    })
  )
  .catch((err) => {
    console.error('Application configured to listen on port 3000 failed to start', err);
  });
