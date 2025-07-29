import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDateString, IsNumber, IsOptional, IsString} from "class-validator";

export class CreatePupilExerciseDto {
    @ApiProperty({ description: 'Id of pupil/student', type: 'number'})
    @IsNumber()
    pupilId: number;

    @ApiProperty({ description: 'Id of exercise', type: 'number'})
    @IsNumber()
    exerciseId: number;

    @ApiProperty({ description: 'Date of assignment of the exercise', type: 'string'})
    @IsOptional()
    @IsDateString()
    assignedDate: string | null;

    @ApiProperty({ description: 'Date of delivery of the exercise', type: 'string'})
    @IsOptional()
    @IsDateString()
    completedDate: string | null;

    @ApiProperty({ description: 'Time assigned to complete the exercise', type: 'string'})
    @IsString()
    assignedTime: string;

    @ApiProperty({ description: 'Flag to know if is assigned by the teacher', type: 'boolean'})
    @IsBoolean()
    byTeacher: boolean;
}