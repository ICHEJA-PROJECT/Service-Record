import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class SkillPercentageDto {
    @ApiProperty({ description: "Id of the skill", type: 'number' })
    @IsNumber()
    skillId: number;

    @ApiProperty({ description: "Percentage of the skill", type: 'number' })
    @IsNumber()
    percentage: number;
}