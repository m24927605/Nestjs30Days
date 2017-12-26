import { NestFactory } from '@nestjs/core';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { ApplicationModule } from './app/app.module';
import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  //創建express 實例
  const instance = express();
  //middleware
  instance.use(bodyParser.json());
  instance.use(bodyParser.urlencoded({ extended: false }));
  //NestFactory.create()接受一個模組引數，和一個可選的express實例引數，並返回Promise。
  const app = await NestFactory.create(ApplicationModule, instance);

  //swagger options
  const options = new DocumentBuilder()
    .setTitle('Users Restful API')
    .setDescription('The users Restful API description')
    .setVersion('1.0')
    .addTag('users')
    .build();

  //restful API 文檔
  const document = SwaggerModule.createDocument(app, options);
  
  //打開http://localhost/api 就會連結到swagger服務。
  SwaggerModule.setup('/api', app, document);

  await app.listen(3000)
}

bootstrap();