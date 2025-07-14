import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class CreatePupilTopicDto {
    @ApiProperty({description: "Id of pupil", type: "number"})
    @IsNumber()
    pupilId: number;
    @ApiProperty({description: "Id of topic", type: "number"})
    @IsNumber()
    topicId: number;
}