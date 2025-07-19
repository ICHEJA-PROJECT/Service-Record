import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envsValues } from 'src/core/config/getEnvs';
import { EXERCISE_SERVICE_OPTIONS } from 'src/shared/constants/exercise_service_options';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: EXERCISE_SERVICE_OPTIONS.EXERCISE_SERVICE_NAME,
        transport: Transport.RMQ,
        options: {
          urls: envsValues.BROKER_HOSTS,
          queue: EXERCISE_SERVICE_OPTIONS.EXERCISE_QUEUE,
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  exports: [
    ClientsModule.register([
      {
        name: EXERCISE_SERVICE_OPTIONS.EXERCISE_SERVICE_NAME,
        transport: Transport.RMQ,
        options: {
          urls: envsValues.BROKER_HOSTS,
          queue: EXERCISE_SERVICE_OPTIONS.EXERCISE_QUEUE,
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
})
export class ExerciseServiceTransport {}
