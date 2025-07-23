import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class SkillScoreDto {
    @ApiProperty({ description: 'The ID of the skill', type: 'number' })
    @IsNumber()
    skillId: number;
    @ApiProperty({ description: 'The score achieved for the skill', type: 'number' })
    @IsNumber()
    score: number;
}