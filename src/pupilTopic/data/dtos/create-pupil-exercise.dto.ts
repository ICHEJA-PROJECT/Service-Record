import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNumber, IsString } from "class-validator";

export class CreatePupilExerciseDto {
    @ApiProperty({ description: 'Id of pupil/student', type: 'number'})
    @IsNumber()
    pupilId: number;
    @ApiProperty({ description: 'Id of exercise', type: 'number'})
    @IsNumber()
    exerciseId: number;
    @ApiProperty({ description: 'Date of assignment of the exercise', type: 'string'})
    @IsDateString()
    assignedDate: Date;
    @ApiProperty({ description: 'Date of delivery of the exercise', type: 'string'})
    @IsDateString()
    completedDate: Date;
    @ApiProperty({ description: 'Time assigned to complete the exercise', type: 'string'})
    @IsString()
    assignedTime: string;
}