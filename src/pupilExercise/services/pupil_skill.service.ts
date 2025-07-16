import { HttpStatus, Inject } from '@nestjs/common';
import { PupilSkillRepositoryImpl } from '../data/repositories/pupil_skill.repository.impl';
import { PupilSkillRepository } from '../domain/repositories/PupilSkillRepository';
import { CreatePupilSkillDto } from '../data/dtos/create-pupil-skill.dto';
import { RpcException } from '@nestjs/microservices';

export class PupilSkillService {
  constructor(
    @Inject(PupilSkillRepositoryImpl)
    private readonly pupilSkillRepository: PupilSkillRepository,
  ) {}

  async create(createPupilSkillDto: CreatePupilSkillDto) {
    try {
      const pupilSkill =
        await this.pupilSkillRepository.create(createPupilSkillDto);
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
}
