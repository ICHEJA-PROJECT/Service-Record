import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { envsValues } from './core/config/getEnvs';
import { PupilTopicModule } from './pupilTopic/pupil_topic.module';
import { PupilExerciseModule } from './pupilExercise/pupil_exercise.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: envsValues.DB_HOST,
      port: envsValues.DB_PORT,
      password: envsValues.DB_PASSWORD,
      username: envsValues.DB_USERNAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      database: envsValues.DB_NAME,
      synchronize: true,
      logging: true,
    }),
    PupilTopicModule,
    PupilExerciseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
