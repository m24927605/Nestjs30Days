import { NestFactory } from '@nestjs/core';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { ApplicationModule } from './app/app.module';
import { INestApplication } from '@nestjs/common';

async function bootstrap() {
  //創建express 實例
  const instance = express();
  //middleware
  instance.use(bodyParser.json());
  instance.use(bodyParser.urlencoded({ extended: false }));
  //NestFactory.create()接受一個模組引數，和一個可選的express實例引數，並返回Promise。
  const app = await NestFactory.create(ApplicationModule, instance);

  await app.listen(3000)
}

bootstrap();