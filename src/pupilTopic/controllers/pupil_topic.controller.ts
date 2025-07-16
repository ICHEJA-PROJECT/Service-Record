import { Controller, HttpCode, HttpStatus } from '@nestjs/common';
import { CreatePupilTopicDto } from '../data/dtos/create-pupil-topic.dto';
import { PupilTopicService } from '../services/pupil_topic.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RECORD_SERVICE_OPTIONS } from 'src/common/domain/constants/record_service_options';

@Controller('pupil-topics')
export class PupilTopicController {
  constructor(private readonly pupilTopicService: PupilTopicService) {}

  @MessagePattern({ cmd: RECORD_SERVICE_OPTIONS.PUPIL_TOPIC_CREATE })
  @HttpCode(HttpStatus.CREATED)
  async create(@Payload() createPupilTopicDto: CreatePupilTopicDto) {
    return await this.pupilTopicService.create(createPupilTopicDto);
  }

  @MessagePattern({ cmd: RECORD_SERVICE_OPTIONS.PUPIL_TOPIC_FIND_BY_PUPIL })
  @HttpCode(HttpStatus.OK)
  async getByPupil(@Payload() id: number) {
    return await this.pupilTopicService.findByPupil(id);
  }
}
