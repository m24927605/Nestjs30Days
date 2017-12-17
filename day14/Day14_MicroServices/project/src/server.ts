import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './modules/app.module';
import { Transport } from '@nestjs/microservices';
import { INestMicroservice } from '@nestjs/common/interfaces';

async function bootstrap() {
	const app = await NestFactory.create(ApplicationModule);
	app.connectMicroservice({
	  transport: Transport.TCP,
	});
  
	await app.startAllMicroservicesAsync();
	await app
	.listen(3001).then(()=>{
		console.log('MicroService is starting.');
	})
	.catch((error)=>{
		console.error('Something wrong happened,',error);
	})
  }
  bootstrap();