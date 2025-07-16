import { Controller, HttpCode, HttpStatus } from '@nestjs/common';
import { PupilExerciseService } from '../services/pupil_exercise.service';
import { CreatePupilExerciseDto } from '../data/dtos/create-pupil-exercise.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RECORD_SERVICE_OPTIONS } from 'src/common/domain/constants/record_service_options';

@Controller('pupil-exercises')
export class PupilExerciseController {
  constructor(private readonly pupilExerciseService: PupilExerciseService) {}

  @MessagePattern({ cmd: RECORD_SERVICE_OPTIONS.PUPIL_EXERCISE_CREATE })
  @HttpCode(HttpStatus.CREATED)
  async create(@Payload() createPupilExerciseDto: CreatePupilExerciseDto) {
    return await this.pupilExerciseService.create(createPupilExerciseDto);
  }

  @MessagePattern({
    cmd: RECORD_SERVICE_OPTIONS.PUPIL_EXERCISE_FIND_BY_PUPIL_ONLY_IDS,
  })
  @HttpCode(HttpStatus.OK)
  async findByPupilOnlyIds(@Payload() id: number) {
    return await this.pupilExerciseService.findByPupilOnlyIds(id);
  }

  @MessagePattern({ cmd: RECORD_SERVICE_OPTIONS.PUPIL_EXERCISE_FIND_BY_PUPIL })
  @HttpCode(HttpStatus.OK)
  async findByPupil(@Payload() id: number) {
    return await this.pupilExerciseService.findeByPupil(id);
  }

  @MessagePattern({
    cmd: RECORD_SERVICE_OPTIONS.PUPIL_EXERCISE_FIND_BY_EXERCISE,
  })
  @HttpCode(HttpStatus.OK)
  async findByExercise(@Payload() id: number) {
    return await this.pupilExerciseService.findeByExercise(id);
  }
}
