import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envsValues } from './core/config/getEnvs';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { RECORD_SERVICE_OPTIONS } from './shared/constants/record_service_options';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: envsValues.BROKER_HOSTS,
        queue: RECORD_SERVICE_OPTIONS.RECORD_QUEUE,
        queueOptions: {
          durable: true,
        },
      },
    },
  );

  await app.listen();
}
bootstrap();
