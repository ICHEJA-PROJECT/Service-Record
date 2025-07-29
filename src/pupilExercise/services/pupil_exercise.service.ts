import { HttpStatus, Inject } from '@nestjs/common';
import { PupilExerciseRepositoryImpl } from '../data/repositories/pupil_exercise.repository.impl';
import { PupilExerciseRepository } from '../domain/repositories/PupilExerciseRepository';
import { CreatePupilExerciseDto } from '../data/dtos/create-pupil-exercise.dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { UpdatePupilExerciseDto } from '../data/dtos/update-pupil-exercise.dto';
import { catchError, firstValueFrom } from 'rxjs';
import { EXERCISE_SERVICE_OPTIONS } from 'src/shared/constants/exercise_service_options';

export class PupilExerciseService {
  constructor(
    @Inject(PupilExerciseRepositoryImpl)
    private readonly pupilExerciseRepository: PupilExerciseRepository,
    @Inject(EXERCISE_SERVICE_OPTIONS.EXERCISE_SERVICE_NAME)
    private readonly exerciseClient: ClientProxy,
  ) {}

  async create(createPupilExerciseDto: CreatePupilExerciseDto) {
    try {

      if(createPupilExerciseDto.byTeacher) {
        // mandar notificación al usuario
      }
      
      const pupilExercise = await this.pupilExerciseRepository.create(
        createPupilExerciseDto,
      );
      return pupilExercise;
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }

  async findeByPupil(pupilId: number) {
    try {
      const pupilExercises =
        await this.pupilExerciseRepository.findByPupil(pupilId);
      return pupilExercises;
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }

  async findeByExercise(exerciseId: number) {
    try {
      const pupilExercise =
        await this.pupilExerciseRepository.findByExercise(exerciseId);
      return pupilExercise;
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }

  async findByPupilOnlyIds(pupilId: number) {
    try {
      const pupilExercises =
        await this.pupilExerciseRepository.findByPupil(pupilId);
      const pupilExerciseIds = pupilExercises.map(
        (pupilExercise) => pupilExercise.exerciseId,
      );
      return pupilExerciseIds;
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }

  async findAssignedExercisesByPupil(pupilId: number) {
    try {
      const assignedExercisesSaved = await this.pupilExerciseRepository.findAssignedExercisesByPupil(pupilId);

      const exercisesIds = assignedExercisesSaved.map((assignedExercise) => assignedExercise.exerciseId);

      const exercises = await firstValueFrom (
        this.exerciseClient
          .send(
            { cmd: EXERCISE_SERVICE_OPTIONS.EXERCISE_FIND_BY_IDS }, 
            exercisesIds
          )
          .pipe(catchError(error => {
            throw new RpcException({
              message: error.message,
              status: HttpStatus.BAD_REQUEST,
            });
          }))
      );

      const assignedExercises = assignedExercisesSaved.map(assignedExercise => {
       let  exercise =  exercises.find(exercise => exercise.id === assignedExercise.exerciseId);

       return {
        id: assignedExercise.id,
        pupilId: assignedExercise.pupilId,
        exerciseId: assignedExercise.exerciseId,
        title: exercise.template.title,
        time: assignedExercise.assignedTime,
        byTeacher: true,
       }
      });

      return assignedExercises;
    } catch (error) {
      return new RpcException({
        message: error.message,
        status: HttpStatus.BAD_REQUEST,
      });
    }
  }

  async updateExerciseToCompleted(id: number, updatePupilExerciseDto: UpdatePupilExerciseDto) {
    try {
      const updateExercise = await this.pupilExerciseRepository.updateExerciseToCompleted(id, updatePupilExerciseDto);
      return updateExercise;
    } catch (error) {
      throw new RpcException({
        message: error.message,
        status: HttpStatus.BAD_REQUEST,
      });
    }
  }
}
