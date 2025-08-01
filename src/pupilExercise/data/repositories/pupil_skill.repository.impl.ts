import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { HttpStatus } from '@nestjs/common';
import { PupilSkillRepository } from 'src/pupilExercise/domain/repositories/PupilSkillRepository';
import { PupilSkillEntity } from '../entities/pupil_skill.entity';
import { PupilExerciseEntity } from '../entities/pupil_exercise.entity';
import { CreatePupilSkillDto } from '../dtos/create-pupil-skill.dto';
import { PupilSkillI } from 'src/pupilExercise/domain/entitiesI/PupilSkillI';
import { RpcException } from '@nestjs/microservices';
import { CreateManyPupilSkillDto } from '../dtos/create-many-pupil-skill.dto';

export class PupilSkillRepositoryImpl implements PupilSkillRepository {
  constructor(
    @InjectRepository(PupilSkillEntity)
    private readonly pupilSkillRepository: Repository<PupilSkillEntity>,
    @InjectRepository(PupilExerciseEntity)
    private readonly pupilExerciseRepository: Repository<PupilExerciseEntity>,
  ) {}

  async create(createPupilSkillDto: CreatePupilSkillDto): Promise<PupilSkillI> {
    try {
      console.log(createPupilSkillDto);
      const pupilExercise = await this.pupilExerciseRepository.findOne({
        where: { id: createPupilSkillDto.pupilExerciseId },
      });
      if (!pupilExercise) {
        throw new RpcException({
          status: HttpStatus.NOT_FOUND,
          message:
            'El educando no tiene registrado el ejercicio al que corresponde este puntaje.',
        });
      }

      const pupilSkill = this.pupilSkillRepository.create({
        skillId: createPupilSkillDto.skillId,
        pupilExerciseId: createPupilSkillDto.pupilExerciseId,
        pupilExercise: pupilExercise,
        score: createPupilSkillDto.score,
      });

      return await this.pupilSkillRepository.save(pupilSkill);
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }

  async createMany(createManyPupilSkillDto: CreateManyPupilSkillDto): Promise<PupilSkillI[]> {
    try {
      const pupilExerciseId = createManyPupilSkillDto.pupilExerciseId;
      const pupilExercise = await this.pupilExerciseRepository.findOne({
        where: { id: pupilExerciseId },
      });
      if (!pupilExercise) {
        throw new RpcException({
          status: HttpStatus.NOT_FOUND,
          message:
            'El educando no tiene registrado el ejercicio al que corresponde este puntaje.',
        });
      }

      const pupilSkillsToSave = createManyPupilSkillDto.skillScores.map(async (pupilSkill) => {
        const pupilSkillCreated = this.pupilSkillRepository.create({
          ...pupilSkill,
          pupilExercise: pupilExercise,
        });

        return await this.pupilSkillRepository.save(pupilSkillCreated);
      });

      const pupilSkillsSaved = await Promise.all(pupilSkillsToSave);

      return pupilSkillsSaved;
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }

  async findAll(): Promise<PupilSkillI[]> {
    try {
      const pupilSkills = await this.pupilSkillRepository.find();
      return pupilSkills;
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }
  async findByPupil(pupilId: number): Promise<PupilSkillI[]> {
    try {
      const pupilSkills = await this.pupilSkillRepository.find({
        where: { pupilExercise: { pupilId: pupilId, completedDate: Not(IsNull())}},
      });
      return pupilSkills;
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }

  async findByPupilAndSkill(
    pupilId: number,
    skillId: number,
  ): Promise<PupilSkillI[]> {
    try {
      const pupilSkills = await this.pupilSkillRepository.find({
        where: { skillId: skillId, pupilExercise: { pupilId: pupilId } },
        select: { score: true, pupilExercise: { completedDate: true } },
      });
      return pupilSkills;
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }
}
