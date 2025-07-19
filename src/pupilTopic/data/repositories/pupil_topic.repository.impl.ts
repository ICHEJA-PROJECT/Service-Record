import { InjectRepository } from '@nestjs/typeorm';
import { PupilTopicRepository } from 'src/pupilTopic/domain/repositories/PupilTopicRepository';
import { PupilTopicEntity } from '../entities/pupil_topic.entity';
import { PupilTopicI } from 'src/pupilTopic/domain/entitiesI/PupilTopicI';
import { CreatePupilTopicDto } from '../dtos/create-pupil-topic.dto';
import { HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class PupilTopicRepositoryImpl implements PupilTopicRepository {
  constructor(
    @InjectRepository(PupilTopicEntity)
    private readonly pupilTopicRepository: Repository<PupilTopicEntity>,
  ) {}

  async create(createPupilTopicDto: CreatePupilTopicDto): Promise<PupilTopicI> {
    try {
      const pupilTopic = this.pupilTopicRepository.create(createPupilTopicDto);
      return this.pupilTopicRepository.save(pupilTopic);
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }

  async findByPupil(pupilId: number): Promise<PupilTopicI[]> {
    try {
      const pupilTopics = await this.pupilTopicRepository.find({
        where: { pupilId: pupilId },
      });
      return pupilTopics;
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }
}
