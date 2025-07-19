import { Inject, HttpStatus } from '@nestjs/common';
import { PupilSkillRepositoryImpl } from '../data/repositories/pupil_skill.repository.impl';
import { PupilSkillRepository } from '../domain/repositories/PupilSkillRepository';
import { CreatePupilSkillDto } from '../data/dtos/create-pupil-skill.dto';
import { CalculateGradesBySkillUseCase } from '../domain/usecases/CalculateGradeBySkillUseCase';
import { PupilExerciseRepositoryImpl } from '../data/repositories/pupil_exercise.repository.impl';
import { PupilExerciseRepository } from '../domain/repositories/PupilExerciseRepository';
import { catchError, firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { EXERCISE_SERVICE_OPTIONS } from 'src/shared/constants/exercise_service_options';

export class PupilSkillService {
  constructor(
    @Inject(PupilExerciseRepositoryImpl)
    private readonly puilExerciseRepository: PupilExerciseRepository,
    @Inject(PupilSkillRepositoryImpl)
    private readonly pupilSkillRepository: PupilSkillRepository,
    private readonly calculateGradeBySkillUseCase: CalculateGradesBySkillUseCase,
    @Inject(EXERCISE_SERVICE_OPTIONS.EXERCISE_SERVICE_NAME)
    private readonly client: ClientProxy,
  ) {}

  async create(createPupilSkillDto: CreatePupilSkillDto) {
    try {
      const pupilExercise = await this.puilExerciseRepository.findOne(
        createPupilSkillDto.pupilExerciseId,
      );

      const porcentageResponse = await firstValueFrom(
        this.client
          .send(EXERCISE_SERVICE_OPTIONS.EXERCISE_PERCENTAGE, {
            id: pupilExercise.exerciseId,
            skillId: createPupilSkillDto.skillId,
          })
          .pipe(
            catchError((error) => {
              throw new RpcException({
                status: HttpStatus.BAD_REQUEST,
                message:
                  error.message || 'Error en la petición HTTP a exercises',
                code: error.code || 'HTTP_ERROR',
                details: error.response?.data || error,
              });
            }),
          ),
      );

      const porcentage = porcentageResponse.data;

      const pupilSkill = await this.pupilSkillRepository.create({
        pupilExerciseId: pupilExercise.id,
        skillId: createPupilSkillDto.skillId,
        score: createPupilSkillDto.score * porcentage,
      });

      return pupilSkill;
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }

  async createMany(pupilSkills: [CreatePupilSkillDto]) {
    try {
      const pupilSkillsSaved =
        await this.pupilSkillRepository.cretaeMany(pupilSkills);
      return pupilSkillsSaved;
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }

  async findAll() {
    try {
      const pupilSkills = await this.pupilSkillRepository.findAll();
      return pupilSkills;
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }

  async findByPupil(pupilId: number) {
    try {
      const pupilSkills = await this.pupilSkillRepository.findByPupil(pupilId);
      return pupilSkills;
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }

  async calculateGradesBySkills(pupilId: number, skillIds: number[]) {
    try {
      if (!skillIds || skillIds.length === 0) return [];

      const scoreSkills = Promise.all(
        skillIds.map(async (id) => {
          const scoreSkill = await this.calculateGradeBySkillUseCase.run(
            pupilId,
            id,
          );

          return {
            skillId: id,
            grade: scoreSkill,
          };
        }),
      );

      return scoreSkills;
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }
}
