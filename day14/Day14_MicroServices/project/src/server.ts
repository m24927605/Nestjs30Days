import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './modules/app.module';
import { Transport } from '@nestjs/microservices';
import { INestMicroservice } from '@nestjs/common/interfaces';

async function bootstrap() {
	const app = await NestFactory.createMicroservice(ApplicationModule, {
	  transport: Transport.TCP,
	});
	app.listen(() => console.log('Microservice is listening'));
  }
  bootstrap();