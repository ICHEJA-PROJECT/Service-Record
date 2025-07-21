import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsNumber, ValidateNested } from "class-validator";
import { SkillScoreDto } from "./skill-score.dto";

export class CreateManyPupilSkillDto {
    @ApiProperty({ description: "Id of the student's relationship with the exercise", type: 'number' })
    @IsNumber()
    pupilExerciseId: number;

    @ApiProperty({ 
        description: "Array with skill and score", 
        type: [SkillScoreDto],
        isArray: true 
    })
    @IsArray()
    @ArrayMinSize(1, { message: 'At least one skill is required' })
    @ValidateNested({ each: true })
    @Type(() => SkillScoreDto)
    skills: SkillScoreDto[];
}