import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNumber, Validate, ValidateNested } from "class-validator";
import { SkillScoreDto } from "./skill-score.dto";
import { Type } from "class-transformer";

export class CreateManyPupilSkillDto {
    @ApiProperty({ description: "Id of student's relationship with the exercise", type: 'number'})
    @IsNumber()
    pupilExerciseId: number;

    @IsArray()
    @ApiProperty({ description: 'Array of skill scores', type: [SkillScoreDto], isArray: true })
    @ValidateNested({ each: true })
    @Type(() => SkillScoreDto)
    skillScores: SkillScoreDto[];
}