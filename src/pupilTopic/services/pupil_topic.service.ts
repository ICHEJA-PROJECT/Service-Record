import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { PupilTopicRepositoryImpl } from '../data/repositories/pupil_topic.repository.impl';
import { PupilTopicRepository } from '../domain/repositories/PupilTopicRepository';
import { CreatePupilTopicDto } from '../data/dtos/create-pupil-topic.dto';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class PupilTopicService {
  constructor(
    @Inject(PupilTopicRepositoryImpl)
    private readonly pupilTopicRepository: PupilTopicRepository,
  ) {}

  async create(createPupilTopicDto: CreatePupilTopicDto) {
    try {
      const pupilTopic =
        await this.pupilTopicRepository.create(createPupilTopicDto);
      return pupilTopic;
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }

  async findByPupil(pupilId: number) {
    try {
      const pupilTopics = await this.pupilTopicRepository.findByPupil(pupilId);
      const pupilTopicIds = pupilTopics.map((pupilTopic) => pupilTopic.topicId);
      return pupilTopicIds;
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }
}
