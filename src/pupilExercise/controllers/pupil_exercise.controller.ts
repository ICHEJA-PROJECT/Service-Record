import { Controller } from '@nestjs/common';
import { PupilExerciseService } from '../services/pupil_exercise.service';
import { CreatePupilExerciseDto } from '../data/dtos/create-pupil-exercise.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RECORD_SERVICE_OPTIONS } from 'src/shared/constants/record_service_options';
import { UpdatePupilExerciseDto } from '../data/dtos/update-pupil-exercise.dto';

@Controller('pupil-exercises')
export class PupilExerciseController {
  constructor(private readonly pupilExerciseService: PupilExerciseService) {}

  @MessagePattern({ cmd: RECORD_SERVICE_OPTIONS.PUPIL_EXERCISE_CREATE })
  async create(@Payload() createPupilExerciseDto: CreatePupilExerciseDto) {
    return await this.pupilExerciseService.create(createPupilExerciseDto);
  }

  @MessagePattern({
    cmd: RECORD_SERVICE_OPTIONS.PUPIL_EXERCISE_FIND_BY_PUPILS_IDS,
  })
  async findByPupilOnlyIds(@Payload() id: number) {
    return await this.pupilExerciseService.findByPupilOnlyIds(id);
  }

  @MessagePattern({ cmd: RECORD_SERVICE_OPTIONS.PUPIL_EXERCISE_FIND_BY_PUPIL })
  async findByPupil(@Payload() id: number) {
    return await this.pupilExerciseService.findeByPupil(id);
  }

  @MessagePattern({
    cmd: RECORD_SERVICE_OPTIONS.PUPIL_EXERCISE_FIND_BY_EXERCISE,
  })
  async findByExercise(@Payload() id: number) {
    return await this.pupilExerciseService.findeByExercise(id);
  }

  @MessagePattern({
    cmd: RECORD_SERVICE_OPTIONS.PUPIL_EXERCISE_FIND_ASSIGNED_EXERCISES_BY_PUPIL
  })
  async findAssignedExercisesByPupil(@Payload() id: number) {
    return await this.pupilExerciseService.findAssignedExercisesByPupil(id);
  }

  @MessagePattern({
    cmd: RECORD_SERVICE_OPTIONS.PUPIL_EXERCISE_UPDATE_EXERCISE_TO_COMPLETED
  })
  async updateExerciseToCompleted (@Payload() { id, updatePupilExerciseDto }: { id: number, updatePupilExerciseDto: UpdatePupilExerciseDto }) {
    return await this.pupilExerciseService.updateExerciseToCompleted(id, updatePupilExerciseDto);
  }
}
