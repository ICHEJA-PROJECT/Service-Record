import { InjectRepository } from '@nestjs/typeorm';

import { IsNull, Repository } from 'typeorm';

import { HttpStatus } from '@nestjs/common';
import { PupilExerciseRepository } from 'src/pupilExercise/domain/repositories/PupilExerciseRepository';
import { PupilExerciseEntity } from '../entities/pupil_exercise.entity';
import { CreatePupilExerciseDto } from '../dtos/create-pupil-exercise.dto';
import { PupilExerciseI } from 'src/pupilExercise/domain/entitiesI/PupilExerciseI';
import { RpcException } from '@nestjs/microservices';
import { UpdatePupilExerciseDto } from '../dtos/update-pupil-exercise.dto';

export class PupilExerciseRepositoryImpl implements PupilExerciseRepository {
  constructor(
    @InjectRepository(PupilExerciseEntity)
    private readonly pupilExerciseRepository: Repository<PupilExerciseEntity>,
  ) {}

  async create(
    createPupilExerciseDto: CreatePupilExerciseDto,
  ): Promise<PupilExerciseI> {
    try {
      const pupilExercise = this.pupilExerciseRepository.create(
        createPupilExerciseDto,
      );
      return await this.pupilExerciseRepository.save(pupilExercise);
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }

  async findByPupil(pupilId: number): Promise<PupilExerciseI[]> {
    try {
      const pupilExercises = await this.pupilExerciseRepository.find({
        where: { pupilId: pupilId },
        relations: { skills: true },
      });
      return pupilExercises;
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }

  async findByExercise(exerciseId: number): Promise<PupilExerciseI> {
    try {
      const pupilExercise = await this.pupilExerciseRepository.findOne({
        where: { exerciseId: exerciseId },
      });
      if (!pupilExercise) {
        throw new RpcException({
          status: HttpStatus.NOT_FOUND,
          message: 'El ejercicio no ha sido realizado por el educando.',
        });
      }
      return pupilExercise;
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }

  async findOne(id: number): Promise<PupilExerciseI> {
    try {
      const pupilExercise = await this.pupilExerciseRepository.findOne({
        where: { id: id },
      });
      if (!pupilExercise) {
        throw new RpcException({
          status: HttpStatus.NOT_FOUND,
          message: 'El ejercicio no lo tiene registrado el educando.',
        });
      }
      return pupilExercise;
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }

  async updateExerciseToCompleted(id: number, updatePupilExerciseDto: UpdatePupilExerciseDto): Promise<any> {
      try {
        const exercise = await this.pupilExerciseRepository.update(
          { id }, 
          {
            assignedDate: updatePupilExerciseDto.assignedDate,
            completedDate: updatePupilExerciseDto.completedDate,
          }
        );

        return exercise;
      } catch (error) {
        throw new RpcException({
          message: error.message,
          status: HttpStatus.BAD_REQUEST,
        });
      }
  }

  async findAssignedExercisesByPupil(pupilId: number): Promise<PupilExerciseI[]> {
      try {
        const pupilExercises = await this.pupilExerciseRepository.find({
          where: {
            assignedDate: IsNull(),
            completedDate: IsNull(),
            byTeacher: true,
            pupilId
          }
        });

        return pupilExercises;
      } catch (error) {
        throw new RpcException({
          message: error.message,
          status: HttpStatus.BAD_REQUEST,
        });
      }
  }
}
