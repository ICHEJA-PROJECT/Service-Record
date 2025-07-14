import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from "@nestjs/common";
import { CreatePupilTopicDto } from "../data/dtos/create-pupil-topic.dto";
import { PupilTopicService } from "../services/pupil_topic.service";

@Controller('pupil-topics')
export class PupilTopicController {
    constructor(private readonly pupilTopicService: PupilTopicService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createPupilTopicDto: CreatePupilTopicDto) {
        return await this.pupilTopicService.create(createPupilTopicDto);
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async getByPupil(@Param('id') id: number) {
        return await this.pupilTopicService.findByPupil(id);
    }
}