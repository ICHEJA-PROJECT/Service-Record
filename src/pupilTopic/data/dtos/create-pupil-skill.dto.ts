import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class CreatePupilSkillDto {
    @ApiProperty({ description: 'Id of pupil-exercise resource', type: 'number'})
    @IsNumber()
    pupilExerciseId: number;
    @ApiProperty({ description: 'Id of skill', type: 'number'})
    @IsNumber()
    skillId: number;
    @ApiProperty({ description: 'Score got by pupil', type: 'number'})
    @IsNumber()
    score: number;
}