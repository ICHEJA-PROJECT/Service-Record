import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query } from "@nestjs/common";
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

    @Post('many')
    @HttpCode(HttpStatus.CREATED)
    async createMany(@Body() createMany: { pupilSkills: [CreatePupilSkillDto]}) {
        return await this.pupilSkillService.createMany(createMany.pupilSkills);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async getAll() {
        return await this.pupilSkillService.findAll();
    }

    @Get('pupil/:id')
    @HttpCode(HttpStatus.OK)
    async getByPupil(@Param('id') id: number) {
        return await this.pupilSkillService.findByPupil(id);
    }
    
    @Get('/grades/skills')
    @HttpCode(HttpStatus.OK)
    async getGradeBySkills(@Query('pupilId') pupilId: string,@Query('skills') skills: string) {
        let parsedSkills: number[];
        parsedSkills = skills.split(',').map(skill => parseInt(skill.trim()));
        return await this.pupilSkillService.calculateGradesBySkills(parseInt(pupilId), parsedSkills);
    }
}