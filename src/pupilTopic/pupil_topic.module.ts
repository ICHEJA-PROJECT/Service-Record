import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PupilTopicEntity } from './data/entities/pupil_topic.entity';
import { PupilTopicController } from './controllers/pupil_topic.controller';
import { PupilTopicRepositoryImpl } from './data/repositories/pupil_topic.repository.impl';
import { PupilTopicService } from './services/pupil_topic.service';

@Module({
  imports: [TypeOrmModule.forFeature([PupilTopicEntity])],
  controllers: [PupilTopicController],
  providers: [PupilTopicRepositoryImpl, PupilTopicService],
})
export class PupilTopicModule {}
