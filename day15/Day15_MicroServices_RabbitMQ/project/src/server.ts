import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './modules/app.module';
import { Transport } from '@nestjs/microservices';
import { INestMicroservice } from '@nestjs/common/interfaces';
import { RabbitMQServer } from './modules/Shared/Services/rabbitmq.server';

async function bootstrap() {
	const app = await NestFactory.create(ApplicationModule);
	app.connectMicroservice({
		transport: Transport.TCP,
		//連接雲端的RabbitMQ server
		strategy: new RabbitMQServer('amqp://rmtahlzz:Jqyq1OnzF7qWPzQXmcwAQly_aRsTrd1z@mustang.rmq.cloudamqp.com/rmtahlzz', 'example'),
	});
  
	await app.startAllMicroservices();
	await app
	.listen(3001).then(()=>{
		console.log('MicroService is starting.');
	})
	.catch((error)=>{
		console.error('Something wrong happened,',error);
	})
  }
  bootstrap();