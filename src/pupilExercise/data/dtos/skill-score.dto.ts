import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class SkillScoreDto {
    @ApiProperty({ description: 'Id of skill', type: 'number' })
    @IsNumber()
    skillId: number;

    @ApiProperty({ description: 'Score got by pupil', type: 'number' })
    @IsNumber()
    score: number;
}