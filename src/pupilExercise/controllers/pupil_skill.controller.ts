import { Controller, HttpCode, HttpStatus } from '@nestjs/common';
import { PupilSkillService } from '../services/pupil_skill.service';
import { CreatePupilSkillDto } from '../data/dtos/create-pupil-skill.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RECORD_SERVICE_OPTIONS } from 'src/common/domain/constants/record_service_options';

@Controller('pupil-skills')
export class PupilSkillController {
  constructor(private readonly pupilSkillService: PupilSkillService) {}

  @MessagePattern({ cmd: RECORD_SERVICE_OPTIONS.PUPIL_SKILL_CREATE })
  @HttpCode(HttpStatus.CREATED)
  async create(@Payload() createPupilSkillDto: CreatePupilSkillDto) {
    return await this.pupilSkillService.create(createPupilSkillDto);
  }

  @MessagePattern({ cmd: RECORD_SERVICE_OPTIONS.PUPIL_SKILL_CREATE_MANY })
  @HttpCode(HttpStatus.CREATED)
  async createMany(
    @Payload() createMany: { pupilSkills: [CreatePupilSkillDto] },
  ) {
    return await this.pupilSkillService.createMany(createMany.pupilSkills);
  }

  @MessagePattern({ cmd: RECORD_SERVICE_OPTIONS.PUPIL_SKILL_FIND_ALL })
  @HttpCode(HttpStatus.OK)
  async getAll() {
    return await this.pupilSkillService.findAll();
  }

  @MessagePattern({ cmd: RECORD_SERVICE_OPTIONS.PUPIL_SKILL_FIND_BY_PUPIL })
  @HttpCode(HttpStatus.OK)
  async getByPupil(@Payload() id: number) {
    return await this.pupilSkillService.findByPupil(id);
  }
}
