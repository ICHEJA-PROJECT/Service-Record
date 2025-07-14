import { Body, Controller, Get, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { PupilSkillService } from "../services/pupil_skill.service";
import { CreatePupilSkillDto } from "../data/dtos/create-pupil-skill.dto";

@Controller('pupil-skills')
export class PupilSkillController {
    constructor(private readonly pupilSkillService: PupilSkillService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createPupilSkillDto: CreatePupilSkillDto) {
        return await this.pupilSkillService.create(createPupilSkillDto);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createMany(@Body() createMany: { pupilSkills: [CreatePupilSkillDto]}) {
        return await this.pupilSkillService.createMany(createMany.pupilSkills);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async getAll() {
        return await this.pupilSkillService.findAll();
    }
    
}