import { Controller } from '@nestjs/common';
import { PupilSkillService } from '../services/pupil_skill.service';
import { CreatePupilSkillDto } from '../data/dtos/create-pupil-skill.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RECORD_SERVICE_OPTIONS } from 'src/shared/constants/record_service_options';
import { CreateManyPupilSkillDto } from '../data/dtos/create-many-pupil-skill.dto';

@Controller('pupil-skills')
export class PupilSkillController {
  constructor(private readonly pupilSkillService: PupilSkillService) {}

  @MessagePattern({ cmd: RECORD_SERVICE_OPTIONS.PUPIL_SKILL_CREATE })
  async create(@Payload() createPupilSkillDto: CreatePupilSkillDto) {
    return await this.pupilSkillService.create(createPupilSkillDto);
  }

  @MessagePattern({ cmd: RECORD_SERVICE_OPTIONS.PUPIL_SKILL_CREATE_MANY })
  async createMany(@Payload() createManyPupilSkillDto: CreateManyPupilSkillDto) {
    return await this.pupilSkillService.createMany(createManyPupilSkillDto);
  }

  @MessagePattern({ cmd: RECORD_SERVICE_OPTIONS.PUPIL_SKILL_FIND_ALL })
  async getAll() {
    return await this.pupilSkillService.findAll();
  }

  @MessagePattern({ cmd: RECORD_SERVICE_OPTIONS.PUPIL_SKILL_FIND_BY_PUPIL_ID })
  async getByPupil(@Payload() id: number) {
    return await this.pupilSkillService.findByPupil(id);
  }

  @MessagePattern({
    cmd: RECORD_SERVICE_OPTIONS.PUPIL_SKILL_FIND_GRADE_BY_SKILLS,
  })
  async getGradeBySkills(
    @Payload() { pupilId, skills }: { pupilId: number; skills: number[] },
  ) {
    return await this.pupilSkillService.calculateGradesBySkills(
      pupilId,
      skills,
    );
  }
}
