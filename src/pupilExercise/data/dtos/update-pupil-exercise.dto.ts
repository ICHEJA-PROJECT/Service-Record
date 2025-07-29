import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UpdatePupilExerciseDto {
    @ApiProperty({ description: 'Date of assignment of the exercise', type: 'string'})
    @IsString()
    assignedDate: string;
    @ApiProperty({ description: 'Date of delivery of the exercise', type: 'string'})
    @IsString()
    completedDate: string;
}