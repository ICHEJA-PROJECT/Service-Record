import { CreatePupilTopicDto } from "src/pupilTopic/data/dtos/create-pupil-topic.dto";
import { PupilTopicI } from "../entitiesI/PupilTopicI";

export interface PupilTopicRepository {
    create(createPupilTopicDto: CreatePupilTopicDto): Promise<PupilTopicI>;
    findByPupil(pupilId: number): Promise<PupilTopicI[]>;
}