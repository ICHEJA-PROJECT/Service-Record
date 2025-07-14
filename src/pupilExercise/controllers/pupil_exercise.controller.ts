import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from "@nestjs/common";
import { PupilExerciseService } from "../services/pupil_exercise.service";
import { CreatePupilExerciseDto } from "../data/dtos/create-pupil-exercise.dto";

@Controller('pupil-exercises')
export class PupilExerciseController {
    constructor(private readonly pupilExerciseService: PupilExerciseService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createPupilExerciseDto: CreatePupilExerciseDto) {
        return await this.pupilExerciseService.create(createPupilExerciseDto);
    }

    @Get('pupil/:id')
    @HttpCode(HttpStatus.OK)
    async findByPupil(@Param('id') id: number) {
        return await this.pupilExerciseService.findeByPupil(id);
    }
    
    @Get('exercise/:id')
    @HttpCode(HttpStatus.OK)
    async findByExercise(@Param('id') id: number) {
        return await this.pupilExerciseService.findeByExercise(id);
    }
}