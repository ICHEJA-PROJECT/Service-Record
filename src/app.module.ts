import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { envsValues } from './core/config/getEnvs';

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
      logging: true
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
